import React, { useEffect, useState } from 'react';

import { connect, useDispatch } from 'react-redux'
import * as HorarioActions from '../../store/actions/horario'
import * as DateTime from '../../DateTimeController'

const Horarios = (props) => {
    const dispatch = useDispatch();

    const [dadosHorarios, setHorarios] = useState([]);
    const [dadosAgendamentos, setAgendamentos] = useState([]);

    const diaSemana = props.diaSemana;
    const idMonitor = props.idMonitor;



    useEffect(() => {
        const apiUrlHorario = 'http://localhost:5000/horario/dayMonitor/' + diaSemana + '/' + idMonitor;
        const apiUrlAgendamento = 'http://localhost:5000/agendamento/dayMonitor/' + diaSemana + '/' + idMonitor;
        console.log("link:" + apiUrlHorario)

        fetch(apiUrlHorario)
            .then(res => res.json())
            .then(
                (result) => {
                    setHorarios(result)
                },
                (error) => {
                    console.log({ error });
                }
            )
        fetch(apiUrlAgendamento)
            .then(res => res.json())
            .then((result) => {
                setAgendamentos(result);
            },
                (error) => {
                    console.log({ error });
                }
            )
    }, [])

    function handleClick(e, Horario) {
        e.preventDefault();
        console.log('Horario Clicado.');
        dispatch(HorarioActions.setHorario(Horario))
    }

    const getHeight = (horario) => {
        var ret = Number(DateTime.getValorFinal(horario.horaFim) - DateTime.getValorInicio(horario.horaInicio))
        if(ret <= 20) ret = 20;
        return ret + 'px'
    }
    return (
        <div className="colunaHorarios" >
            {dadosHorarios.map((Horario) =>
                <button key={Horario.idHorario}
                    className="btnHorario"
                    onClick={(e) => handleClick(e, Horario)}
                    style={{
                        top: Number(DateTime.getValorInicio(Horario.horaInicio)) + 'px',
                        height: getHeight(Horario)
                    }}
                    id={"ID:" + Horario.idHorario}>
                    {DateTime.getHoraMinutos(Horario.horaInicio)} - {DateTime.getHoraMinutos(Horario.horaFim)}
                </button>
            )}
            {dadosAgendamentos.map((Agendamento) =>
                <button key={Agendamento.agendamento.idAgendamento}
                    disabled
                    className="agendamento"
                    style={{
                        top: Number(DateTime.getValorInicio(Agendamento.agendamento.horaInicio)) + 'px',
                        height: Number(DateTime.getValorFinal(Agendamento.agendamento.horaFim) - DateTime.getValorInicio(Agendamento.agendamento.horaInicio)) + 'px'
                    }}
                    id={"ID:" + Agendamento.agendamento.idAgendamento}>
                </button>
            )}
        </div>
    )
}
export default connect(state => ({ horario: state.horario.horario }))(Horarios);