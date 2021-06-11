import React, { Component } from 'react';
import Horarios from '../Horarios'

const TabelaHorarios = () => (
    <div>
        <h1>Horarios</h1>
        <Horarios diaSemana={2} idMonitor={1}/>
        <Horarios diaSemana={3} idMonitor={1}/>

        {//Ele troca o valor de diaSemana antes de chamar didMount
        }
    </div>
)
export default TabelaHorarios;
