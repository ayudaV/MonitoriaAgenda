const INITIAL_STATE = {
    user : {
        email:  "anonymous@g.unicamp.br",
        apelido:  "Any",
        senha: '',
        saldoDeMonitoria: 500,
        role:  "Aluno",
    }
}
export default function login(state = INITIAL_STATE, action) {
    console.log(action)
    if(action.type === 'SET_LOGIN') {
        return {
            ...state,
            user:action.user,
        };
    }
    return state;
}