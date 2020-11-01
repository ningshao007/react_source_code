import React from 'react';
import ReactDOM from 'react-dom';
let root = document.getElementById('root');
/**
 * 当你在事件处理函数中执行setState,组件并不会立刻渲染,而是先把更新存起来,等事件处理函数执行完了再会批量更新
 */
class Counter extends React.Component{
    constructor(props){
        super(props);
        this.state = {name:'zhufeng',number:0};
    }
    handleClick=()=>{
        this.setState({number: 1,name:undefined}); 
        //this.setState((previousState)=>({number: previousState.number+1})); 
    }
    render(){
        return (
            <div>
                <p>name:{this.state.name}</p>
                <p>number:{this.state.number}</p>
                <button onClick={this.handleClick}>+</button>
            </div>
        )
    }
}

ReactDOM.render(<Counter/>,root);