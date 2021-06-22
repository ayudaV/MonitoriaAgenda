import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import DetalhesAgendamento from '../DetalhesAgendamento';
import { Link, Redirect } from 'react-router-dom';

const Horarios = ({ user }) => {

    const [dadosHorarios, setHorarios] = useState([]);
    const [idMonitor, setIdMonitor] = useState(1);



    useEffect(() => {
        const apiUrlMonitor = 'http://localhost:5000/monitor/email/' + user.email;
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
        const apiUrlHorario = 'http://localhost:5000/horario/monitor/' + idMonitor;

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
    if (user.role === "Anonymous") {
        return (<Redirect to="/" />)
    }
    return (
        <div className="container">
            <div className="listagem">
                <Link to="/horarios"><FontAwesomeIcon icon={faArrowAltCircleLeft} className="icon" />Voltar</Link>
                <h1 className="tituloListagem">Meus Agendamentos</h1>
                <table className="listaAgendamentos">
                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabDiaDaSemana">Dia da Semana</th>
                            <th className="tabNomeAluno">Aluno</th>
                            <th className="tabTituloHoraIni">Horario Inicio</th>
                            <th className="tabTituloHoraFim">Horario Final</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dadosHorarios.map((Horario) =>
                            <DetalhesAgendamento key={Horario.idHorario} horario={Horario} />
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default connect(state => ({ user: state.login.user }))(Horarios);