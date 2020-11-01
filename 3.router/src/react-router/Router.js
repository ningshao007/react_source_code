import React from 'react'
import RouterContext from './RouterContext';
/**
 * 1.获取location并通过上下文向下层级Route等组件传递，Route里面可以通过Context获取到
 * location,location.pathname获取路径名，然后跟自己的path进行匹配，如果匹配就渲染component
 * 如果不匹配就什么都不做
 * 2.监听路径变化，当路径发生变化的时候修改state.location
 */
class Router extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            location:props.history.location
        }
        //当路径发生的变化的时候执行回调
        this.unlisten = props.history.listen(({location})=>{
            this.setState({location});
        });
    }
    componentWillUnmount(){
        this.unlisten&&this.unlisten();
    }
    render(){
        let value = {//通过value向下层传递数据
            location:this.state.location
        }
        return (
            <RouterContext.Provider value={value}>
                {this.props.children}
            </RouterContext.Provider>
        )
    }
}

export default Router;