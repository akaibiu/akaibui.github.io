# :meat_on_bone: uniapp小程序请求封装案例

>此篇文章若有疑惑不解之处，欢迎打扰 作者联系微信 Akaibiu (烦请备注说明来意，谢谢)

#### 1. 首先在项目根目录创建`utils`文件夹和`api`文件夹和`config`文件夹。
*    config: 项目公共配置文件夹,在此目录下创建`config.js`文件(写入常用的全局变量、项目请求地址等全局配置)
```
module.exports = {
  baseUrl:process.env.NODE_ENV === 'development'?"http://192.168.87.00":"htpp://dev.lucklnk.com",   // development本地环境  production 生产环境
  openid:'openid', 																						// 用户openid
  unionid:'unionid',    																				// 用户unionid
  version:"v1.0", 																						// uniapp version
  timestamp:'',																							// 时间戳
  AppId:'', 																					// RSA 加密所需参数 非小程序appid
  AppSecret:'',  														// RSA 加密所需参数 
  PublicKey:``,																										// RSA 公钥
  sign: "",																								// request请求签名
  uniInfo: {
    name: "clerk",  																					// 应用名称(可不填)
	appid:'uniapp全局配置的appid', 																		// APPID testing
    version: "1.0.0", 																					// 应用版本(可不填)
	code:'uni.login所使用的code', 																		// 小程序code(可不填)
    logo: "uniapp小程序logo地址",									 									// 应用logo(可不填)
    site_url: "xxxx", 																					// 官方网站(可不填)
    agreements: [{
        title: "隐私政策",
        url: "htttp://akaixz.com"
      },
    ]
  }
}

```

#### 2. 在`utils`文件夹内创建`request.js`文件。并且写入请求的常规配置文件
```
import config from '@/config/config.js'; // 引入项目配置文件(里面包含baseUrl等全局配置信息)
const TokenKey = "token"; // 本地存储的token健名(一般为token或者access_token)
let timeout = 10000;    // 请求的超时时间设置
const baseUrl = config.baseUrl; // 获取到config的配置的全局baseUrl(config里面有本地环境和线上环境的配置说明)
const request = config => {
    const isToken = config.headers.isToken; // apis请求函数的isToken如果未true则需要token 如果为false则不需要token
    config.header = config.header || {};
    if (uni.getStorageSync(TokenKey) && isToken) {
        // config.header['Authorization'] = uni.getStorageSync('token_type')+ uni.getStorageSync('token'); // type存储在本地 一般都为Bearer 但是切记和token拼接的时候要加空格
        config.header['Authorization'] = 'Bearer ' + uni.getStorageSync('token');
        // config.header['Content-Type'] = 'application/x-www-form-urlencoded';
    };
    // get请求映射params参数
    if (config.params) {
        let url = config.url + '?' + tansParams(config.params)
        url = url.slice(0, -1)
        config.url = url
        // const obj={name:'阿凯',age:23,hair:0};
        // 转换后的格式为 name=akai&age=23
    }
    return new Promise((resolve, reject) => {
        uni.request({
            method: config.method || 'get',
            timeout: config.timeout || timeout,
            url: config.baseUrl || baseUrl + config.url,
            data: config.data,
            header: config.header,
            dataType: 'json'
        }).then(response => {
            // 解构出error和resposne响应数据
            let [error, res] = response;
            // 如果解析出错误信息会抛出
            if (error) {
                uni.showToast({
                    title: '后端接口连接异常!',
                    icon: 'none',
                    duration: 1000
                })
                reject('后端接口连接异常')
                return
            }
            const code = res.data.code;
            // 如果请求状态为401的话 代表状态过期 需要清空本地token等用户信息 这时候需要重新登录
            if (res.statusCode == 401 || code === 401) {
                uni.removeStorageSync('token');
                // uni.removeStorageSync('token_type');
                // uni.removeStorageSync('refresh_token');
                // uni.removeStorageSync('userInfo');
                uni.showModal({
                    title: '温馨提示',
                    content: '登录状态已过期，您可以继续留在该页面，或者重新登录?',
                    cancelText: "取消",
                    confirmText: "确认",
                    showCancel: true,
                    confirmColor: '#007aff',
                    cancelColor: '#666',
                    success: (res) => {
                        if (res.confirm) {
                            uni.navigateTo({
                                url: '/pages/login/login'
                            })
                        } else {
                            uni.showToast({
                                title: '您已取消操作!',
                                icon: 'none',
                                duration: 1000
                            })
                        }
                    }
                });
                reject('无效的会话，或者会话已过期，请重新登录哦。')
            }
            if (code === 500) {
                uni.showToast({
                    title:'后端接口连接异常',
                    icon:'none',
                    duration:1000
                })
                reject('500')
            } else if (code===200||res.statusCode) {
                // 请求成功时的响应
                resolve(res.data)
            } else {
                // resolve(res)
            }
        })
            .catch(error => {
                let { message } = error
                if (message === 'Network Error') {
                    message = '后端接口连接异常'
                } else if (message.includes('timeout')) {
                    message = '系统接口请求超时'
                } else if (message.includes('Request failed with status code')) {
                    message = '系统接口' + message.substr(message.length - 3) + '异常'
                }
                uni.showToast({
                    title:message,
                    icon:'none',
                    duration:1500
                })
                reject(error)
            })
    })
}
// 函数参数转换常用于get请求(在以上的 request 函数内会使用到)
function tansParams(params) {
    let result = ''
    for (const propName of Object.keys(params)) {
        const value = params[propName]
        var part = encodeURIComponent(propName) + "="
        if (value !== null && value !== "" && typeof (value) !== "undefined") {
            if (typeof value === 'object') {
                for (const key of Object.keys(value)) {
                    if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
                        let params = propName + '[' + key + ']'
                        var subPart = encodeURIComponent(params) + "="
                        result += subPart + encodeURIComponent(value[key]) + "&"
                    }
                }
            } else {
                result += part + encodeURIComponent(value) + "&"
            }
        }
    }
    return result
}
export default request

```

#### 3.在`api`文件夹内创建`apis.js`文件，具体配置如下
```
// 引入request文件夹内的request.js文件内暴露的request函数
import request from '@/request/request.js';	  // REQUEST FUNCTION
/**
 * @description 以下为version1.0版本所有请求功能函数封装代码
 */
// CLERK LOGIN API FUNCTION(登录>>>>>>)
export function loginApi(param) {
	return request({
    // 请求接口地址 在请求时会加上baseUrl,具体配置请鼠标上滑查看request.js文件封装内容
		url: '/api/clerk/login',
    // 请求头配置，isToken为true的时候需要携带token,isToken为false的时候不需要携带token
		headers: {
			isToken: false,
		},
    // 请求方法
		method: 'post',
    // 请求参数
		data: param
	})
}

// GET USERINFO API FUNCTION(获取用户信息>>>>>>)
export function getUserinfoApi(param) {
	return request({
		url: '/api/clerk/userInfo',
		headers: {
			isToken: true,
		},
		method: 'post',
		data: param
	})
}
```

#### 4.使用咱们封装的`request`请求具体示例代码如下所示(页面使用)

```
<script>
// 首先在页面中的script标签内引入接口api函数
	import {loginApi} from '@/apis/api.js';
	export default {
		data() {
			return {}
		},
    onShow(){
      this.getLogin();
    },
		methods: {
			// 具体请求示例代码------------------------------------------------------------------------------------------
			getLogin() {
				let that = this;
				const postData = {param1: '参数1',param2: '参数2',param3: '参数3'};
				loginApi(postData).then(res => {
					const {data,code} = res;
					switch (code) {
						case 200:
							// 请求成功要执行的逻辑操作
							break;
						default:
							// 请求失败
							break;
					}
				}).catch(err => {
					// 请求失败
				})
			},
		}
	}
</script>


```

* 好了，以上的总结就到此为止了，如果`有疑问可以不问`也可以联系作者。咱们下期再见! Good bye! 🌸