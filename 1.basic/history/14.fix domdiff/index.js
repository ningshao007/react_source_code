import React from './react';
import ReactDOM from './react-dom';
let root = document.getElementById('root');
class Counter extends React.Component{
    constructor(props){
        super(props);
        this.state = {number:0};
        console.log('Counter 1.set up props and state');
    }
    render(){
        console.log('Counter 3.render');
        return (
            <div>
                {this.state.number%2===0?<p>{this.state.number}</p>:<span>{this.state.number}</span>}
                <button onClick={this.handleClick}>+</button>
            </div>
        )
    }
    handleClick=(event)=>{
        this.setState({number:this.state.number+1});
    }
}
ReactDOM.render(<Counter/>,root);

/**
Counter 1.set up props and state
Counter 2.componentWillMount
Counter 3.render
Counter 4.componentDidMount
2 Counter 5.shouldComponentUpdate
Counter 6.componentWillUpdate
Counter 3.render
Counter 7.componentDidUpdate
2 Counter 5.shouldComponentUpdate
Counter 6.componentWillUpdate
Counter 3.render
Counter 7.componentDidUpdate
 */