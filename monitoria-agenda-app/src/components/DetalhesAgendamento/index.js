import React, { useEffect, useState } from 'react';
import * as DateTime from '../../DateTimeController'

const DetalhesAgendamento = (props) => {

    const [dadosAgendamentos, setAgendamentos] = useState([]);
    const idHorario = props.horario.idHorario;
    const diaDaSemana = props.horario.diaDaSemana;

    useEffect(() => {
        const apiUrlAgendamento = 'http://localhost:5000/agendamento/monitor/' + idHorario;
        console.log("link:" + apiUrlAgendamento)

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

    return (
        <>
            {dadosAgendamentos.map((data) =>
                <tr key={data.idHorario}>
                    <td>{DateTime.getDiaSemana(diaDaSemana)}</td>
                    <td>{data.aluno.apelido}</td>
                    <td>{DateTime.getHoraMinutos(data.agendamento.horaInicio)}</td>
                    <td>{DateTime.getHoraMinutos(data.agendamento.horaFim)}</td>
                </tr>
            )}
        </>

    )
}
export default DetalhesAgendamento;