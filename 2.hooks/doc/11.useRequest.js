import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
const PAGE_SIZE=5;
/**
 * 如何在hooks中发起AJAX请求，以及如何实现分页加载 
 * start=0 pageSize=5 0~5  左闭右开区间,包左不包右 [0,5]
 * start=5 pageSize=5 5~10
 * start=10 pageSize=5 10~15
 */

function useRequest(url){
  let [start,setStart]= useState(0);
  let [users,setUsers]= useState([]);
  async function loadMore(){
    setUsers(null);//异步的
    console.log('loadMore.users=',users);
    let pageData = await  fetch(`${url}?start=${start}&pageSize=${PAGE_SIZE}`)
    .then(res=>{
      return res.json();
    })
    console.log('pageData.users',users);
    setUsers([...users,...pageData]);
    setStart(start+PAGE_SIZE);
  }
  //useEffect(loadMore,[]);
  return [users,loadMore];
}
function App(){
     let [users,loadMore] = useRequest('http://localhost:8080/api/users');
     console.log('App.users',users);
     if(!users)
         return <div>加载中......</div>;
     return (
      <>
       <ul>
         {
           users.map(item=><li key={item.id}>{item.name}</li>)
         }
       </ul>
       <button onClick={loadMore}>加载下一页</button>
      </>
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