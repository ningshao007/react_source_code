import React from 'react';
import ReactDOM from 'react-dom';
/**
 * hooks都是函数
 * 会以use开头
 * 类组件需要创建实例 性能较差
 * 1.每次组件渲染都是一个独立的闭包
 * 函数式更新
 */
let lastState;
function useState(initialState){
  lastState = lastState||typeof initialState ==='function'?initialState():initialState;
  function setState(newState){
    if(typeof newState === 'function'){
      newState=newState(lastState);
    }
    lastState=newState;
    render();
  }
  return [lastState,setState];
}
let lastRef;
function useRef(){
  lastRef=lastRef||{current:null};
  return lastRef;
}
function Counter(){
   console.log('Counter render');
   let [number,setNumber] = React.useState(()=>{
     return {count:0};
   });
   let numberRef = React.useRef();//实现并不完美，后面你们会有更优雅的实现

   function updateNumber(){
     setTimeout(()=>{
      setNumber(x=>({count:x.count+1}));
     },1000);
   }
   return (
     <div>
       <p>{number.count}</p>
       <button onClick={()=>{
         setNumber(x=>x+1);
         numberRef.current = number+1
       }}>+</button>
       <button onClick={updateNumber}>lazyUpdate</button>
     </div>
   )
}

function render(){
  ReactDOM.render(
    <Counter />,
    document.getElementById('root')
  );
}
render();
