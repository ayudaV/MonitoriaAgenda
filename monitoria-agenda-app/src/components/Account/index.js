import React from 'react';
import {connect} from 'react-redux';

const Account = ({apelido}) => (
    <div>
        <strong>Email: {apelido}</strong>
    </div>
)
export default connect(state => ({
    apelido: state.user.apelido,
}))(Account);
