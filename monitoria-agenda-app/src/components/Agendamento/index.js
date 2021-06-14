import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassStart, faHourglassEnd, faTimesCircle, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import * as HorarioActions from '../../store/actions/horario'
import * as DateTime from '../../DateTimeController'

const Agendamento = ({ email, saldoDeMonitoria, horario, dispatch }) => {

    const [dadosAgendamentos, setAgendamentos] = useState([]);
    const [horaInicio, setHoraInicio] = useState(horario.horaInicio);
    const [horaFim, setHoraFim] = useState(horario.horaFim);
    const [preco, setPreco] = useState(0);
    const [erro, setErro] = useState('');

    useEffect(async () => {
        const apiUrlAgendamento = 'http://localhost:5000/agendamento/horario/' + horario.idHorario;
        console.log("link:" + apiUrlAgendamento)

        await fetch(apiUrlAgendamento)
            .then(res => res.json())
            .then((result) => {
                setAgendamentos(result);
                console.log(result)
                setHoraInicio(result[result.length - 1].agendamento.horaFim)
            },
                (error) => {
                    setErro(error);
                }
            )
            .catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            })

    }, [])

    function handleClick(e) {
        e.preventDefault();
        console.log('Agendamento Fechado.');
        dispatch(HorarioActions.setHorario({ idHorario: 0 }))
    }

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(horaFim)
    }
    return (
        <div className="agen-background">
            <div className="container-agen">
                <div className="close"><FontAwesomeIcon icon={faTimesCircle} className="icon-close" onClick={(e) => handleClick(e)} /></div>
                <h1>Agendamento</h1>
                <table className="tableAgendamento">
                    <tbody>
                        <tr>
                            <td>
                                <div className="colunaAgendamentos" >
                                    {dadosAgendamentos.map((Agendamento) =>
                                        <div key={Agendamento.agendamento.idAgendamento}
                                            className="agendamento"
                                            style={{
                                                top: Number((DateTime.getValorInicio(Agendamento.agendamento.horaInicio) - horaInicio) * 4) + 'px',
                                                height: Number((DateTime.getValorFinal(Agendamento.agendamento.horaFim) - DateTime.getValorInicio(Agendamento.agendamento.horaInicio)) * 4) + 'px',
                                                width: '200px'
                                            }}
                                            id={"ID:" + Agendamento.agendamento.idAgendamento}>
                                        </div>
                                    )}
                                </div>
                            </td>
                            <td className="agendamento-box">
                                <form onSubmit={handleSubmit}>
                                    <div className="textbox">
                                        <FontAwesomeIcon icon={faHourglassStart} className="icon" />
                                        <label>Hora de Inicio: </label>
                                        <input type="text" className="horario-input hora" readOnly value={DateTime.getHora(horaInicio)} />:
                                        <input type="text" className="horario-input minuto" readOnly value={DateTime.getMinutos(horaInicio)} />
                                    </div>
                                    <div className="textbox">
                                        <FontAwesomeIcon icon={faHourglassEnd} className="icon" />
                                        <label>Duração: </label>
                                        <input type="number" className="horario-input duracao"
                                            min={0}
                                            max={DateTime.getMaxMinutos(horaInicio, horario.horaFim) >= 60 ? 60 : DateTime.getMaxMinutos(horaInicio, horaFim)}
                                            step={5}
                                            onChange={({ target }) => {
                                                setHoraFim(DateTime.dateTimeFormat(Number(DateTime.getInMinutes(horaInicio)) + Number(target.value)))
                                                setPreco(target.value * 4)
                                            }} />
                                        <FontAwesomeIcon icon={faDollarSign} className="icon" />
                                        <input className="horario-input preco" readOnly value={preco} />
                                    </div>
                                    <input className="botao" type="submit" value="Confirmar" />{/*
                    <br />
                    {
                        cadastrado ?
                            <div>
                                <FontAwesomeIcon icon={faExclamationTriangle} className="iconErro" />
                                <div className="erro">
                                    <h4 className="msgErro">{erro}</h4>
                                </div>
                            </div> :
                    <h4 className="msgErro">{erro}</h4>}*/}
                                </form>
                            </td>
                        </tr>

                    </tbody>
                </table>

            </div>
        </div>
    )
}
export default connect(state => ({
    email: state.login.user.email,
    saldoDeMonitoria: state.login.user.saldoDeMonitoria,
    horario: state.horario.horario,
}))(Agendamento);
