import { reactText, reactFragment } from './constants';
import { addEvent } from './event';

/**
 * 虚拟DOM转换成真实DOM,并插入到容器里
 * @param {*} vdom 虚拟DOM
 * @param {*} container 插入到哪个容器里
 */
function render(vdom, container) {
	//{type:Counter}
	const dom = createDOM(vdom);
	if (dom) container.appendChild(dom);
}
/**
 * 把虚拟DOM变成真实DOM
 * @param {*} vdom null 数字 字符串 React元素 不能是数组
 */
export function createDOM(vdom) {
	if (!vdom) {
		return '';
	}
	let { type, props, ref } = vdom;
	let dom;
	//如果vdom是一个字符串或者数字的话,创建一个文本的DOM节点返回
	if (type === reactText) {
		dom = document.createTextNode(vdom);
		dom.textContent = vdom.props.content;
	} else if (typeof type === 'function') {
		//如果是一个组件的话,还要区分到底是类组件还是函数组件
		if (type.isReactComponent) {
			//说明这个type是一个类组件的虚拟DOM元素
			return mountClassComponent(vdom);
		} else {
			return mountFunctionComponent(vdom);
		}
	} else {
		//如果是一个react空节点
		if (type === reactFragment) {
			//React空节点 dom Fragment
			dom = document.createDocumentFragment();
		} else {
			// 如果是原生dom节点
			dom = document.createElement(type); //span div
		}
	}
	if (props.children) {
		updateProps(dom, {}, props); //更新属性,把虚拟DOM上的属性设置到真实DOM上
		//处理子节点如果子节点就是一个单节点,并且是字符串或者数字的话
		if (typeof props.children === 'object' && props.children.type) {
			render(props.children, dom);
			//如果儿子是一个数组,说明有多个子节点
		} else if (Array.isArray(props.children)) {
			reconcileChildren(props.children, dom);
		} else {
			//如果出现了其它的意外情况 null就是空串 比如说Object
			dom.textContent = props.children ? props.children.toString() : '';
		}
	}
	if (ref) ref.current = dom;
	//让虚拟DOM的dom属性指定此虚拟DOM创建出来的真实DOM
	vdom.dom = dom;
	return dom;
}
/**
 * 得到真实DOM
 * 1. 创建类组件的实例
 * 2. 调用实例的render方法得到将要渲染的React元素
 * 3. 把React元素转成真实DOM,挂载到父节点上就可以了
 * @param {*} vdom 类组件的虚拟DOM React元素
 */
function mountClassComponent(vdom) {
	let { type, props } = vdom;
	let classInstance = new type(props); // new Counter({name:'zhufeng'})
	vdom.classInstance = classInstance; //让虚拟DOM的classInstance=类组件实例 TODO
	classInstance.ownVdom = vdom; //vdom就是Counter类的vdom
	if (classInstance.componentWillMount) {
		classInstance.componentWillMount();
	}
	//调用实例的render方法得到一个虚拟DOM对象或者说React元素 div
	let renderVdom = classInstance.render(); //<div id="counter">p,ChildCounter,button</div>
	//通过虚拟DOM创建了一个真实DOM //<div id="counter"><p>,ChildCounter,<button></div>
	const dom = createDOM(renderVdom);
	//让类组件实例上挂一个dom,指向类组件的实例的真实DOM, setState会用到
	//这个类虚拟DOM的dom属性和render方法返回的虚拟DOM的dom属性都指向真实DOM
	//vdom 和renderDom 有什么区别？
	//{type:Counter} renderVdom {type:'div'}
	//让组件实例的老的Vdom属性指向本次render出来的渲染
	classInstance.oldRenderVdom = renderVdom;
	if (classInstance.componentDidMount) {
		classInstance.componentDidMount();
	}
	return dom;
}
/**
 * 得到真实DOM
 * @param {*} vdom 函数组件的虚拟DOM React元素
 * vdom {type:Welcome,props:{name:'zhufeng'}}
 * renderVdom {type:'h1',props:{children:'hello,zhufeng'}}
 */
function mountFunctionComponent(vdom) {
	let { type, props } = vdom; //这是type就是那个函数组件 组件函数
	let renderVdom = type(props); //可能是一个原生虚拟DOM,也可能还是一个组件虚拟DOM
	vdom.renderVdom = renderVdom;
	return createDOM(renderVdom); //创建DOM进行挂载
}
/**
 * 把子节点从虚拟DOM全部转成真实DOM并且插入到父节点中去
 * @param {*} childrenVdom 子节点的虚拟DOM数组
 * @param {*} parentDOM 父节点的真实DOM
 */
function reconcileChildren(childrenVdom, parentDOM) {
	childrenVdom.forEach((childVdom) => {
		render(childVdom, parentDOM);
	});
}
/**
 * 把属性对象中的属性设置到DOM元素上
 * @param {*} dom DOM元素
 * @param {*} props 属性对象
 */
function updateProps(dom, oldProps, newProps) {
	if (newProps)
		for (let key in newProps) {
			if (key === 'children') continue;
			if (key === 'style') {
				let styleObj = newProps[key];
				for (let key in styleObj) dom.style[key] = styleObj[key];
			} else if (key.startsWith('on')) {
				addEvent(dom, key.toLowerCase(), newProps[key]);
			} else {
				dom[key] = newProps[key];
			}
		}
	if (oldProps) {
		for (let key in oldProps) {
			if (!newProps.hasOwnProperty(key)) {
				dom[key] = '';
			}
		}
	}
}
function findDOM(vdom) {
	let { type } = vdom;
	let dom;
	if (typeof type === 'function') {
		if (type.isReactComponent) {
			dom = findDOM(vdom.classInstance.oldRenderVdom);
		} else {
			dom = findDOM(vdom.oldRenderVdom);
		}
	} else {
		//span div dom对应真实DOM
		//只有原生组件的虚拟DOM上才会有dom属性 类组件或函数组件身上没有这个属性
		dom = vdom.dom;
	}
	return dom;
}
/**
 * 找到老的虚拟DOMoldVom和新的虚拟DOM的差异,把相应的差异更新到真实DOM上
 * @param {*} parentDOM 父的DOM节点 div#root
 * @param {*} oldVdom 老的虚拟DOM
 * @param {*} newVdom 新的虚拟DOM
 */
export function compareTwoVdom(parentDOM, oldVdom, newVdom, nextDOM) {
	//如果老的是null新的也是null
	if (!oldVdom && !newVdom) {
		return null;
		//如果老有,新没有,意味着此节点被删除了
	} else if (oldVdom && !newVdom) {
		let currentDOM = findDOM(oldVdom);
		if (currentDOM) parentDOM.removeChild(currentDOM);
		if (oldVdom.classInstance && oldVdom.classInstance.componentWillUnmount) {
			oldVdom.classInstance.componentWillUnmount();
		}
		return null;
		//如果说老没有,新的有,新建DOM节点
	} else if (!oldVdom && newVdom) {
		let newDOM = createDOM(newVdom); //创建一个新的真实DOM并且挂载到父节点DOM上
		if (nextDOM) {
			//如果有下一个弟弟DOM的话,插到弟弟前面 p child-counter button
			parentDOM.insertBefore(newDOM, nextDOM);
		} else {
			parentDOM.appendChild(newDOM);
		}
		return newVdom;
		//如果类型不同，也不能复用了，也需要把老的替换新的
	} else if (oldVdom && newVdom && oldVdom.type !== newVdom.type) {
		let oldDOM = oldVdom.dom;
		let newDOM = createDOM(newVdom);
		oldDOM.parentNode.replaceChild(newDOM, oldDOM);
		if (oldVdom.classInstance && oldVdom.classInstance.componentWillUnmount) {
			oldVdom.classInstance.componentWillUnmount();
		}
		return newVdom;
	} else {
		//新节点和老节点都有值
		updateElement(oldVdom, newVdom);
		return newVdom;
	}
}
/**
 * DOM-DIFF的时候,React为了优化性能有一些假设条件
 * 1.不考虑跨层移动的情况
 * 进入深度比较
 * @param {*} oldVdom 老的虚拟DOM
 * @param {*} newVdom 新的虚拟DOM
 */
function updateElement(oldVdom, newVdom) {
	if (oldVdom.type === reactText) {
		let currentDOM = (newVdom.dom = oldVdom.dom); //获取 老的真实DOM
		currentDOM.textContent = newVdom.props.content;
	} else if (typeof oldVdom.type === 'string') {
		//原生的DOM类型 div span p
		let currentDOM = (newVdom.dom = oldVdom.dom); //获取 老的真实DOM
		updateProps(currentDOM, oldVdom.props, newVdom.props);
		updateChildren(currentDOM, oldVdom.props.children, newVdom.props.children);
	} else if (typeof oldVdom.type === 'function') {
		//就是类组件了
		if (oldVdom.type.isReactComponent) {
			//说明它是一个类组件的实例
			newVdom.classInstance = oldVdom.classInstance;
			updateClassInstance(oldVdom, newVdom);
		} else {
			//说明它是一个函数式组件
			updateFunctionComponent(oldVdom, newVdom);
		}
	}
}
//let {type,props} = vdom;//这是type就是那个函数组件 组件函数
//let renderVdom = type(props);//可能是一个原生虚拟DOM,也可能还是一个组件虚拟DOM
//return createDOM(renderVdom);//创建DOM进行挂载
function updateFunctionComponent(oldVdom, newVdom) {
	let parentDOM = oldVdom.renderVdom.dom.parentNode;
	let { type, props } = newVdom; //获取新的虚拟函数组件
	let newRenderVdom = type(props); //传入属性对象并执行它,
	newVdom.renderVdom = newRenderVdom;
	compareTwoVdom(parentDOM, oldVdom.renderVdom, newRenderVdom);
}
/**
 *
 * @param {*} parentDOM 父的真实DOM
 * @param {*} oldVChildren  老的虚拟DOM儿子们
 * @param {*} newVChildren  新的虚拟DOM儿子们
 */
function updateChildren(parentDOM, oldVChildren, newVChildren) {
	oldVChildren = Array.isArray(oldVChildren) ? oldVChildren : [oldVChildren];
	newVChildren = Array.isArray(newVChildren) ? newVChildren : [newVChildren];
	let maxLength = Math.max(oldVChildren.length, newVChildren.length);
	for (let i = 0; i < maxLength; i++) {
		//找此虚拟DOM对应的真实DOM之后的存在的真实DOM
		let nextDOM = oldVChildren.find(
			(item, index) => index > i && item && item.dom,
		);
		compareTwoVdom(
			parentDOM,
			oldVChildren[i],
			newVChildren[i],
			nextDOM && nextDOM.dom,
		);
	}
}
function updateClassInstance(oldVdom, newVdom) {
	let classInstance = oldVdom.classInstance;
	//当父组件更新的时候,会让子组件更新
	if (classInstance.componentWillReceiveProps) {
		classInstance.componentWillReceiveProps();
	}
	//把新的属性传递给emitUpdate方法
	classInstance.updater.emitUpdate(newVdom.props);
}

let ReactDOM = { render };
export default ReactDOM;
