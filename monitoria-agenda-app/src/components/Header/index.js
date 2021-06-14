import React from 'react';
import { connect } from 'react-redux';
import Logo from '../../assets/images/monitoriaAgenda.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassStart } from '@fortawesome/free-solid-svg-icons';

const Header = ({ apelido, saldoDeMonitoria }) => (
    <nav>
        <table className="nav-table">
            <tbody>
                <tr>
                    <td rowSpan="2"><img className="nav-logo" src={Logo} alt="Logo Monitoria Agenda" /></td>
                    <td className="nav-user"><a href="about.asp">{apelido}</a></td>
                </tr>
                <tr>
                    <td className="nav-user"><a href="about.asp"><FontAwesomeIcon icon={faHourglassStart} className="icon" />{saldoDeMonitoria}</a></td>
                </tr>
            </tbody>

        </table>

    </nav>
)
export default connect(state => ({
    apelido: state.login.user.apelido,
    saldoDeMonitoria: state.login.user.saldoDeMonitoria,
}))(Header);
