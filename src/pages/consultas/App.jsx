import { React, Component } from 'react';
import axios from "axios";

import logo from "../../assets/logo.png"
import calendario from "../../assets/calendar.png"
import seta from "../../assets/arrow.png"

class ListarConsultas extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listaConsultas: [],
            navAtual: 0,
            navLength: 0,
        }
    }

    mudarNavPage = async (event) => {
        await this.setState({
            navAtual: parseInt(event.target.value)
        })
        // console.log(this.state.navAtual)
    }

    calcularNavPage() {
        this.setState({
            // navLength: Math.ceil((this.state.listaConsultas.length / 6))
            navLength: 5
        })
        // console.log(this.state.navLength)
    }


    async listarConsultas() {
        await axios('http://localhost:5000/api/Consultas', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then(resposta => {
                if (resposta.status == 200) {
                    this.setState({ listaConsultas: resposta.data })
                };
                //console.log(this.state.listaConsultas)
            })

            .catch(erro => console.log(erro))

        this.calcularNavPage()

    }

    obterMedico(id) {
        axios(`http://localhost:5000/api/Medicos/${id}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then(resposta => {
                if (resposta.status == 200) {
                    return resposta.data.nome
                };
            })

            .catch(erro => console.log(erro))
    }

    componentDidMount() {
        this.listarConsultas();
    }

    render() {

        let navPage = []

        for (let i = 0; i < this.state.navLength; i++) {
            navPage.push(i + 1)
        }

        return (
            <section className="listar">
                {
                    this.state.listaConsultas.map(x => {
                        return (
                            <article>
                                <div className="nomes-consulta">
                                    <img src={calendario} alt="" />
                                    <div className="nomes-div">
                                        <p>Dr. {this.obterMedico(x.idMedico)}</p>
                                        <span>Pedro Paulo Pereira Pontes</span>
                                    </div>
                                </div>

                                <button>Editar descrição</button>

                                <div className="hora-consulta">
                                    <p>{x.dataConsulta.split('T')[1].substring(0, 5)}</p>
                                    <span>{x.dataConsulta.split('T')[0]}</span>
                                </div>
                            </article>
                        )
                    })
                }

                
                {/* <article>
                    <div className="nomes-consulta">
                        <img src={calendario} alt="" />
                        <div className="nomes-div">
                            <p></p>
                            <span>Pedro Paulo Pereira Pontes</span>
                        </div>
                    </div>

                    <button>Editar descrição</button>

                    <div className="hora-consulta">
                        <p></p>
                        <span>00/00/0000</span>
                    </div>
                </article> */}
                
                {
                    //this.state.navPage.largura > 1 ?

                    <nav>
                        <img src={seta} alt="" />

                        {
                            navPage.map(x => {
                                return (
                                    <button className="nav-page" value={x} onClick={this.mudarNavPage} >{x}</button>
                                )
                            })
                        }

                        <img id="last-arrow" src={seta} alt="" />
                    </nav>
                    //: null

                }

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
                <header className="container">
                    <img src={logo} alt="Logo SPMedicalGroup" />
                    <nav>
                        <a href="#">Home</a>
                        <a href="#">Consultas</a>
                        <button id="logar" href="#">Conectar</button>
                    </nav>
                </header>
                <main className="main-consultas container">
                    <h1>Consultas</h1>
                    <hr />
                    <div className="consultas-section">
                        <ListarConsultas />

                        <section className="cadastrar">
                            <h2>Cadastro</h2>
                            <hr />
                            <form>

                                <select name="medico">
                                    <option value="0" value disabled>Médico</option>
                                    <option value="">Teste 1</option>
                                    <option value="">Teste 2</option>
                                    <option value="">Teste 3</option>
                                </select>

                                <select name="paciente">
                                    <option value="0" value disabled>Paciente</option>
                                    <option value="">Teste 1</option>
                                    <option value="">Teste 2</option>
                                    <option value="">Teste 3</option>
                                </select>

                                <select name="situação">
                                    <option value="0" value disabled>Situação</option>
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