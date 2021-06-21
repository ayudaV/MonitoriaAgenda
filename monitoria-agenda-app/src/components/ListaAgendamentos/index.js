import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import * as DateTime from '../../DateTimeController'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassStart } from '@fortawesome/free-solid-svg-icons';
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
                        setNomesMonitores()
                    },
                    (error) => {
                        console.log({ error });
                    }
                )
        }
        fetchData()
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    function setNomesMonitores() {
        let _dadosAgendamentos = [];
        dadosAgendamento.map((agendamento) => {
            fetch('http://localhost:5000/monitor/' + agendamento.horario.idMonitor)
                .then(res2 => res2.json())
                .then(
                    (result2) => {
                        fetch('http://localhost:5000/monitor/email/' + result2.email)
                            .then(res3 => res3.json())
                            .then(
                                (result3) => {
                                    console.log(agendamento.horario.idMonitor + ', ' + result2.email + ', ' + result3.aluno.apelido);
                                    _dadosAgendamentos.push(result3.aluno.apelido)
                                },
                                (error) => {
                                    console.log({ error });
                                }
                            )
                    },
                    (error) => {
                        console.log({ error });
                    })
            return _dadosAgendamentos
        })
        console.log('_dadosAgendamentos')
        console.log(_dadosAgendamentos)
        //setAgendamentos(_dadosAgendamentos)
    }

    return (
        <div className="listagem">
            <Link to="/horarios">Meus Agendamentos</Link>
            <h1 className="tituloListagem">Listagem de Alunos</h1>
            <table className="listaAgendamentos">
                <thead>
                    <tr className="cabecTabela">
                        <th className="tabTituloMonitor">Monitor</th>
                        <th className="tabTituloHoraIni">Horario Inicio</th>
                        <th className="tabTituloHoraFim">Horario Final</th>
                        <th className="tabTituloPreco">Preço</th>
                    </tr>
                </thead>
                <tbody>
                    {dadosAgendamento.map((agendamento) =>
                        <tr className="cabecTabela" key={agendamento.agendamento.idAgendamento}>
                            <th>{agendamento.agendamento.idHorario}</th>
                            <th>{DateTime.getHoraMinutos(agendamento.agendamento.horaInicio)}</th>
                            <th>{DateTime.getHoraMinutos(agendamento.agendamento.horaFim)}</th>
                            <th><FontAwesomeIcon icon={faHourglassStart} className="icon" />{agendamento.agendamento.preco}</th>
                        </tr>)}
                </tbody>
            </table>
        </div>
    )
}
export default connect(state => ({
    email: state.login.user.email,
}))(ListaAgendamentos);
