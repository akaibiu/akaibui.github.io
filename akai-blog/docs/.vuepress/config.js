module.exports = {
  title: '', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称 欢迎来到阿凯的博客
  description: '', // meta 中的描述文字，用于SEO  分享笔记，技术博客
  // 注入到当前页面的 HTML <head> 中的标签
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
  plugins: ['@vuepress/back-to-top'],
  themeConfig: {
    logo: '/favicon.ico', //网页顶端导航栏左上角的图标
    lastUpdated: '最近更新',
    smoothScroll: true,
    nav: [
      //格式一：直接跳转，'/'为不添加路由，跳转至首页
      { text: '🏡', link: '/' },
      //格式二：添加下拉菜单，link指向的文件路径
      {
        text: '📚', //默认显示
        ariaLabel: '📚', //用于识别的label
        items: [
          { text: 'Html', link: '/pages/study/html/' },
          { text: 'Css', link: '/pages/study/css/' },
          { text: 'Javascript', link: '/pages/study/javascript/' },
          { text: 'Vue', link: '/pages/study/vue/' },
        ]
      },
      { text: '🤼‍♀️', link: '/pages/life/' },
      { text: '🎞️', link: '/pages/tools/' },
      //格式三：跳转至外部网页，需http/https前缀
      {
        text: '💻', //默认显示
        ariaLabel: '💻', //用于识别的label
        items: [
          { text: '小许师兄', link: 'https://ext.dcloud.net.cn/publisher?id=239479' },
          { text: '阿凯', link: 'https://ext.dcloud.net.cn/publisher?id=690316' },
          { text: '弃续', link: 'https://ext.dcloud.net.cn/publisher?id=323014' },
          { text:'Z-paging', link: 'https://ext.dcloud.net.cn/publisher?id=201286'},
          { text: '图鸟', link: 'https://ext.dcloud.net.cn/publisher?id=356088' },
        ]
      },
      {
        text: '🐦', //默认显示
        ariaLabel: '🐦', //用于识别的label
        items: [
          { text: '小杨❀', link: 'https://www.yuque.com/zhiyu-am2tg/wygvhg' },
          { text: '阿凯', link: 'https://www.yuque.com/u21729372/kwgz8c' },
        ]
      },
      {
        text: '🎥', //默认显示
        ariaLabel: '🎥', //用于识别的label
        items: [
          { text: '小许师兄', link: 'https://seniorbrother.com/' },
          { text: '影视资源', link: 'https://video.isyour.love/player/getplayer' },
          { text: 'LIBVIO', link: 'https://www.libvio.me/' },
        ]
      },
    ],
    sidebar: {
      '/pages/study/vue/': getSidebar('Vue'),
      '/pages/study/html/': getSidebar('Html'),
      '/pages/study/javascript/': getSidebar('Javascript', ['array']),
      '/pages/study/css/': getSidebar('Css'),
      '/pages/life/': getLIfeSidebar(),
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
      children: ['markdown', 'git','GitWarehouse']
    }
  ];
}
/**
 * @description 获取LIFE生活类目侧边栏函数
*/
function getLIfeSidebar() {
  return [
    '',
    {
      title: '记录生活',
      collapsable: false,
      children: ['dairy','life']
    }
  ];
}
