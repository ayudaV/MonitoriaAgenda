export const getMinutos = str => str.substring(14, 16)

export const getHora = str => str.substring(11, 13)

export const getHoraMinutos = str => str.substring(11, 16)

export const getValorInicio = str => ((Number(str.substring(11, 13) * 100) + Number(str.substring(14, 16)) * 1.666666) / 4)

export const getValorFinal = str => ((Number(str.substring(11, 13) * 100) + Number(str.substring(14, 16)) * 1.666666) / 4)
