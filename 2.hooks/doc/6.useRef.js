import React from 'react';
import ReactDOM from 'react-dom';
/**
 * 如何获取 最新的值
 * useRef会返回一个可变的ref对象 {current}
 * ref对象在组件的整个生命周期内保持不变
 */
let hookStates = [];
let hookIndex = 0;
function useState(initialState){
  hookStates[hookIndex] = hookStates[hookIndex]||initialState;
  let currentIndex = hookIndex; 
  function setState(newState){
    hookStates[currentIndex]=typeof newState === 'function'?
    newState(hookStates[currentIndex]):newState;
    render();
  }
  return [hookStates[hookIndex++],setState];
}
function useRef(current){
  hookStates[hookIndex] = hookStates[hookIndex]||{current};
  return hookStates[hookIndex++];
}
//只要函数组件重新渲染执行完成了，那么里面的状态就是最新的了
//类组件需要创建实例，不能轻易销毁，比较消耗性能 current可以是任意东西
//React.createRef React.useRef;

function Counter(){
  let [number,setNumber] = useState(0);
  let lastNumberRef = useRef(number);
  let alertNumber = ()=>{
    setTimeout(() => {
      alert(lastNumberRef.current);
    }, 3000);
  }
  //在每次渲染结束后，这个时候number值是最新的，我就把number
  React.useEffect(()=>{
    //为什么是可变的，因为lastNumberRef.current是可以改的，不是只读的
    lastNumberRef.current = number;
  });
  return (
    <div>
      <p>{number}</p>
      <button onClick={()=>{
        setNumber(number+1);
       
      }}>+</button>
      <button onClick={alertNumber}>alert</button>
    </div>
  )
}
function render(){
  hookIndex = 0;
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