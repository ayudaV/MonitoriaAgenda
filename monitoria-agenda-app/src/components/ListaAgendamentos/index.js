import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import * as DateTime from '../../DateTimeController'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassStart, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ListaAgendamentos = ({ email }) => {
    const [dadosAgendamento, setAgendamentos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const apiUrlAgendamento = 'http://localhost:5000/agendamento/aluno/' + email;
            console.log(apiUrlAgendamento)
            await fetch(apiUrlAgendamento)
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result)
                        setAgendamentos(result)
                    }
                )
        }
        fetchData()
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="container">
            <div className="listagem">
                <Link to="/horarios"><FontAwesomeIcon icon={faArrowAltCircleLeft} className="icon" />Voltar</Link>
                <h1 className="tituloListagem">Meus Agendamentos</h1>
                <table className="listaAgendamentos">
                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabTituloDia">Dia da Semana</th>
                            <th className="tabTituloHoraIni">Horario Inicio</th>
                            <th className="tabTituloHoraFim">Horario Final</th>
                            <th className="tabTituloPreco">Preço</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dadosAgendamento.map((data) =>
                            <tr className="cabecTabela" key={data.agendamento.idAgendamento}>
                                <td>{DateTime.getDiaSemana(data.horario.diaDaSemana)}</td>
                                <td>{DateTime.getHoraMinutos(data.agendamento.horaInicio)}</td>
                                <td>{DateTime.getHoraMinutos(data.agendamento.horaFim)}</td>
                                <td><FontAwesomeIcon icon={faHourglassStart} className="icon" />{data.agendamento.preco}</td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default connect(state => ({
    email: state.login.user.email,
}))(ListaAgendamentos);
