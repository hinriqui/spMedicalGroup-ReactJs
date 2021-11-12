import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import './index.css';
import Login from './pages/login/App.jsx';
import Home from './pages/home/App.jsx';
import Consultas from './pages/consultas/App.jsx';
import reportWebVitals from './reportWebVitals';

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/consultas" component={Consultas}></Route>
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
