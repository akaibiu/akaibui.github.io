/**
 * @description 在打包时候将 config.js里的写入如下配置 base:'./',dest:'./dist'
 * 在后续部署时候仅部署dist目录。在运行时候需要注释掉 base:'./'
 * 
*/
module.exports = {
  base: '/vuepress/',
  title: ' ', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称 欢迎来到阿凯的博客
  description: '', // meta 中的描述文字，用于SEO  分享笔记，技术博客
  base:'./',   // 打包时必须使用 ./ 本地运行的时候注释掉此行代码
  dest: './dist',
  // 注到当前页面的 HTML <head> 中的标签
  head: [
    [
      'link',
      { rel: 'icon', href: '/favicon.ico' }
      //浏览器的标签栏的网页图标，第一个'/'会遍历public文件夹的文件
    ]
  ],
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  plugins: [
    // 回到顶部组件
    '@vuepress/back-to-top',
    // 复制版权
    [
      'copyright',
      {
        authorName: '亲爱的小邱', // 选中的文字将无法被复制
        minLength: 30,    // 如果长度超过  40 个字符
      },
    ], 
    // 音乐播放器
    [
      '@vuepress-reco/vuepress-plugin-bgm-player',
      {
        audios: [
          {
            name: '童话镇',
            artist: 'Yifa Chen',
            url: 'https://m.hifini.com/music/demo.%E7%AB%A5%E8%AF%9D%E9%95%87.m4a',
            cover: 'https://img2.baidu.com/it/u=1924557926,3395467185&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281'
          }
        ],
        // 是否默认缩小
        autoShrink: true,
        // 缩小时缩为哪种模式
        shrinkMode: 'float',
        // 悬浮窗样式
        floatStyle: { bottom: '10px', 'z-index': '999999' }
      }
    ],
    // 看板娘目前有问题 待修复中...
    // [
    //   '@vuepress-reco/vuepress-plugin-kan-ban-niang',
    //   {
    //     theme: ['blackCat', 'whiteCat', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'shizuku', 'wanko', 'miku', 'z16']
    //   }
    // ],
    ['@vuepress-reco/vuepress-plugin-kan-ban-niang',{
      theme: ["blackCat"],
      clean: false,
      info: 'https://github.com/akaibiu',
      messages: {
        welcome: '欢迎您来到阿凯的小站!',
        home: '心里的花，我想要带你回家',
        theme: '好吧，希望你能喜欢我的其他小伙伴。',
        close: '再见哦'
      }
    }],
    // 鼠标点击烟花特效
    ['cursor-effects', {
      size: 2, // size of the particle, default: 2
      shape: 'star', // ['star' | 'circle'], // shape of the particle, default: 'star'
      zIndex: 999999999, // z-index property of the canvas, default: 999999999
    }]
  ],
  themeConfig: {
    logo: '/favicon.ico', //网页顶端导航栏左上角的图标
    lastUpdated: '最近更新',
    smoothScroll: true,
    nav: [
      //格式一：直接跳转，'/'为不添加路由，跳转至首页
      { text: '🏡', link: '/' },
      { text: '📖', link: '/pages/book/' },
      { text: '⛱️', link: '/pages/tools/' },
      { text: '🧸', link: '/pages/dcloud-plugin/' },
      //格式二：添加下拉菜单，link指向的文件路径
      {
        text: '📚', //默认显示
        ariaLabel: '📚', //用于识别的label
        items: [
          { text: 'Html', link: '/pages/study/html/' },
          { text: 'Css', link: '/pages/study/css/' },
          { text: 'Javascript', link: '/pages/study/javascript/' },
          { text: 'Vue', link: '/pages/study/vue/' },
          { text: 'Uniapp', link: '/pages/study/uniapp/' },
          { text: 'Node.js', link: '/pages/study/node/' },
          { text: 'React', link: '/pages/study/react/' },
        ]
      },
      //格式三：跳转至外部网页，需http/https前缀
      {
        text: '💻', //默认显示
        ariaLabel: '💻', //用于识别的label
        items: [
          { text: '许师作品集', link: 'https://ext.dcloud.net.cn/publisher?id=239479' },
          { text: '阿凯作品集', link: 'https://ext.dcloud.net.cn/publisher?id=690316' },
          { text: '王师作品集', link: 'https://ext.dcloud.net.cn/publisher?id=323014' },
          { text: '柒分糖合集', link: 'https://sevensugar.com' },
          { text: '照相作品集', link: 'https://ext.dcloud.net.cn/publisher?id=201286' },
          { text: '图鸟作品集', link: 'https://ext.dcloud.net.cn/publisher?id=356088' },
          { text: 'XiaoY-Yuque❀', link: 'https://www.yuque.com/zhiyu-am2tg/wygvhg' },
          { text: 'Akai-Yuque', link: 'https://www.yuque.com/u21729372/kwgz8c' },
          { text: 'Senior-Web', link: 'https://seniorbrother.com/' },
          { text: 'Player-Movie', link: 'https://video.isyour.love/player/getplayer' },
          { text: 'Libvio-Movie', link: 'https://www.libvio.me/' },
        ]
      },
      { text: '🤦', link: '/pages/life/' },
    ],
    sidebar: {
      '/pages/study/vue/': getSidebar('Vue'),
      '/pages/study/html/': getSidebar('Html', ['手机号输入自动调整格式', 'H5手机号自动调整格式', '简单的H5模块']),
      '/pages/study/javascript/': getSidebar('Javascript', ['array', 'es6', 'function', 'object', 'JS解决浮点数精度问题', 'JS操作数组的案例', 'JS操作对象的案例', 'JS分割地址栏参数', 'JS执行顺序案例', 'JS生成sign案例', 'JS传递参数加密', 'JS手机号加密', 'JS使用地址栏传递参数', 'JS获取自定义时间格式', 'JS实现防抖节流', 'JS生成随机颜色']),
      '/pages/study/css/': getSidebar('Css', ['css渐变色特效', 'css放大镜特效', 'css实现冰墩墩', 'css实现书签效果', 'css实现半圆', 'css实现梯形']),
      '/pages/study/uniapp/': getSidebar('uniapp', ['uniapp小程序开发详解', 'uniapp小程序请求封装案例', 'uniapp使用animate.css', 'uniapp小程序搜索框导航栏', 'uniapp小程序自定义导航栏', 'uniapp小程序使用flex完美布局', 'uniapp小程序单选多选案例', 'uniapp小程序使用vedio案例', 'uniapp小程序左右联动案例', 'uniapp小程序滑动切换选项卡案例', 'uniapp-H5授权微信登录', 'uniapp小程序上传图片案例', 'uniapp小程序分享', 'uniapp使用友盟+埋点', 'uniapp小程序登录授权和手机授权', 'uniapp小程序返回上页传递参数', 'uniapp配合HbuilderX使用', 'uniapp小程序设置动态样式']),
      '/pages/study/node/': getSidebar('Node'),
      '/pages/study/react/': getSidebar('React'),
      '/pages/life/': getLifeSidebar(),
      '/pages/book/': getBookSidebar(),
      '/pages/dcloud-plugin/': getDcloudPluginInfoSidebar(),
      '/pages/tools/': getToolsSidebar()
    }
  },
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'zh-CN' // 将会被设置为 <html> 的 lang 属性
    }
  }
};
/**
 * @description 获取侧边栏类目函数(资源学习文章类目)
*/
function getSidebar(title, arr) {
  return [
    {
      title: title,
      collapsable: false,
      children: arr && arr.length > 0 ? [''].concat(arr) : ['']
    },
    {
      title: '更多',
      collapsable: false,
      children: ['more']
    }
  ];
}
/**
 * @description 获取TOOL工具类目侧边栏函数
*/
function getToolsSidebar() {
  return [
    '',
    {
      title: '更多',
      collapsable: false,
      children: ['markdown', 'git']
    }
  ];
}
/**
 * @description 获取LIFE生活类目侧边栏函数
*/
function getLifeSidebar() {
  return [
    '',
    {
      title: '记录生活',
      collapsable: false,
      children: ['dairy', 'life']
    }
  ];
}
/**
 * @description 获取LIFE生活类目侧边栏函数
*/
function getDcloudPluginInfoSidebar() {
  return [
    '',
    {
      title: '更多',
      collapsable: false,
      children: ['more']
    }
  ];
}
/**
 * @description 获取BOOK摘录类目侧边栏函数
*/
function getBookSidebar() {
  return [
    '',
    {
      title: '学习笔记',
      collapsable: false,
      children: ['html', 'css', 'javascript', 'es6', 'vue', 'react', 'more']
    },
    {
      title: '学习收录',
      collapsable: false,
      children: ['daily', 'interview']
    }
  ];
}
