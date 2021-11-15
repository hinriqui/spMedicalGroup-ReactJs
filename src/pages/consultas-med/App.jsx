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
            navAtual: 0,
            navLength: 0,

            descricao: '',
            consultaDescricao: {
                idMedico: 0,
                idPaciente: 0,
                situacao: '',
                valor: 0,
                dataConsulta: '',
            }
        }
    }

    redirecionarPara = (path) => {
        this.props.history.push(path.target.name)
    }

    efetuarLogout = () => {
        localStorage.removeItem('usuario-login')
        this.props.history.push('/login')
    }

    // Desenvolvimento...
    mudarNavPage = async (event) => {
        await this.setState({
            navAtual: parseInt(event.target.value)
        })
        // console.log(this.state.navAtual)
    }

    // Desenvolvimento...
    calcularNavPage() {
        this.setState({
            // navLength: Math.ceil((this.state.listaConsultas.length / 6))
            navLength: 5
        })
        // console.log(this.state.navLength)
    }

    async listarConsultasMedico() {
        await axios('http://localhost:5000/api/Consultas/med/' + parseJwt().email, {
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

    // Erro!
    obterConsulta(event) {
        axios(`http://localhost:5000/api/Medicos/${event.target.value}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then(resposta => {
                console.log('consulta')
                console.log(resposta)
                if (resposta.status == 200) {
                    this.setState({
                        consultaDescricao: {
                            idConsulta: resposta.data.idConsulta,
                            idMedico: resposta.data.idMedico,
                            idPaciente: resposta.data.idPaciente,
                            situacao: resposta.data.situacao,
                            valor: resposta.data.valor,
                            dataConsulta: resposta.data.dataConsulta,
                        }
                    })
                };
            })

            .catch(erro => console.log(erro))
    }

    editarDescricao(event) {
        event.preventDefault()

        let consulta = {
            idMedico: this.state.consultaDescricao.idMedico,
            idPaciente: this.state.consultaDescricao.idPaciente,
            situacao: this.state.consultaDescricao.situacao,
            valor: this.state.consultaDescricao.valor,
            dataConsulta: new Date(this.state.consultaDescricao.dataConsulta),
            descricao: this.state.consultaDescricao.descricao
        };

        // console.log('consulta')
        // console.log(consulta)

        // axios
        //     .post('http://localhost:5000/api/Consultas', consulta, {
        //         headers: {
        //             Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
        //         },
        //     })
        //     .then((resposta) => {
        //         if (resposta.status === 201) {
        //             console.log('Consulta cadastrada!');
        //         }
        //     })
        //     .catch((erro) => {
        //         console.log(erro);
        //     })
    }

    componentDidMount() {
        this.listarConsultasMedico();
    }

    render() {

        let navPage = []

        for (let i = 0; i < this.state.navLength; i++) {
            navPage.push(i + 1)
        }

        return (
            <div>
                <header class="container">
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

                                            <button value={x.idConsulta} onClick={this.obterConsulta}>Editar descrição</button>

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

                        <section className="cadastrar">
                            <h2>Editar descrição</h2>
                            <hr />
                            {
                                this.state.consultaDescricao.idConsulta == null ?
                                    <article>Consulta não selecionada</article>
                                    :
                                    <article>
                                        <div className="nomes-consulta">
                                            <img src={calendario} alt="" />
                                            <div className="nomes-div">
                                                <p>Dr. {this.obterMedico(this.state.consultaDescricao.idMedico)}</p>
                                                <span>Pedro Paulo Pereira Pontes</span>
                                            </div>
                                        </div>

                                        <button>Editar descrição</button>
                                        <div className="hora-consulta">
                                            <p>{this.state.consultaDescricao.dataConsulta.split('T')[1]}</p>
                                            <span>{this.state.consultaDescricao.dataConsulta.split('T')[0]}</span>
                                        </div>
                                    </article>
                            }

                            <hr />
                            <form onSubmit={this.cadastrarConsulta}>
                                <textarea name="" id="" cols="30" rows="10"></textarea>

                                <button className="submit-cadastrar" type="submit">Cadastrar</button>
                            </form>
                        </section>

                    </div>

                </main>
            </div>
        )
    }
}