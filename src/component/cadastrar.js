import { React, Component } from 'react';
import axios from 'axios';

export default class CadastrarConsultas extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listaMedicos: [],
            listaPacientes: [],

            isLoading: false,

            idMedico: 1,
            idPaciente: 1,
            situacao: 'Agendada',
            valor: 50,
            dataConsulta: new Date(),
        }
    };

    listarMedicos() {
        axios('http://localhost:5000/api/Medicos', {
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
    };

    listarPacientes() {
        axios('http://localhost:5000/api/Pacientes', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then(resposta => {
                if (resposta.status == 200) {
                    this.setState({ listaPacientes: resposta.data })
                };
                console.log(this.state.listaPacientes)
            })

            .catch(erro => console.log(erro))
    };

    atualizaStateCampo = (campo) => {
        this.setState({ [campo.target.name]: campo.target.value });
        console.log(this.state)
    };

    // Erro!
    cadastrarConsultateste = (event) => {
        event.preventDefault();
        console.log(this)

        this.setState({ isLoading: false })


        let consulta = {
            idMedico: parseInt(this.state.idMedico),
            idPaciente: parseInt(this.state.idPaciente),
            situacao: this.state.situacao,
            valor: this.state.valor,
            dataConsulta: new Date(this.state.dataConsulta),
        };

        axios
            .post('http://localhost:5000/api/Consultas', consulta, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
                },
            })
            .then((resposta) => {
                if (resposta.status === 201) {
                    console.log('Consulta cadastrada!');
                }
            })
            .catch((erro) => {
                console.log(erro);
            })
    };

    componentDidMount() {
        this.listarMedicos()
        this.listarPacientes()
    };

    render() {
        return (
            <section className="cadastrar">
                <h2>Cadastro</h2>
                <hr />
                <form onSubmit={this.cadastrarConsultateste}>

                    <select name="idMedico" defaultValue={this.state.idMedico} onChange={this.atualizaStateCampo} >
                        <option value="0" disabled>Médico</option>
                        {
                            this.state.listaMedicos.map(m => {
                                return (
                                    <option key={m.idMedico} value={m.idMedico}>{m.nome}</option>
                                )
                            })
                        }

                    </select>

                    <select name="idPaciente" defaultValue={this.state.idPaciente} onChange={this.atualizaStateCampo} >
                        <option value="0" disabled>Paciente</option>
                        {
                            this.state.listaPacientes.map(p => {
                                return (
                                    <option key={p.idPaciente} value={p.idPaciente}>{p.nome}</option>
                                )
                            })
                        }
                    </select>

                    <select name="situacao" defaultValue={this.state.situacao} onChange={this.atualizaStateCampo} >
                        <option value="Agendada" disabled>Situação</option>
                        <option value="Agendada">Agendada</option>
                        <option value="Realizada">Realizada</option>
                        <option value="Cancelada">Cancelada</option>
                    </select>

                    <input name="valor" value={this.state.valor} type="number" min="0.00" max="10000.00" step="0.01" placeholder="Valor" onChange={this.atualizaStateCampo} />

                    <input name="dataConsulta" value={this.state.dataConsulta} type="date" placeholder="Data" onChange={this.atualizaStateCampo} />


                    {
                        this.state.isLoading === true &&
                        <button className="submit-cadastrar" type="submit" disabled>Loading...</button>
                    }

                    {
                        this.state.isLoading === false &&
                        <button className="submit-cadastrar" type="submit">Cadastrar</button>
                    }

                </form>
            </section>
        );
    }
}
