import { Component } from "react";
import axios from "axios";
import { parseJwt, usuarioAutenticado } from '../../services/auth/auth';
import { Link } from 'react-router-dom';

import logo from "../../assets/logo.png"

export default class Home extends Component {
    
    redirecionarPara = (path) => {
        this.props.history.push(path.target.name)
    }

    efetuarLogout = () => {
        localStorage.removeItem('usuario-login')
        this.props.history.push('/login')
    }

    render() {
        return (
            <div>
                <header class="container">
                    <img src={logo} alt="Logo SPMedicalGroup" />
                    <nav>
                        <a>Home</a>
                        <a name="/consultas" onClick={this.redirecionarPara} >Consultas</a>

                        {
                            usuarioAutenticado() 
                            ? <button id="deslogar" name="/login" onClick={this.efetuarLogout} >Desconectar</button>
                            : <button id="logar" name="/login" onClick={this.redirecionarPara} >Conectar</button>

                        }
                    </nav>
                </header>

                <main class="banner-home">
                    <div>
                        <img src={logo} alt="Logo SPMedicalGroup" />
                        <hr />
                        <span>Um nível superior de atendimento.</span>
                    </div>
                </main>

                <footer>
                    <p>Escola Senai De Informática - 2021</p>
                </footer>
            </div >
        )
    }
}