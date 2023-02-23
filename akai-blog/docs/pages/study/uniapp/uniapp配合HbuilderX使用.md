
# :love_hotel: uniapp配合HbuilderX使用



>在日常小程序开发中，小伙伴们在使用HbuilderX的时候，会不会因为他的格式化有一些困扰呢，接下来教家人们一个方法，完美解决工具格式化时多一行空格的问题，一起看看吧....


### HbuilderX格式化代码自动去掉CSS空格

#### 1.找到HbuiderX安装目录下的plugins插件文件夹，进入到format格式文件夹。

>例如我的是 `C:\workSoftWare\HBuilderX.2.7.14.20200618.full\HBuilderX\plugins\format`

![alt 示例图片](/img/study/uniapp/uniapp配合HbuilderX使用/目录.jpg)




#### 2.然后找到下面的jsbeautifyrc.js文件。

>您可以在记事本打开或者在编辑器打开此文件

#### 3.然后找到导出的这个对象，在这个对象里面有一个options配置对象。在这个对象里面添加以下配置字段即可

```
"css": {  
    "preserve_newlines": false,
    "selector_separator_newline": false,  
    "newline_between_rules": false
}

```

#### 4.添加完成之后示例如下，然后保存重启HbuilderX即可


![alt 示例图片](/img/study/uniapp/uniapp配合HbuilderX使用/配置.jpg)




* 好了，以上的总结就到此为止了，如果`有疑问可以不问`也可以联系作者。咱们下期再见! Good bye! 🌸