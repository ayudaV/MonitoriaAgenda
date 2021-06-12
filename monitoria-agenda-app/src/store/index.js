import { createStore } from 'redux';

const INITIAL_STATE = {
    token: localStorage.userJWT, 
    user: {
        email:  "anonymous@g.unicamp.br",
        apelido:  "Any",
        saldoDeMonitoria: 500,
        role:  "Aluno",
        senha:  "unicamp",
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