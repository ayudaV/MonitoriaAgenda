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
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function handleClick(e, Horario) {
        e.preventDefault();
        console.log('Horario Clicado.');
        dispatch(HorarioActions.setHorario(Horario))
    }
    return (
        <div className="colunaHorarios" >
            {dadosHorarios.map((Horario) =>
                <button key={Horario.idHorario}
                    className="btnHorario"
                    onClick={(e) => handleClick(e, Horario)}
                    style={{
                        top: DateTime.getTop(Horario.horaInicio),
                        height: DateTime.getHeight(Horario.horaInicio, Horario.horaFim, true)
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
                        top: DateTime.getTop(Agendamento.agendamento.horaInicio),
                        height:  DateTime.getHeight(Agendamento.agendamento.horaInicio,Agendamento.agendamento.horaFim)
                    }}
                    id={"ID:" + Agendamento.agendamento.idAgendamento}>
                </button>
            )}
        </div>
    )
}
export default connect(state => ({ horario: state.horario.horario }))(Horarios);