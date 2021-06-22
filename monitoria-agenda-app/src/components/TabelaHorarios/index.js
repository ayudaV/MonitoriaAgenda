import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';

import Header from '../Header';
import Horarios from '../Horarios'
import Agendamento from '../Agendamento';

const TabelaHorarios = ({ horario, user, dispatch }) => {

    const [dadosMonitores, setMonitores] = useState([]);
    const [idMonitor, setIdMonitor] = useState(1);
    const [horarios, setHorarios] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const apiUrlMonitor = 'http://localhost:5000/monitor/nome';

            await fetch(apiUrlMonitor)
                .then(res => res.json())
                .then(
                    (result) => {
                        setMonitores(result);
                        console.log("Função didMount monitor:")
                        console.log(result);
                    },
                    (error) => {
                        console.log({ error });
                    }
                )
        }
        fetchData()
    }, [])

    const atualizaCampo = (e) => {
        setIdMonitor(e.target.value);
        setHorarios({})
    }
    const atualizaHorario = () => {
        console.log('Atualizando Horarios')
        setHorarios(
            {
                hr1: <Horarios diaSemana={1} idMonitor={Number(idMonitor)} />,
                hr2: <Horarios diaSemana={2} idMonitor={Number(idMonitor)} />,
                hr3: <Horarios diaSemana={3} idMonitor={Number(idMonitor)} />,
                hr4: <Horarios diaSemana={4} idMonitor={Number(idMonitor)} />,
                hr5: <Horarios diaSemana={5} idMonitor={Number(idMonitor)} />,
                hr6: <Horarios diaSemana={6} idMonitor={Number(idMonitor)} />,
                hr7: <Horarios diaSemana={7} idMonitor={Number(idMonitor)} />,
            })
    }
    const renderTable = () => {
        return (
            <div className="container-tabelaHorarios">
                < h1 className="title-horarios" > Horarios</h1 >
                <table className="monitor-select">
                    <tbody>
                        <tr>
                            <td>
                                <select required onChange={e => atualizaCampo(e)}>
                                    {dadosMonitores.map(
                                        (monitorAluno) =>
                                            <option key={monitorAluno.monitor.idMonitor}
                                                value={monitorAluno.monitor.idMonitor}>
                                                {monitorAluno.aluno.apelido}</option>
                                    )}
                                </select>
                            </td>
                            <td>
                                <button onClick={e => atualizaHorario(e)}>Carregar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="container-horariosAll">
                    <table>
                        <tbody>
                            <tr>
                                <td>{horarios.hr1}</td>
                                <td>{horarios.hr2}</td>
                                <td>{horarios.hr3}</td>
                                <td>{horarios.hr4}</td>
                                <td>{horarios.hr5}</td>
                                <td>{horarios.hr6}</td>
                                <td>{horarios.hr7}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div >
        )
    }
    if (user.role === "Anonymous") {
        return (<Redirect to="/" />)
    }
    return (
        horario.idHorario !== 0 ? <>
            <Agendamento />
            <Header />
        </> : <>
            <Header />
            {renderTable()}
        </>

    )
}
export default connect(state => ({ horario: state.horario.horario, user: state.login.user }))(TabelaHorarios);