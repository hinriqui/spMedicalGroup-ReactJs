import { Component } from "react";
import axios from "axios";
import { parseJwt, usuarioAutenticado } from '../../services/auth/auth';

import logo from "../../assets/logo.png"
import calendario from "../../assets/calendar.png"
import seta from "../../assets/arrow.png"

class ListarConsultas extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listaConsultas: [],
            navPage: 0,
        }
    }


    //TA COM PROBLEMA AQUI!!!!!!
    listaConsultas() {
        axios('http://localhost:5000/api/Consultas', {
            headers: 
            {'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')}
        }),
            .then(resposta => {
            this.setState({ listaConsultas: resposta })
        }
    }

    componentDidMount() {

    }



    render() {
        return (
            <section class="listar">
                <article>
                    <div class="nomes-consulta">
                        <img src={calendario} alt="" />
                        <div class="nomes-div">
                            <p>Dr. Fulano Detau</p>
                            <span>Pedro Paulo Pereira Pontes</span>
                        </div>
                    </div>

                    <button>Editar descrição</button>

                    <div class="hora-consulta">
                        <p>00:00</p>
                        <span>00/00/0000</span>
                    </div>
                </article>

                <nav>
                    <img src={seta} alt="" />
                    <div class="nav-page">1</div>
                    <div class="nav-page">2</div>
                    <div class="nav-page">3</div>
                    <div class="nav-page">4</div>
                    <div class="nav-page">5</div>
                    <img id="last-arrow" src={seta} alt="" />
                </nav>
            </section>
        )
    }
}

export default class Consultas extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listaConsultas: [],
        }
    }

    render() {
        return (
            <div>
                <header class="container">
                    <img src={logo} alt="Logo SPMedicalGroup" />
                    <nav>
                        <a href="#">Home</a>
                        <a href="#">Consultas</a>
                        <button id="logar" href="#">Conectar</button>
                    </nav>
                </header>
                <main class="main-consultas container">
                    <h1>Consultas</h1>
                    <hr />
                    <div class="consultas-section">
                        <ListarConsultas />

                        <section class="cadastrar">
                            <h2>Cadastro</h2>
                            <hr />
                            <form>

                                <select name="medico">
                                    <option value="0" selected disabled>Médico</option>
                                    <option value="">Teste 1</option>
                                    <option value="">Teste 2</option>
                                    <option value="">Teste 3</option>
                                </select>

                                <select name="paciente">
                                    <option value="0" selected disabled>Paciente</option>
                                    <option value="">Teste 1</option>
                                    <option value="">Teste 2</option>
                                    <option value="">Teste 3</option>
                                </select>

                                <select name="situação">
                                    <option value="0" selected disabled>Situação</option>
                                    <option value="">Teste 1</option>
                                    <option value="">Teste 2</option>
                                    <option value="">Teste 3</option>
                                </select>

                                <input type="number" min="0.00" max="10000.00" step="0.01" placeholder="Valor" />
                                <input type="date" placeholder="Data" />

                                <button type="submit">Cadastrar</button>
                            </form>
                        </section>
                    </div>

                </main>
            </div>
        )
    }
}