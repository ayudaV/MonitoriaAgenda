import React, { Component } from 'react';

class Horario extends Component {

    constructor(props) {
        super(props)

        const diaSemana = this.props.diaSemana;
        const idMonitor = this.props.idMonitor;

        const apiUrlHorario = 'http://localhost:5000/horario/dayMonitor/' + diaSemana + '/' + idMonitor;
        const apiUrlAgendamento = 'http://localhost:5000/agendamento/dayMonitor/' + diaSemana + '/' + idMonitor;
        console.log("link:" + apiUrlHorario)
        console.log("link:" + apiUrlAgendamento)

        const stateInicial = {
            apiUrlHorario,
            horario: { idHorario: 1, diaDaSemana: 1, horaInicio: 0, horaFim: 0, idMonitor: 1 },
            dadosHorarios: [],

            apiUrlAgendamento,
            agendamento: {idAgendamento: 1, email:'', idMonitor: 1, diaDaSemana: 1, horaInicio: 0, horaFim: 0, preco: 0},
            dadosAgendamento: []
        }
        this.state = {
            ...stateInicial
        };
    }

    async componentDidMount() {
        await fetch(this.state.apiUrlHorario)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        dadosHorarios: result
                    });
                    console.log("Função didMount:" + JSON.stringify(result));
                },
                (error) => {
                    this.setState({ error });
                });
        await fetch(this.state.apiUrlAgendamento)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        dadosAgendamento: result
                    });
                    console.log("Função didMount:" + JSON.stringify(result));
                },
                (error) => {
                    this.setState({ error });
                });
    }

    getValorInicio(a) {
        return ((Number(a.substring(11, 13) * 100) + Number(a.substring(14, 16)) * 1.666666) / 4)
    }

    getValorFinal(b) {
        return ((Number(b.substring(11, 13) * 100) + Number(b.substring(14, 16)) * 1.666666) / 4)
    }
    render() {
        return (
            <svg width="100" height="600">
                {this.state.dadosHorarios.map((Horario) =>
                    <g key={Horario.idHorario}>
                        <rect className="container-horario"
                            x="2"
                            y={this.getValorInicio(Horario.horaInicio)}
                            height={this.getValorFinal(Horario.horaFim) - this.getValorInicio(Horario.horaInicio)}
                            width="96px"
                            id={"ID:" + Horario.idHorario} />
                        <text className="texto-horario" x="4" y={this.getValorFinal(Horario.horaFim) - 5} width="100">
                            {Horario.horaInicio.substring(11, 16)} - {Horario.horaFim.substring(11, 16)}
                        </text>
                    </g>
                )}
                {this.state.dadosAgendamento.map((Agendamento) =>
                    <g key={Agendamento.idAgendamento}>
                        <rect className="container-agendamento"
                            x="1"
                            y={this.getValorInicio(Agendamento.horaInicio)}
                            height={this.getValorFinal(Agendamento.horaFim) - this.getValorInicio(Agendamento.horaInicio)}
                            width="98px"
                            id={"ID:" + Agendamento.idHorario} />
                    </g>
                )}
            </svg>
        )
    }

    carregar(Horario) {
        this.setState({ Horario })
    }
}
export default Horario;