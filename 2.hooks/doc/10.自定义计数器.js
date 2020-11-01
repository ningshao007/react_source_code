import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

/**
React Hook "useState" is called in function "getNumber" 
that is neither a React function component 
nor a custom React Hook function.
React component names must start with an uppercase letter.
如果组件更新了，又从1开始累加了吧 
 */
function useNumber(init){
  let [number,setNumber] =useState(init);
  useEffect(()=>{
    setInterval(()=>{
      setNumber(number=>number+1);
    },3000);
  },[]);
  return [number,()=>setNumber(x=>x+1)];
}
function Timer1(){
  let [number,add] = useNumber(1);
  return (
    <div>
      <p>{number}</p>
      <button onClick={add}>+</button>
    </div>
  )
}
function Timer2(){
  let [number,add] = useNumber(10);
  return (
    <div>
      <p>{number}</p>
      <button onClick={add}>+</button>
    </div>
  )
}

function render(){
  ReactDOM.render(
    <div>
       <Timer1 />
       <Timer2 />
    </div>,
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