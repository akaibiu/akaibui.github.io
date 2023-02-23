# :blossom: uniapp小程序使用animate.css库



>在日常小程序开发中，偶尔需要集成第三方库来完成一些样式的调整，例如animate.css，接下来跟大家演示一下如何在咱们的小程序中集成animate,一起看看吧....



#### 1.首先安装animate.css库    
* 1.首先找到项目根目录，在资源管理器中打开，然后在盘符路径聚焦输入CMD回车进入DOS
* 2.输入npm install animate.css
```
npm install animate.css

```
* 3.如果没有node_modules 请执行`npm intit` 然后再执行`npm install` 生成包管理文件之后再重新下载animate.css的依赖

#### 2.在node_mudules文件夹里面找到animate.css库，然后找到animate.css这个文件复制!


#### 3.然后放到static静态资源文件或者你其他自定义文件目录

#### 4.在App.vue文件里面引入animate.css(例如我的是在static文件夹内)
`@import "@/static/animate.css"`

![alt 示例图片](/img/study/uniapp/uniapp小程序使用animate.css/引入静态资源.jpg)

#### 5.最重要的步骤，修改`static`内的`animate.css`文件代码，小程序必须要修改
*  将`:root`根选择器改为`page`(千万不要瓜兮兮的去改node_modules里面的代码哈!!!)

![alt 示例图片](/img/study/uniapp/uniapp小程序使用animate.css/更改静态资源前.jpg)
![alt 示例图片](/img/study/uniapp/uniapp小程序使用animate.css/更改静态资源后.jpg)

#### 6.最后一步，在您想要使用的地方加上类名 animate__animated 以及你想使用的动画具体效果(例如：animate__heartBeat)

![alt 示例图片](/img/study/uniapp/uniapp小程序使用animate.css/使用.jpg)


#### 7.如果你想设置动效执行时间或者动画执行次数等(infinite 无限执行 一直执行 不停地执行)

![alt 示例图片](/img/study/uniapp/uniapp小程序使用animate.css/样式设置.jpg)




* 好了，以上的总结就到此为止了，如果`有疑问可以不问`也可以联系作者。咱们下期再见! Good bye! 🌸