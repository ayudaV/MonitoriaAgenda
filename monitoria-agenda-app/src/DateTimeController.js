export const getMinutos = str => Number(str.substring(14, 16))

export const getHora = str => Number(str.substring(11, 13))

export const getHoraMinutos = str => str.substring(11, 16)

export const getTop = str => ((getHora(str) * 100 + getMinutos(str) * 1.666666) / 4)

export const getHeight = (horaInicio, horaFim, limit) => {
    var ret = getTop(horaFim) - getTop(horaInicio)
    if (limit && ret <= 20) ret = 20;
    return ret
}

export const getMaxMinutos = (timeIni, timeFim) => {
    console.log('HoraFim: ' + getHora(timeFim) + ', MinutosFim: ' + getMinutos(timeFim)
        + ', HoraIni: ' + getHora(timeIni) + ', MinIni: ' + getMinutos(timeIni))
    return (getHora(timeFim) * 60 + getMinutos(timeFim) - getHora(timeIni) * 60 + getMinutos(timeIni))
}


export const dateTimeFormat = (minutes) => {
    console.log('minutos: ' + minutes)
    let horas = minutes / 60
    let minutos = minutes % 60 
    horas = Math.trunc(horas).toString();
    minutos = Math.trunc(minutos).toString();
    console.log('1900-01-01T' + horas + ':' + minutos + ':00')

    if (Number(horas) < 10) horas = horas.padStart(2, '0');
    if (Number(minutos) < 10) minutos = minutos.padStart(2, '0');
    console.log('1900-01-01T' + horas + ':' + minutos + ':00')
    return ('1900-01-01T' + horas + ':' + minutos + ':00')
}
export const getInMinutes = str => (
    Number(getHora(str) * 60) + Number(getMinutos(str)))