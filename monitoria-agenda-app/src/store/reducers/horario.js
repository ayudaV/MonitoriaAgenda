const INITIAL_STATE = {
    horario: {
        idHorario:0,
        diaDaSemana:0,
        horaInicio:"0",
        horaFim:"0",
        idMonitor:0,
    },
}
export default function setHorario(state = INITIAL_STATE, action) {
    console.log(action)
    if(action.type === 'SET_HORARIO') {
        return {
            ...state,
            horario:action.horario,
        };
    }
    return state;

}