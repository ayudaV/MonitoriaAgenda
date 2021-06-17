import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import TabelaHorarios from './components/TabelaHorarios';
import { Provider } from 'react-redux';
import store from './store'
import MeusAgendamentos from './components/MeusAgendamentos';
import Account from './components/Account';

export default class Rotas extends Component {
    render() {
        return (
            <Provider store={store}>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/cadastro" component={Cadastro} />
                    <Route path="/horarios" component={TabelaHorarios} />
                    <Route path="/agendamentos" component={MeusAgendamentos} />
                    <Route path="/account" component={Account} />

                    <Redirect from='*' to='/' />
                </Switch>
            </Provider>
        )
    }
}