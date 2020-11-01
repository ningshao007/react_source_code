import React from 'react';
import ReactDOM from 'react-dom';
let hookStates = [];
let hookIndex = 0;
function useReducer(reducer,initialState,init){
  hookStates[hookIndex] = hookStates[hookIndex]||(init?init(initialState):initialState);
  let currentIndex = hookIndex; 
  function dispatch(action){
    hookStates[currentIndex]=reducer?reducer(hookStates[currentIndex],action):action;
    render();
  }
  return [hookStates[hookIndex++],dispatch];
}
//useState只是一个简化版的useReducer 是一个语法糖

function useState(initialState){
  //reducer就是一个状态变更的转换函数
  return useReducer(null,initialState);
}

/**
 * 处理器 状态变更函数
 * 接收一个老状态和一个action(动作),返回一个新状态
 */
function reducer(state,action){
  switch(action.type){
    case 'ADD':
      return {number:state.number+1};
    case 'MINUS':
      return {number:state.number-1};  
    default:
      return state;  
  }
}
let initialState = 0;
function init(initialState){
  return {number:initialState};
}
//什么时候用useState?什么时候用useReducer?
//状态变更逻辑比较简的时候，useState,如果状态变更是间接的，处理逻辑比较复杂，useReducer
function Counter(){
  let [count,setCount] = useState(0);
  let [state,dispatch] = useReducer(reducer,initialState,init);
  return (
    <div>
      <p>number:{state.number}</p>
      <button onClick={()=>dispatch({type:'ADD'})}>number+</button>
      <p>count:{count}</p>
      <button onClick={()=>setCount(count+1)}>count+</button>
    </div>
  )
}

function render(){
  hookIndex=0;
  ReactDOM.render(
    <Counter />,
    document.getElementById('root')
  );
}
render();



/*
useMemo<{
  number: number;
}>(factory: () => {
  number: number;
}, deps: React.DependencyList): {
  number: number;
} */