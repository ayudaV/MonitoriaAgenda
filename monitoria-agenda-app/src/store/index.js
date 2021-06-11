import { createStore } from 'redux';

const INITIAL_STATE = {
    token: localStorage.userJWT, 
    user: {
        email:  localStorage.user.email,
        apelido:  localStorage.user.apelido,
        saldoDeMonitoria: localStorage.user.saldoDeMonitoria,
        role:  localStorage.user.role,
        senha:  localStorage.user.senha,
    }
}

function reducer(state = INITIAL_STATE, action) {
    if (action.type === 'LOGIN') {
        console.log(localStorage.user)
        console.log(action.account.data.user)
        return { user: action.account.data.user }
    }

    return state;
}

const store = createStore(reducer);

export default store;