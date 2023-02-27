# :hatching_chick: JS解决浮点数精度问题


>文章来源:<br> <font color="#dd00dd"> &ensp;&ensp;&ensp;&ensp;一个站在技术顶流浪尖的烧男人 </font><br /><font color="#dd00dd">&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;小许师兄 </font><br />

&ensp;&ensp;&ensp;[小许的花园](https://seniorbrother.com/)<br>
&ensp;&ensp;&ensp;[CSDN Xu](https://blog.csdn.net/weixin_55176089?type=blog)


>> `想的多了全是问题 做的多了全是答案` ————Mr.Xu

>在日常开发学习中，由于金算计进制计算的问题，常会遇到一些在金额设计这种带小数相加的时候会出现错误，以下是常见案例整理，那么如何解决这个问题呢，`许老师`为我们提出了解决方案，一起看看吧....


1. 在计算机进制的影响下，我们在使用`0.1+0.2`会输出`0.30000000000000004`；
   1. 数学坤本功不错的同学都知道`0.1+0.2=0.3`；为啥等于0.3我还是解释一下，因为`0.3-0.2=0.1`；
2. 但是我们在处理业务的时候肯定必须得要`0.2+0.1=0.3`；那遇到这种类似情况该怎么处理呢？小许给出了答案
   
   
```javascript
    function addNum() {
        // 数字小数点后位数长度数组-次幂数-结果
        let l = [],
            m,
            r = 0
        var len = arguments.length
        for (let i = 0; i < len; i++) {
            l.push(arguments[i].toString().split(".")[1].length)
        }
        m = Math.pow(10, Math.max(...l));
        // 计算
        for (let i = 0; i < len; i++) {
            r = (arguments[i] * m + r * m) / m;
        }
        return r
    }
    const result = addNum(0.1, 0.3)
    console.log(result);

```


![alt 示例图片](/img/study/javascript/JS解决浮点数精度问题/demo.jpg)




* 好了，以上的总结就到此为止了，如果`有疑问可以不问`也可以不联系作者。咱们下期再见! Good bye! 🌸🌹🌺