import React, { Component } from 'react';
import Header from '../Header';
import Horarios from '../Horarios'

const apiUrlMonitor = 'http://localhost:5000/monitor';

export default class TabelaHorarios extends Component {

    constructor(props) {
        super(props)

        const stateInicial = {
            monitor: { idMonitor: 1, email: '', nomeMonitor: '' },
            dadosMonitores: [],
            horarios: {}
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
                    console.log("Função didMount monitor:")
                    console.log(result);
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
            <table className="monitor-select">
                <tbody>
                    <tr>
                        <td>
                            <select required onChange={e => this.atualizaCampo(e)}>
                                {this.state.dadosMonitores.map(
                                    (monitor) =>
                                        <option key={monitor.idMonitor} value={monitor.idMonitor}>{monitor.nomeMonitor}</option>
                                )}
                            </select>
                        </td>
                        <td>
                            <button onClick={e => this.atualizaHorario(e)}>Carrregar</button>

                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="container-horariosAll">
                <table>
                    <tbody>
                        <tr>
                            <td>{this.state.horarios.hr1}</td>
                            <td>{this.state.horarios.hr2}</td>
                            <td>{this.state.horarios.hr3}</td>
                            <td>{this.state.horarios.hr4}</td>
                            <td>{this.state.horarios.hr5}</td>
                            <td>{this.state.horarios.hr6}</td>
                            <td>{this.state.horarios.hr7}</td>
                        </tr>
                    </tbody>
                </table>
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
