import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux'

import * as HorarioActions from '../../store/actions/horario'
import * as DateTime from '../../DateTimeController'

const Horarios = ({ email }) => {
    const dispatch = useDispatch();

    const [dadosHorarios, setHorarios] = useState([]);
    const [dadosAgendamentos, setAgendamentos] = useState([]);
    const [diaSemana, setDiaSemana] = useState(2);
    const [idMonitor, setIdMonitor] = useState(1);



    useEffect(() => {
        const apiUrlMonitor = 'http://localhost:5000/monitor/' + email;
        fetch(apiUrlMonitor)
            .then(res => res.json())
            .then(
                (result) => {
                    setIdMonitor(result.idMonitor)
                },
                (error) => {
                    console.log({ error });
                }
            )
        const apiUrlHorario = 'http://localhost:5000/horario/dayMonitor/' + diaSemana + '/' + idMonitor;

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
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function handleClick(e, Horario) {
        e.preventDefault();
        console.log('Horario Clicado.');
        dispatch(HorarioActions.setHorario(Horario))
    }
    return (
        <div className="conteiner-agendamentosMonitor">
            <select>
                <option>Domingo</option>
                <option>Segunda</option>
                <option>Terça</option>
                <option>Quarta</option>
                <option>Quinta</option>
                <option>Sexta</option>
                <option>Sabado</option>
            </select>
            <div className="colunaHorarios" >
                {dadosHorarios.map((Horario) =>
                    <div key={Horario.idHorario}
                        className="divHorario"
                        id={"ID:" + Horario.idHorario}>
                        {DateTime.getHoraMinutos(Horario.horaInicio)} - {DateTime.getHoraMinutos(Horario.horaFim)}
                        <div>
                            {fetch('http://localhost:5000/agendamento/horario/' + Horario.idHorario)
                                .then(res => res.json())
                                .then(
                                    (result) => {
                                        setAgendamentos(result)
                                    },
                                    (error) => {
                                        console.log({ error });
                                    }
                                )
                            }

                            {/*dadosAgendamentos.map((Agendamento) =>
                                <div>
                                    {Agendamento.aluno.apelido}
                                    {DateTime.getHoraMinutos(Agendamento.agendamento.horaInicio)} - {DateTime.getHoraMinutos(Agendamento.agendamento.horaFim)}

                                </div>
                            )*/}
                        </div>
                    </div>
                )}
            </div>
        </div>

    )
}
export default connect(state => ({ email: state.login.user.email }))(Horarios);