import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassStart, faHourglassEnd, faTimesCircle, faDollarSign, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import * as HorarioActions from '../../store/actions/horario'
import * as DateTime from '../../DateTimeController'
import * as DescontarActions from '../../store/actions/descontar'

const Agendamento = ({ email, senha, saldoDeMonitoria, horario, dispatch }) => {

    const [dadosAgendamentos, setAgendamentos] = useState([]);
    const [horaInicio, setHoraInicio] = useState(horario.horaInicio);
    const [horaFim, setHoraFim] = useState();
    const [preco, setPreco] = useState(0);
    const [idHorario] = useState(horario.idHorario);
    const [agendado, setAgendado] = useState(false);
    const [descontado, setDescontado] = useState(false);

    const [erro, setErro] = useState('');

    useEffect(() => {
        const apiUrlAgendamento = 'http://localhost:5000/agendamento/horario/' + horario.idHorario;
        console.log("link:" + apiUrlAgendamento)

        fetch(apiUrlAgendamento)
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
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    function handleClick(e) {
        e.preventDefault();
        console.log('Agendamento Fechado.');
        dispatch(HorarioActions.setHorario({ idHorario: 0 }))
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const agenForm = { email, horaInicio, horaFim, preco, idHorario };

        console.log(horaFim)
        if (preco > saldoDeMonitoria)
            setErro("Você não possui saldo suficiente para realizar o agendamento");

        await fetch(`http://localhost:5000/agendamento`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(agenForm)
        })
            .then(
                resp => {
                    console.log(JSON.stringify(agenForm))
                    if (resp.ok) {
                        setAgendado(true);
                        saldoDeMonitoria -= preco;
                        const descontarSaldo = { email, senha, saldoDeMonitoria }

                        fetch(`http://localhost:5000/aluno/descontarSaldo/` + email, {
                            method: "PUT",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(descontarSaldo)
                        })
                            .then(
                                resp => {
                                    console.log(JSON.stringify(descontarSaldo))
                                    if (resp.ok) {
                                        setDescontado(true);
                                        dispatch(DescontarActions.setSaldo(saldoDeMonitoria))
                                    }
                                    else {
                                        console.log('Problema em descontar o preço ou servidor off-line.');
                                        setErro(" Problema em descontar o preço ou servidor off-line.");
                                    }
                                })
                            .catch(function (error) {
                                console.log('There has been a problem with your fetch operation: ' + error.message);
                            })
                    }
                    else {
                        console.log('E-mail não cadastrado ou servidor off-line.');
                        setErro(" E-mail não cadastrado ou servidor off-line.");
                    }
                })
            .catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            })
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
                                <div className="conteiner-Agendamentos">
                                    <div style={{ height: DateTime.getHeight(horario.horaInicio, horario.horaFim) * 4 + 'px' }} >
                                        {dadosAgendamentos.map((Agendamento) =>
                                            <div key={Agendamento.agendamento.idAgendamento}
                                                className="agendamento"
                                                style={{
                                                    top: (DateTime.getTop(Agendamento.agendamento.horaInicio)
                                                        - DateTime.getTop(horario.horaInicio)) * 4 + 'px',
                                                    height: DateTime.getHeight(Agendamento.agendamento.horaInicio, Agendamento.agendamento.horaFim) * 4 + 'px',
                                                    width: '198px'
                                                }}
                                                id={"ID:" + Agendamento.agendamento.idAgendamento}>
                                            </div>
                                        )}
                                    </div>
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
                                            max={DateTime.getMaxMinutos(horaInicio, horario.horaFim) >= 60 ? 60 : DateTime.getMaxMinutos(horaInicio, horario.horaFim)}
                                            step={5}
                                            onChange={({ target }) => {
                                                console.log(DateTime.getInMinutes(horaInicio + ', ' + target.value))
                                                setHoraFim(DateTime.dateTimeFormat(DateTime.getInMinutes(horaInicio) + Number(target.value)))
                                                setPreco(target.value * 4)
                                            }}
                                            disabled={agendado} />
                                        <FontAwesomeIcon icon={faDollarSign} className="icon" />
                                        <input className="horario-input preco" readOnly value={preco} disabled={agendado} />
                                    </div>
                                    <input className="botao" type="submit" value="Confirmar" />
                                    <br />
                                    {
                                        agendado ?
                                            <div>
                                                <h4 className="msgSucesso">Agendamento realizado com Sucesso!</h4>
                                                {descontado ?
                                                    <p>O valor foi descontado de sua conta</p> :
                                                    <p>Ocorreu um erro na hora de descontar o saldo. {erro}</p>
                                                }
                                            </div>
                                            :
                                            erro ?
                                                <div className="erro">
                                                    <h5 className="msgErro">
                                                        <FontAwesomeIcon icon={faExclamationTriangle} className="iconErro" />
                                                        {erro}
                                                    </h5>
                                                </div> :
                                                <></>
                                    }
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
    senha: state.login.user.senha,
    saldoDeMonitoria: state.login.user.saldoDeMonitoria,
    horario: state.horario.horario,
}))(Agendamento);
