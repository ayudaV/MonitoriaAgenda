import React, { Component } from 'react';
import Header from '../Header';
import Horarios from '../Horarios'

const apiUrlMonitor = 'http://localhost:5000/monitor';

export default class TabelaHorarios extends Component {

    constructor(props) {
        super(props)

        const stateInicial = {
            monitor: { idMonitor: 0, email: '', nomeMonitor: '' },
            dadosMonitores: [],
            horarios: {
                hr1: <Horarios diaSemana={1} idMonitor={0} />,
                hr2: <Horarios diaSemana={2} idMonitor={0} />,
                hr3: <Horarios diaSemana={3} idMonitor={0} />,
                hr4: <Horarios diaSemana={4} idMonitor={0} />,
                hr5: <Horarios diaSemana={5} idMonitor={0} />,
                hr6: <Horarios diaSemana={6} idMonitor={0} />,
                hr7: <Horarios diaSemana={7} idMonitor={0} />
            }
        }

        this.state = {
            ...stateInicial
        };
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    }
    forceUpdateHandler() {
        this.forceUpdate()
    }
    atualizaCampo(event) {
        //clonar usuário a partir do state, para não alterar o state diretamente
        const monitor = { ...this.state.monitor };
        console.log(monitor)
        //usar o atributo NAME do input identificar o campo a ser atualizado
        monitor.idMonitor = event.target.value;
        //atualizar o state
        this.setState({ monitor: monitor });
        this.setState({
            horarios:
                {}
        })

        console.log(this.state)
    }
    atualizaHorario(event) {
        const monitor = { ...this.state.monitor };
        console.log(monitor)
        this.setState({
            horarios:
            {
                hr1: <Horarios diaSemana={1} idMonitor={Number(monitor.idMonitor)} />,
                hr2: <Horarios diaSemana={2} idMonitor={Number(monitor.idMonitor)} />,
                hr3: <Horarios diaSemana={3} idMonitor={Number(monitor.idMonitor)} />,
                hr4: <Horarios diaSemana={4} idMonitor={Number(monitor.idMonitor)} />,
                hr5: <Horarios diaSemana={5} idMonitor={Number(monitor.idMonitor)} />,
                hr6: <Horarios diaSemana={6} idMonitor={Number(monitor.idMonitor)} />,
                hr7: <Horarios diaSemana={7} idMonitor={Number(monitor.idMonitor)} />,
            }
        })
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
                <button onClick={e => this.atualizaHorario(e)}>Carrregar</button>
            </div>
            <div className="container-horariosAll">
                <>
                    {this.state.horarios.hr1}
                    {this.state.horarios.hr2}
                    {this.state.horarios.hr3}
                    {this.state.horarios.hr4}
                    {this.state.horarios.hr5}
                    {this.state.horarios.hr6}
                    {this.state.horarios.hr7}</>
            </div>
        </div>)

    }

    render() {
        return (
            <>
                <Header/>
                {this.renderTable()}
            </>
        )
    }
}
