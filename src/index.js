import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import './index.css';
import Login from './pages/login/App.jsx';
import Home from './pages/home/App.jsx';
import Consultas from './pages/consultas/App.jsx';
import ConsultasMed from './pages/consultas-med/App.jsx';
import ConsultasPac from './pages/consultas-pac/App.jsx';
import { parseJwt, usuarioAutenticado } from './services/auth/auth';
import reportWebVitals from './reportWebVitals';

const PermissaoAdm = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === 'ADM' ? (
        // operador spread
        <Component {...props} />
      ) : (
        <Redirect to="login" />
      )
    }
  />
);

const PermissaoMed = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === 'MED' ? (
        // operador spread
        <Component {...props} />
      ) : (
        <Redirect to="login" />
      )
    }
  />
);
const PermissaoPac = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === 'PAC' ? (
        // operador spread
        <Component {...props} />
      ) : (
        <Redirect to="login" />
      )
    }
  />
);

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/login" component={Login}></Route>
        <PermissaoAdm path="/consultas" component={Consultas}></PermissaoAdm>
        <PermissaoMed path="/consultas-medico" component={ConsultasMed}></PermissaoMed>
        <PermissaoPac path="/consultas-paciente" component={ConsultasPac}></PermissaoPac>
        <Redirect to="/" />
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
