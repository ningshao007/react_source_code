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
function useLayoutEffect(callback,deps){
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
      //添加一个微任务，保证callback会在下次页面渲染之前执行
      Promise.resolve().then(()=>{
        let destroy = callback();
        state.destroy=destroy;
      });
    }
  }else{
    let state = {lastDeps:deps};
    hookStates[hookIndex++]=state;//直接赋值 
    //添加一个微任务
    queueMicrotask(()=>{
      let destroy = callback();
      state.destroy=destroy;
    });
  }
}
const Animation = ()=>{
  let divRef = React.useRef();
   useEffect(()=>{
    divRef.current.style.transform='translate(500px)';
    divRef.current.style.transition = 'all 500ms';
  },[]); 
  /*
  useLayoutEffect(()=>{
    divRef.current.style.transform='translate(100px)';
    divRef.current.style.transform='translate(200px)';
    divRef.current.style.transform='translate(300px)';
    divRef.current.style.transform='translate(400px)';
    divRef.current.style.transform='translate(500px)';
    divRef.current.style.transition = 'all 500ms';
  },[]); */
  let style = {
    width:'100px',
    height:'100px',
    backgroundColor:'red'
  }
  return (
    <div style={style} ref={divRef}></div>
  )
}


function render(){
  hookIndex = 0;
  ReactDOM.render(
    <Animation />,
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