import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import TabelaHorarios from './components/TabelaHorarios';
import MeusAgendamentos from './components/MeusAgendamentos';
import Account from './components/Account';
import ListaAgendamentos from './components/ListaAgendamentos';

export default class Rotas extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/cadastro" component={Cadastro} />
                <Route path="/horarios" component={TabelaHorarios} />
                <Route path="/monitor" component={MeusAgendamentos} />
                <Route path="/account" component={Account} />
                <Route path="/agendamentos" component={ListaAgendamentos} />
                <Redirect from='*' to='/' />
            </Switch>
        )
    }
}