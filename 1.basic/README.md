## 1.JSX的执行过程
1. 我们写代码的时候写的JSX `<h1>hello</h1>`
2. 打包的时候,会调用webpack中的babel-loader把JSX写法转换成JS写法 createElement
3. 我们在浏览器里执行createElement,得到虚拟DOM,也就是React元素,它是一个普通的JS对象,描述了你在界面上想看到的DOM元素的样式
4. 把React元素(虚拟DOM)给了ReactDOM.render,render会把虚拟DOM转成真实DOM,并且插入页面



## 问题
- didMount 应该是在dom添加到html里之后才执行哪。 这里的didMount调用的时候， dom没向html append哪？ 

1 2 3 4 5 

componentWillReceiveProps 1次

父组件 1.set up props and state
父组件 2.componentWillMount
父组件 3.render
子组件 1.constructor
子组件 1.componentWillMount
子组件 2.render
子组件 3.componentDidMount
父组件 4.componentDidMount
2父组件 5.shouldComponentUpdate
父组件 6.componentWillUpdate
父组件 3.render
子组件 6.componentWillReceiveProps
子组件 4.componentWillUpdate
子组件 2.render
子组件 5.componentDidUpdate
父组件 7.componentDidUpdate
2父组件 5.shouldComponentUpdate
父组件 6.componentWillUpdate
父组件 3.render
子组件 7.componentWillUnmount
父组件 7.componentDidUpdate
2父组件 5.shouldComponentUpdate
父组件 6.componentWillUpdate
父组件 3.render
子组件 1.constructor
子组件 1.componentWillMount
子组件 2.render
子组件 3.componentDidMount
父组件 7.componentDidUpdate