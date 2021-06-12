import React, { Component } from 'react';
import Header from '../Header';
import Horarios from '../Horarios'

const apiUrlMonitor = 'http://localhost:5000/monitor';

export default class TabelaHorarios extends Component {

    constructor(props) {
        super(props)

        const stateInicial = {
            monitor: { idMonitor: 1, email: '', nomeMonitor: '' },
            dadosMonitores: []
        }

        this.state = {
            ...stateInicial
        };

    }
    atualizaCampo(event) {
        //clonar usuário a partir do state, para não alterar o state diretamente
        const monitor = { ...this.state.monitor };
        console.log(monitor + event.target.value)
        //usar o atributo NAME do input identificar o campo a ser atualizado
        monitor.idMonitor = event.target.value;
        //atualizar o state
        this.setState({ monitor });
    }

    componentDidMount() {
        fetch(apiUrlMonitor)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        dadosMonitores: result
                    });
                    console.log("Função didMount:" + result);
                },
                (error) => {
                    this.setState({ error });
                }
            );
            /*
            const email = "";

            const apiUrlAluno = 'http://localhost:5000/aluno/' + email;
            console.log("link:" + apiUrlAluno)*/
    }

    renderTable() {
        return (<div className="container-tabelaHorarios">
            <h1 className="title-horarios">Horarios</h1>
            <div className="monitor-select">
                <select required onChange={e => this.atualizaCampo(e)}>
                    {this.state.dadosMonitores.map(
                        (monitor) =>
                            <option key={monitor.idMonitor} value={monitor.idMonitor}>{monitor.nomeMonitor}</option>
                    )}
                </select>
            </div>
            <div className="container-horariosAll">
                <p>{this.state.monitor.idMonitor}</p>
                <Horarios diaSemana={1} idMonitor={this.state.monitor.idMonitor}/>
                <Horarios diaSemana={2} idMonitor={this.state.monitor.idMonitor}/>
                <Horarios diaSemana={3} idMonitor={this.state.monitor.idMonitor}/>
                <Horarios diaSemana={4} idMonitor={this.state.monitor.idMonitor}/>
                <Horarios diaSemana={5} idMonitor={this.state.monitor.idMonitor}/>
                <Horarios diaSemana={6} idMonitor={this.state.monitor.idMonitor}/>
                <Horarios diaSemana={7} idMonitor={this.state.monitor.idMonitor}/>
            </div>
        </div>)

    }

    render() {
        return (
            <>
                <Header />
                {this.renderTable()}
            </>
        )
    }
}
