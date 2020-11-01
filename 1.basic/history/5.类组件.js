import React from './react';
import ReactDOM from './react-dom';
let root = document.getElementById('root');
/**
 * 1.React元素可能是字符串(原生DOM类型),也可能一个函数(函数组件),也可能是一个类(类组件)
 * 2.在定义组件元素的时候,会把JSX所有的属性封装成一个props对象传递给组件
 * 3.组件的名称一定要首字母大写,React是通过首字母来区分原生还是自定义组件
 * 4.组件要先定义,再使用
 * 5.组件要返回并且只能返回一个React根元素 JSX expressions must have one parent element
 * 类组件是如何渲染的?
 * 1.element定义一个类组件React元素
 * 2.render 1.先创建类组件的实例 new Welcome(props) this.props = props;
 * 3.       2.调用实例的render方法得到一个react元素
 *          3.把这个React元素转换成真实的DOM元素并插入到页面中去
 */
class Welcome extends React.Component{  // this.props={name:'zhufeng'}
  render(){
    return <h1>hello,{this.props.name}</h1>;
  }
}
let element = <Welcome name="zhufeng"/>
ReactDOM.render(element,root);


/**
 * jsx=React.createElement
 * 在浏览器执行的时候,createElement方法的返回值才是React元素=虚拟DOM
 * jsx 是一种语法,或者是一种写代码的方法 ,打包的时候会进行编译,编译成React.createElement
 * React.createElement只是创建React元素的方法
 * React元素=虚拟DOM,也就是一个普通的JSX对象,描述了真实DOM的样子
 * 一直说的React元素，是不是写的jsx就是react元素 ?不是的

 */