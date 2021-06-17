import Produce from 'immer'
const INITIAL_STATE = {
    user: {
        email: "anonymous@g.unicamp.br",
        apelido: "Any",
        senha: '',
        saldoDeMonitoria: 500,
        role: "Anonymous",
    }
}
export default function login(state = INITIAL_STATE, action) {
    console.log(action)

    switch (action.type) {
        case 'SET_LOGIN': return {
            ...state,
            user: action.user,
        };
        case 'SET_SALDO':
            return Produce(state, draft => {
                draft.user.saldoDeMonitoria = action.saldo;
            })
        default: break;
    }
    return state;
}