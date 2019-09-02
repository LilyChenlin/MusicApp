# 基于Vue2.0开发的前后端分离的音乐APP

> 音乐播放器

![image](https://github.com/LilyChenlin/imageStore/blob/master/images/1.png)
![image](https://github.com/LilyChenlin/imageStore/blob/master/images/2.png)
![image](https://github.com/LilyChenlin/imageStore/blob/master/images/3.png)
![image](https://github.com/LilyChenlin/imageStore/blob/master/images/4.png)


> 发现用的线上QQ音乐接口被关闭了，现在的心情....无法描述....

# 项目优化

## 代码层面的优化

- ### 长列表性能优化

Vue会通过Object.defineProperty对数据进行劫持，来实现视图响应数据的变化。然而有些时候我们的组件就是纯粹的数据展示，不会有任何改变，我们就不需要Vue来劫持我们的数据。在大量数据展示的情况下，这能够很明显的减少组件初始化的事件。

**那么如果禁止vue来劫持我们的数据呢？**  可以通过Object.freeze()来冻结一个对象，一旦被冻结的对象就再也不能被修改了

在 components/recommend/recommend.vue下进行了对`slider轮播图`数据和`热门歌单推荐`数据的冻结

---

- ### 图片懒加载

  使用插件`vue-lazyload`

  > 懒加载的实现思路是，首先，需要检查图片dom元素是否在浏览器可视区域中，并且给所有图片的滚动父元素绑定一个滚动事件的监听方法，通过 data-src src的改变 来实现当dom元素在可视区域后，请求真实图片(src变为真实图片的地址)

---

- ### 路由懒加载

**存在问题：** Vue时单页面应用，可能会有很多的路由引入，这样使用webpack打包后的文件很大，当进入首页时，加载的资源过多的情况下，可能会出现白屏的情况，不利于用户的体验

**解决办法：** 把不同路由对应的组件分割成不同的代码块，然后当路由访问时才加载对应的组件，这样会更加高校

```javascript
const Recommend = () => import('../components/recommend/recommend.vue')
export default new Router({
  routes: [
    {
      path: '/recommend',
      component: Recommend
    }
  ]
})
```

## Webpack层面的优化

- ### 构建结果输出分析

 Vue项目中用到的分析工具，webpack-bundle-analyzer

在webpack.prod.conf.js进行配置

```javascript
if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
```

执行 `npm run build` --report 生成分析报告

![1567330194111](D:\2019.5月秋招准备\面试题\音乐播放器\1567330194111.png)

- ### vue项目webpack优化实践

  - #### 缩小文件的搜索范围

**1.1 优化Loader配置** https://juejin.im/post/5c1fa158f265da613c09cb36

由于Loader对文件的转换操作很耗时，所以需要让尽可能少的文件被Loader处理。我们可以通过以下3方面优化Loader配置：（1）优化正则匹配（2）通过cacheDirectory选项开启缓存（3）通过include、exclude来减少被处理的文件。实践如下：

 ```javascript
{
    test: /\.js$/,
    loader: 'babel-loader?cacheDirectory',
    include: [resolve('src'), resolve('test')]
  },
```
  

  

**1.2 优化resolve.modules配置**

resolve.modules用于配置webpack去哪些目录下寻找第三方模块。当安装的第三方模块都放在项目根目录的./node_modules目录下时，就没有必要按照默认的方式一层层地寻找，可以指明存放第三方模块的绝对l路径，以减少寻找

  ```javascript
  resolve: {
  // 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
  modules: [path.resolve(__dirname,'node_modules')]
  },
  ```

  **1.3  优化resolve.alias配置**

   resolve.alias配置项通过别名来将原导入路径映射成一个新的导入路径。

  ```javascript
  alias: {
    '@': resolve('src'),
  },
  // 通过以上的配置，引用src底下的common.js文件，就可以直接这么写
  import common from '@/common.js';
  ```

  

# 功能优化

## debounce优化搜索功能

搜索歌曲，歌手功能中，如果不进行处理，那么每次输入值时，都会向服务器端发送请求，在还没输入完全就发送请求很浪费网络耶，于是就想到用debounce防抖进行优化 **来保证只有在最后一次输入完成后，才触发请求**

```javascript
// /common/js/util.js
export function debounce (func, delay) {
  let timer
  return function (...args) {
    // 如果定时器还存在
    if (timer) {
      clearTimeout(timer)
    }
    setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
```

```javascript
  created () {
    this.$watch('query', debounce((newQuery) => {
      this.$emit('query', newQuery)
    }, 1000))
  }

```


