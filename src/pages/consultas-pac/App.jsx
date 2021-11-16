import { React, Component } from 'react';
import axios from "axios";
import { parseJwt, usuarioAutenticado } from '../../services/auth/auth';
import logo from "../../assets/logo.png"
import calendario from "../../assets/calendar.png"
import seta from "../../assets/arrow.png"

export default class Consultas extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listaConsultas: [],
            // navAtual: 0,
            // navLength: 0,
        }
    }

    redirecionarPara = (path) => {
        this.props.history.push(path.target.name)
    }

    efetuarLogout = () => {
        localStorage.removeItem('usuario-login')
        this.props.history.push('/login')
    }

    /// Em Desenvolvimento - NavPage
    //  
    // mudarNavPage = async (event) => {
    //     await this.setState({
    //         navAtual: parseInt(event.target.value)
    //     })
    //     // console.log(this.state.navAtual)
    // }

    // calcularNavPage() {
    //     this.setState({
    //         // navLength: Math.ceil((this.state.listaConsultas.length / 6))
    //         navLength: 5
    //     })
    //     // console.log(this.state.navLength)
    // }

    async listarConsultasPaciente() {
        await axios('http://localhost:5000/api/Consultas/pac/' + parseJwt().email, {
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

        // this.calcularNavPage()

    }

    componentDidMount() {
        this.listarConsultasPaciente();
    }

    render() {

        let navPage = []

        for (let i = 0; i < this.state.navLength; i++) {
            navPage.push(i + 1)
        }

        return (
            <div>
                <header className="container">
                    <img src={logo} alt="Logo SPMedicalGroup" />
                    <nav>
                        <a name="/" onClick={this.redirecionarPara}>Home</a>
                        {
                            usuarioAutenticado() ?
                                parseJwt().role === 'ADM' ?
                                    <a name="/consultas" onClick={this.redirecionarPara} >Consultas</a> :

                                    parseJwt().role === 'MED' ?
                                        <a name="/consultas-medico" onClick={this.redirecionarPara} >Consultas</a> :

                                        parseJwt().role === 'PAC' ?
                                            <a name="/consultas-paciente" onClick={this.redirecionarPara} >Consultas</a> :

                                            null : null

                        }

                        {
                            usuarioAutenticado()
                                ? <button id="deslogar" name="/login" onClick={this.efetuarLogout} >Desconectar</button>
                                : <button id="logar" name="/login" onClick={this.redirecionarPara} >Conectar</button>

                        }
                    </nav>
                </header>

                <main className="main-consultas container">
                    <h1>Consultas</h1>
                    <hr />
                    <div className="consultas-section">

                        <section className="listar">
                            {
                                this.state.listaConsultas.map(x => {
                                    return (
                                        <article>
                                            <div className="nomes-consulta">
                                                <img src={calendario} alt="" />
                                                <div className="nomes-div">
                                                    <p>Dr. Ainda Sem Nome</p>
                                                    <span>Paciente Atrasado(No Sistema)</span>
                                                </div>
                                            </div>

                                            <div className="hora-consulta">
                                                <p>{x.dataConsulta.split('T')[1].substring(0, 5)}</p>
                                                <span>{x.dataConsulta.split('T')[0]}</span>
                                            </div>
                                        </article>
                                    )
                                })
                            }


                           

                            {/* {
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

                            } */}

                        </section>

                    </div>

                </main>
            </div>
        )
    }
}