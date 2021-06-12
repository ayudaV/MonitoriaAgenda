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
            horarios: { 
                hr1: <Horarios diaSemana={1} idMonitor={1} />,
                hr2: <Horarios diaSemana={2} idMonitor={1} />,
                hr3: <Horarios diaSemana={3} idMonitor={1} />,
                hr4: <Horarios diaSemana={4} idMonitor={1} />,
                hr5: <Horarios diaSemana={5} idMonitor={1} />,
                hr6: <Horarios diaSemana={6} idMonitor={1} />,
                hr7: <Horarios diaSemana={7} idMonitor={1} /> 
            }
        }

        this.state = {
            ...stateInicial
        };

    }
    
    atualizaCampo(event) {
        //clonar usuário a partir do state, para não alterar o state diretamente
        const monitor = { ...this.state.monitor };
        console.log(monitor)
        //usar o atributo NAME do input identificar o campo a ser atualizado
        monitor.idMonitor = event.target.value;
        //atualizar o state
        this.setState({ monitor: monitor });
        this.setState({horarios: {
            hr1: <Horarios diaSemana={1} idMonitor={Number(monitor.idMonitor)}/>,
            hr2: <Horarios diaSemana={2} idMonitor={Number(monitor.idMonitor)}/>,
            hr3: <Horarios diaSemana={3} idMonitor={Number(monitor.idMonitor)}/>,
            hr4: <Horarios diaSemana={4} idMonitor={Number(monitor.idMonitor)}/>,
            hr5: <Horarios diaSemana={5} idMonitor={Number(monitor.idMonitor)}/>,
            hr6: <Horarios diaSemana={6} idMonitor={Number(monitor.idMonitor)}/>,
            hr7: <Horarios diaSemana={7} idMonitor={Number(monitor.idMonitor)}/>
        }  })
        this.forceUpdate()
        console.log(this.state)
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
                {this.state.horarios.hr1}
                {this.state.horarios.hr2}
                {this.state.horarios.hr3}
                {this.state.horarios.hr4}
                {this.state.horarios.hr5}
                {this.state.horarios.hr6}
                {this.state.horarios.hr7}
                {//this.renderHorarios(this.state.monitor.idMonitor)
                }
            </div>
        </div>)

    }
/*
    renderHorarios(idMonitor) {
        var rows = [];
        for (var dia = 1; dia < 8; dia++) {
            rows.push(<Horarios diaSemana={dia} idMonitor={idMonitor} />);
        }
        return (rows)
    }*/
    render() {
        return (
            <>
                <Header />
                {this.renderTable()}
            </>
        )
    }
}
