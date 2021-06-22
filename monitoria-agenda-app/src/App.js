import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Rotas from './Rotas';
import './App.scss';
import { Provider } from 'react-redux';
import store from './store'
import LocalStorageCheck from './components/middleware/localStorageCheck';

function App() {
    return (
        <Provider store={store}>
            <LocalStorageCheck>
                <BrowserRouter>
                    <Rotas />
                </BrowserRouter>
            </LocalStorageCheck>
        </Provider>
    );
}
export default App;