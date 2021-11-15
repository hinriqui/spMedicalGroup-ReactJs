import { React, Component } from 'react';
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
            .catch(erro => console.log(erro))

            .then(resposta => {
                if (resposta.status == 200) {

                    // console.log('\nMédico:')
                    // console.log(resposta)
                    // console.log(resposta.data)
                    // console.log(resposta.data.nome)

                    return resposta.data
                };
            })
    }

    componentDidMount() {
        this.listarConsultas();
    }

    render() {

        console.log('teste')
        console.log(this.obterMedico(1))

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
                                        <p>Dr. 
                                            {/* {this.obterMedico(x.idMedico)} */}
                                        </p>
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

class CadastrarConsultas extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listaMedicos: [],
            listaPacientes: [],

            idMedico: 0,
            idPaciente: 0,
            situacao: '',
            valor: 0,
            dataConsulta: new Date(),
        }
    }

    async listarMedicos() {
        await axios('http://localhost:5000/api/Medicos', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then(resposta => {
                if (resposta.status == 200) {
                    this.setState({ listaMedicos: resposta.data })
                };
                //console.log(this.state.listaMedicos)
            })

            .catch(erro => console.log(erro))
    }

    async listarPacientes() {
        await axios('http://localhost:5000/api/Pacientes', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then(resposta => {
                if (resposta.status == 200) {
                    this.setState({ listaPacientes: resposta.data })
                };
                // console.log(this.state.listaPacientes)
            })

            .catch(erro => console.log(erro))
    }

    atualizaStateCampo = async (campo) => {
        await this.setState({ [campo.target.name]: campo.target.value });
        // console.log(this.state)
    };

    // Erro!
    cadastrarConsulta(event) {
        event.preventDefault()

        let consulta = {
            idMedico: this.state.idMedico,
            idPaciente: this.state.idPaciente,
            situacao: this.state.situacao,
            valor: this.state.valor,
            dataConsulta: new Date(this.state.dataConsulta),
        };

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
        this.listarMedicos()
        this.listarPacientes()
    }

    render() {
        return (
            <section className="cadastrar">
                <h2>Cadastro</h2>
                <hr />
                <form onSubmit={this.cadastrarConsulta}>

                    <select name="idMedico" onChange={this.atualizaStateCampo} >
                        <option value="0" selected disabled>Médico</option>
                        {
                            this.state.listaMedicos.map(m => {
                                return (
                                    <option value={m.idMedico}>{m.nome}</option>
                                )
                            })
                        }

                    </select>

                    <select name="idPaciente" onChange={this.atualizaStateCampo} >
                        <option value="0" selected disabled>Paciente</option>
                        {
                            this.state.listaPacientes.map(p => {
                                return (
                                    <option value={p.idPaciente}>{p.nome}</option>
                                )
                            })
                        }
                    </select>

                    <select name="situacao" onChange={this.atualizaStateCampo} >
                        <option value="Agendada" selected disabled>Situação</option>
                        <option value="Agendada">Agendada</option>
                        <option value="Realizada">Realizada</option>
                        <option value="Cancelada">Cancelada</option>
                    </select>

                    <input name="valor" type="number" min="0.00" max="10000.00" step="0.01" placeholder="Valor" onChange={this.atualizaStateCampo} />

                    <input name="dataConsulta" type="date" placeholder="Data" onChange={this.atualizaStateCampo} />

                    <button className="submit-cadastrar" type="submit">Cadastrar</button>
                </form>
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
                        <a name="/" onClick={this.redirecionarPara}>Home</a>
                        {
                            //console.log(parseJwt()),
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
                        <ListarConsultas />
                        <CadastrarConsultas />
                    </div>

                </main>
            </div>
        )
    }
}