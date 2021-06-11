import React, { Component } from 'react';
import '../../App.scss';

class Horario extends Component {

    constructor(props) {
        super(props)

        const diaSemana = this.props.diaSemana;
        const idMonitor = this.props.idMonitor;

        const apiUrlHorario = 'http://localhost:5000/horario/dayMonitor/' + diaSemana + '/' + idMonitor;
        console.log("link:" + apiUrlHorario)

        const stateInicial = {
            apiUrlHorario,
            horario: { idHorario: 0, diaDaSemana: 0, horaInicio: 0, horaFim: 0, idMonitor: 0 },
            dadosHorarios: []
        }
        this.state = {
            ...stateInicial
        };
    }

    async componentDidMount() {
        console.log("link:" + this.state.apiUrlHorario)
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
                })
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
                        <rect
                            fill="#ffffff"
                            x="0"
                            y={this.getValorInicio(Horario.horaInicio)}
                            height={this.getValorFinal(Horario.horaFim) - this.getValorInicio(Horario.horaInicio)}
                            width="100px"
                            id={"ID:" + Horario.idHorario}
                            stroke="#000" />
                        <text x="0" y={this.getValorFinal(Horario.horaFim) - 5} width="100">
                            {Horario.horaInicio.substring(11, 16)}
                        </text>
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