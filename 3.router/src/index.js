import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Route} from 'react-router-dom';
import Home from './components/Home';
import User from './components/User';
import Profile from './components/Profile';
//path匹配pathname的时候默认匹配的是前缀
//pathname=/user  path=/
ReactDOM.render(
  <HashRouter>
    <>
      <Route path="/" component={Home} exact/>
      <Route path="/user" component={User}/>
      <Route path="/profile" component={Profile}/>
    </>
  </HashRouter>,
  document.getElementById('root')
);
