import React from 'react';//react的核心库
import ReactDOM from 'react-dom';//react的dom渲染库
//jsx语法
/* ReactDOM.render(
  <h1>hello</h1>,
  document.getElementById('root')
); */
//createElement的返回值是React元素
//let element = React.createElement("h1", null, "Hello");
//console.log(JSON.stringify(element,null,2));
//会把你这个React元素,也就是常说的虚拟DOM转换成真实DOM并插入到页面中root容器中去
/* let element = (
  <h1 className="title" style={{color:'red'}}>
    <span>hello</span>world
  </h1>
) */
/**
 * 参数1 标签的类型 h1 span div
 * 参数2 属性的JS对象
 * 参数3往后的都是儿子们
 */
let element = React.createElement("h1", {
  className: "title",
  style: {
    color: 'red'
  }
}, React.createElement("span", null, "hello"), "world");
console.log(JSON.stringify(element,null,2));
//ReactDOM才是最核心干活的,它在浏览器里执行的时候,可以把React元素,也就是虚拟DOM转换成真实DOM
ReactDOM.render(
  element,
  document.getElementById('root')
);
/**
就是一个普通的JS对象,就是虚拟DOM
{
  "type": "h1",
  "props": {
    "children": "Hello"
  }
}
 */


/**
 * 你以前在写JS
 * jsx很像html,更像js,而非html  里面的写法更多的是JS写法   document.getElementById('root').className='title'
 * 
 * <h1>hello</h1> 非常直观
 *  createElement不是那么直观
 * JSX在webpack打包的时候,会走babel-loader,babel-loader会把jsx转义成createElement
 * 真正浏览器跑的时候就是createElement,在浏览器里运行的时候,才会执行createElement方法得到虚拟DOM
 * React元素=虚拟DOM
 */

 /**
  * 
  */