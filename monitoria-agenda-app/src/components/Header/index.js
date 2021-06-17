import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Logo from '../../assets/images/monitoriaAgenda.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassStart } from '@fortawesome/free-solid-svg-icons';

const Header = ({ apelido, saldoDeMonitoria, role}) => (
    <nav>
        <table className="nav-table">
            <tbody>
                <tr>
                    <td rowSpan="2" width="100"><img className="nav-logo" src={Logo} alt="Logo Monitoria Agenda" /></td>
                    <td rowSpan="2"><h1 className="title">Monitoria Agenda</h1></td>
                    {role === "Monitor" ? <td rowSpan="2"><Link to="/agendamentos">Meus Agendamentos</Link></td>:<></>}
                    <td className="nav-user"><a href="about.asp">{apelido}</a></td>
                </tr>
                <tr>
                    <td className="nav-user"><Link to="/account"><FontAwesomeIcon icon={faHourglassStart} className="icon" />{saldoDeMonitoria}</Link></td>
                </tr>
            </tbody>

        </table>

    </nav>
)
export default connect(state => ({
    apelido: state.login.user.apelido,
    saldoDeMonitoria: state.login.user.saldoDeMonitoria,
    role: state.login.user.role,
}))(Header);
