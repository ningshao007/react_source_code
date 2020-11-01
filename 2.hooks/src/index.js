import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/**
 * 看一下如何使用Hooks做动画
 */
function useAnimation(baseClassName){
  let [className,setClassName] = useState(baseClassName);
  let [stage,setStage] = useState('initial');
  function start(){
    setStage('bigger');
  }
  useEffect(()=>{
    if(stage === 'bigger'){
      setClassName(`${baseClassName}-bigger`);
      setTimeout(()=>{
        setStage('initial');
      },1000);
    }else if(stage === 'initial'){
      setClassName(baseClassName);
    }
  },[baseClassName,stage]);
  return [className,start];
}
function App(){
  const [className,start] = useAnimation('circle');
  return (
    <div>
      <button onClick={start}>变大</button>
      <div className={className}></div>
    </div>
  )
}
function render(){
  ReactDOM.render(
    <App/>,
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