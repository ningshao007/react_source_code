import React from 'react';
import ReactDOM from 'react-dom';

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
function useEffect(callback,deps){
  //会重新渲染
  if(hookStates[hookIndex]){
    let {destroy,lastDeps} = hookStates[hookIndex];//先获取到上一次的依赖数组
    let same = deps.every((item,index)=>item===lastDeps[index]);
    if(same){//如果本次的依赖数组和上次的依赖数组一样
      hookIndex++;
    }else{
      if(destroy)destroy();
      let state = {lastDeps:deps};
      hookStates[hookIndex++]=state;//直接赋值 
      setTimeout(()=>{
        let destroy = callback();
        state.destroy=destroy;
      });//用宏任务实现，保证callback是在本次页面渲染结束之后执行的
    }
  }else{
    let state = {lastDeps:deps};
    hookStates[hookIndex++]=state;//直接赋值 
    setTimeout(()=>{
      let destroy = callback();
      state.destroy=destroy;
    });//用宏任务实现，保证callback是在本次页面渲染结束之后执行的
  }
}

function FunctionCounter(){
  console.log('FunctionCounter render');
  let [number,setNumber]=useState(0);
  //useEffect里的函数会在第一个挂载之后和每次更新之后都会执行
  useEffect(()=>{
    //document.title = `你点击了${number}次`;
    console.log('开启的定时器');
    let timer = setInterval(()=>{
      setNumber(number=>number+1)
    },1000);
    return ()=>{ //destroyFunction 清除副作用
      console.log('销毁老的定时器');
      clearInterval(timer);
    }
  },[number]);//空数组表示依赖项永远不变，所以回调函数只会执行一次
  return (
    <div>
      <p>{number}</p>
      <button onClick={()=>setNumber(number+1)}>+</button>
    </div>
  )
}

function render(){
  hookIndex = 0;
  ReactDOM.render(
    <FunctionCounter />,
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