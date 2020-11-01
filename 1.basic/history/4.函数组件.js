import React from './react';
import ReactDOM from './react-dom';
let root = document.getElementById('root');
/**
 * 定义一个函数组件 名字首字母必须要大写
 * 函数数组的渲染过程
 * 1.定义一个React元素,也就 虚拟DOM,它的type=Welcome
 * 2.render方法会执行这个Welcome函数,并传入props对象,得到返回的虚拟DOM,
 * 3.把返回的虚拟DOM转成真实DOM并插入到页面中去
 * @param { } props 
 */
function Hello(props){
  //return <h1>hello,{props.name}</h1>;
  //return React.createElement('h1',null,`hello,${props.name}`);
  return (
    <h1>
      <span>111</span>
      <span>hello，{props.name}</span>
    </h1>
  )
}
function Welcome(props){
  return <Hello name={props.name}/>
}
//type=字符串的话说明是一个原生DOM类型 span h1 div
//type=函数的话 说明它是一个函数组件的元素
//let element = React.createElement(Welcome,{name:'zhufeng'});
let element = <Welcome name="zhufeng"/>
console.log(element);
ReactDOM.render(element,root);
