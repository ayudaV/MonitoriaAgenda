export const getMinutos = str => str.substring(14, 16)

export const getHora = str => str.substring(11, 13)

export const getHoraMinutos = str => str.substring(11, 16)

export const getValorInicio = str => ((Number(str.substring(11, 13) * 100) + Number(str.substring(14, 16)) * 1.666666) / 4)

export const getValorFinal = str => ((Number(str.substring(11, 13) * 100) + Number(str.substring(14, 16)) * 1.666666) / 4)

export const getMaxMinutos = (timeIni, timeFim) => (
    console.log('HoraFim: ' + getHora(timeFim) + ', MinutosFim: ' + getMinutos(timeFim) + ', HoraIni: ' + getHora(timeIni) + ', MinIni: ' + getMinutos(timeIni)),
    Number(getHora(timeFim) * 60) + Number(getMinutos(timeFim))) - Number(getHora(timeIni) * 60 + Number(getMinutos(timeIni))
    )

export const dateTimeFormat = (minutes) => {
    console.log('minutos: ' + minutes)
    var horas = (minutes / 60).toFixed(0);
    if(horas < 10) horas = horas.padStart(2,'0');
    var minutos = (minutes % 60).toFixed(0);
    if(minutos < 10) minutos = minutos.padStart(2,'0');

    return ('1900-01-01T' + horas + ':' + minutos + ':00')
}
export const getInMinutes = str => (
    Number(getHora(str) * 60) + Number(getMinutos(str)))