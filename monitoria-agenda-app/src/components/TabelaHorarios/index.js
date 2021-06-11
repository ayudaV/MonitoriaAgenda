import React, { Component } from 'react';
import Horarios from '../Horarios'

const TabelaHorarios = () => (
    <div className="container-tabelaHorarios">
        <h1 className="title-horarios">Horarios</h1>
        <div className="container-horariosAll">
            <Horarios diaSemana={1} idMonitor={1} />
            <Horarios diaSemana={2} idMonitor={1} />
            <Horarios diaSemana={3} idMonitor={1} />
            <Horarios diaSemana={4} idMonitor={1} />
            <Horarios diaSemana={5} idMonitor={1} />
            <Horarios diaSemana={6} idMonitor={1} />
            <Horarios diaSemana={7} idMonitor={1} />

            {//Ele troca o valor de diaSemana antes de chamar didMount
            }
        </div>
    </div>

)
export default TabelaHorarios;
