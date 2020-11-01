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
		//return React.createElement('ReactFragment',null, <p>number: {this.state.number}</p>,<button onClick={this.handleClick}>+</button>);
		let props = {};
		if (this.state.number < 1) {
			props.id = 'myid';
			props.className = 'mytitle';
		}

		return (
			<div {...props}>
				<p>number: {this.state.number}</p>
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
	componentWillUpdate() {
		console.log('Counter 6.componentWillUpdate');
	}
	componentDidUpdate() {
		console.log('Counter 7.componentDidUpdate');
	}
}
ReactDOM.render(<Counter />, root);
