import React from './react';
import ReactDOM from './react-dom';
let root = document.getElementById('root');
class Counter extends React.Component {
	static defaultProps = {
		//默认属性
		name: 'zhufeng',
	};
	constructor(props) {
		super(props);
		this.state = { number: 0 };
		console.log('Counter 1.set up props and state');
	}
	componentWillMount() {
		console.log('Counter 2.componentWillMount');
	}
	render() {
		console.log('Counter 3.render');
		return (
			<div>
				<p>{this.state.number}</p>
				<button onClick={this.handleClick}>+</button>
			</div>
		);
	}
	componentDidMount() {
		console.log('Counter 4.componentDidMount');
	}
	handleClick = (event) => {
		this.setState({ number: this.state.number + 1 });
	};
	shouldComponentUpdate(nextProps, nextState) {
		console.log('Counter 5.shouldComponentUpdate');
		return nextState.number % 2 === 0; //如果是偶数就true更新 奇数不更新
	}
	componentWillUpdate() {
		console.log('Counter 6.componentWillUpdate');
	}
	componentDidUpdate() {
		console.log('Counter 7.componentDidUpdate');
	}
}
ReactDOM.render(<Counter />, root);

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
