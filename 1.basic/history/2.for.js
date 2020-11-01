import React from 'react'; //react的核心库
import ReactDOM from 'react-dom'; //react的dom渲染库
//1.jsx表达式 可以把一些表达式放在大括号里
//表达式就是变量、常量和运算符的组合 1+2  a+b
//属性名不能是JS的关键字 class=>className for=>htmlFor style=对象而字符串
//2.jsx也是对象 if for 中使用
let title = 'hello';
//let element = <h1 className={title} style={{color:'red'}} htmlFor="username">{title}</h1>

/* function greeting(name){
   if(name){
      return <h1>hello {name}</h1>
   }else{
     return <h1>hello stranger</h1>
   }
}
let element = greeting('zhufeng'); */
let names = ['大毛', '二毛', '三毛'];
//把一个字符串的数组映射为一个li的数组
let lis = names.map((name) => <li>{name}</li>);
ReactDOM.render(<ul>{lis}</ul>, document.getElementById('root'));
