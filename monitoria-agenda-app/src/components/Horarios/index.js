import React, { useState } from 'react';

import { connect } from 'react-redux'
import * as HorarioActions from '../../store/actions/horario'

const Horario = ({ props, horario, dispatch }) => {

    const diaSemana = 2//props.diaSemana;
    const idMonitor = 1//props.idMonitor;

    const apiUrlHorario = 'http://localhost:5000/horario/dayMonitor/' + diaSemana + '/' + idMonitor;
    const apiUrlAgendamento = 'http://localhost:5000/agendamento/dayMonitor/' + diaSemana + '/' + idMonitor;
    console.log("link:" + apiUrlHorario)

    var dadosHorarios = [{ "idHorario": 1, "diaDaSemana": 2, "horaInicio": "1900-01-01T07:30:00", "horaFim": "1900-01-01T09:10:00", "idMonitor": 1 }, { "idHorario": 2, "diaDaSemana": 2, "horaInicio": "1900-01-01T13:00:00", "horaFim": "1900-01-01T13:50:00", "idMonitor": 1 }, { "idHorario": 3, "diaDaSemana": 2, "horaInicio": "1900-01-01T18:15:00", "horaFim": "1900-01-01T19:00:00", "idMonitor": 1 }]
    var dadosAgendamento = [{ "idAgendamento": 2, "email": "20122@g.unicamp.br", "idMonitor": 1, "diaDaSemana": 2, "horaInicio": "1900-01-01T07:30:00", "horaFim": "1900-01-01T07:45:00", "preco": 60 }]
    
    const getDadosHorarios = async () => {
        await fetch(apiUrlHorario)
            .then(res => res.json())
            .then(
                (result) => {
                    dadosHorarios = result
                    console.log("Dados horarios")
                    console.log(JSON.stringify(result))
                },
                (error) => {
                    console.log({ error });
                }
            )
    }
    const getDadosAgendamento = async () => {
        await fetch(apiUrlAgendamento)
            .then(res => res.json())
            .then((result) => {
                dadosAgendamento = result
            },
                (error) => {
                    console.log({ error });
                }
            )
    }
    const getValorInicio = str => ((Number(str.substring(11, 13) * 100) + Number(str.substring(14, 16)) * 1.666666) / 4)

    const getValorFinal = str => ((Number(str.substring(11, 13) * 100) + Number(str.substring(14, 16)) * 1.666666) / 4)

    const onClick = horario => {
        console.log("Clicked!");
        dispatch(HorarioActions.setHorario(horario))
    }

    return (
        <div className="colunaHorarios" >
            {dadosHorarios.map((Horario) =>
                <button key={Horario.idHorario}
                    className="btnHorario"
                    //onClick={onClick(Horario)}
                    style={{ top: Number(getValorInicio(Horario.horaInicio)) + 'px' }}
                    id={"ID:" + Horario.idHorario}>
                    {Horario.horaInicio.substring(11, 16)} - {Horario.horaFim.substring(11, 16)}
                </button>
            )}
            {dadosAgendamento.map((Agendamento) =>
                <button key={Agendamento.idAgendamento}
                    disabled
                    className="agendamento"
                    style={{
                        top: Number(getValorInicio(Agendamento.horaInicio)) + 'px',
                        height: Number(getValorFinal(Agendamento.horaFim) - getValorInicio(Agendamento.horaInicio)) + 'px'
                    }}
                    id={"ID:" + Agendamento.idAgendamento}>
                </button>
            )}
        </div>
    )
}
export default connect(state => ({ horario: state.horario.horario }))(Horario);