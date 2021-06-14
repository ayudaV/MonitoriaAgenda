import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassStart } from '@fortawesome/free-solid-svg-icons';

const Header = ({ apelido, saldoDeMonitoria}) => (
    <div className="agen_background">


    </div>
)
export default connect(state => ({
    apelido: state.login.user.apelido,
    saldoDeMonitoria: state.login.user.saldoDeMonitoria,
}))(Header);
