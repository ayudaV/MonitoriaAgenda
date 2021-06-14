import React, { useEffect, useState } from 'react';

import { connect, useDispatch } from 'react-redux'
import * as HorarioActions from '../../store/actions/horario'
import * as DateTime from '../../DateTimeController'

const Horario = (props) => {
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

    //const getValorInicio = str => ((Number(str.substring(11, 13) * 100) + Number(str.substring(14, 16)) * 1.666666) / 4)

    //const getValorFinal = str => ((Number(str.substring(11, 13) * 100) + Number(str.substring(14, 16)) * 1.666666) / 4)


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
                    style={{ top: Number(DateTime.getValorInicio(Horario.horaInicio)) + 'px' }}
                    id={"ID:" + Horario.idHorario}>
                    {DateTime.getHoraMinutos(Horario.horaInicio)} - {DateTime.getHoraMinutos(Horario.horaFim)}
                </button>
            )}
            {dadosAgendamentos.map((Agendamento) =>
                <button key={Agendamento.idAgendamento}
                    disabled
                    className="agendamento"
                    style={{
                        top: Number(DateTime.getValorInicio(Agendamento.horaInicio)) + 'px',
                        height: Number(DateTime.getValorFinal(Agendamento.horaFim) - DateTime.getValorInicio(Agendamento.horaInicio)) + 'px'
                    }}
                    id={"ID:" + Agendamento.idAgendamento}>
                </button>
            )}
        </div>
    )
}
export default connect(state => ({ horario: state.horario.horario }))(Horario);