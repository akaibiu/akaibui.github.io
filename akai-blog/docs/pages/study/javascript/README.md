# :computer: Javascript

## 清空对象属性值

```javascript
let obj = { a: 1, b: 2 };
// 1. Object.key枚举所有属性
Object.keys(obj).forEach(key => (obj[key] = ''));
// 2. for...in循环
for (let key in obj) {
  obj[key] = '';
}
```

> 区别：
>
> > `Object.keys()` 遍历对象本身所有可枚举的属性，不会再去原型链上寻找，而`for in`会遍历原型链上的属性，一般都要带一个`hasOwnProperty`来判断是否是自己本身持有的属性。
