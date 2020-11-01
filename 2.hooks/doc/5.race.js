import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
/**
 * 竞态 先发的请求后回来了，
 * 2 5秒
 * 3 2秒
 */
const API = {
  //1 4000 2 3000 3 2000 4 1000
  async fetchArticle(id){
    return new Promise(resolve=>{
      setTimeout(()=>{
        resolve({id,title:`title_${id}`});
      },1000*(5-id));
    });
  }
}
function Article({id}){
  let [article,setArticle] = React.useState({});
  useEffect(()=>{
    let didCancel = false;//定义一个变量记录此请求是否取消了
    async function fetchData(){
      let article = await API.fetchArticle(id);
      if(!didCancel)//如果没取消，我就赋值，如果取消了，就不赋值了
        setArticle(article);
    }
    fetchData();// 1 2  3
    return ()=>{//销毁函数
      didCancel =true;
    }
  },[id]);
  return (
   <div><p>{article.title}</p></div>
  )
}
function App(){
  let [id,setId] = React.useState(1);
  return (
    <div>
      <p>id:{id}</p>
      <Article id={id}/>
      <button onClick={()=>setId(id+1)}>改变ID</button>
    </div>
  )
}
function render(){
  ReactDOM.render(
    <App />,
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