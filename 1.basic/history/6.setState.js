import React from 'react';
import ReactDOM from 'react-dom';
let root = document.getElementById('root');
/**
 * 属性是外部传入的,不能改 类组件和函数组件都有属性
 * 状态是内部产生的,可以改 状态只能用在类组件里
 * 唯一能给this.state赋值的地方就是构造函数,只能初始值,其它地方要想改变状态只能调用setState()方法
 * 每当你调用setState方法的时候就会引起组件的刷新,组件会重新调用一次render方法,得到新虚拟DOM,进行DOM更新
 */
class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state = {date:new Date()};
        setInterval(this.tick,1000);
    }
    tick=()=>{
        //Do not mutate state directly. Use setState()
        this.setState({date:new Date()});
    }
    render(){
        return (
            <div>
                <h1>Hello</h1>
                <h2>当前的时间:{this.state.date.toLocaleTimeString()}</h2>
            </div>
        )
    }
}
let element = <Clock/>
ReactDOM.render(element,root);