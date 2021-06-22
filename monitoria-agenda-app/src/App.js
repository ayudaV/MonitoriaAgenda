import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Rotas from './Rotas';
import './App.scss';
import LocalStorageCheck from './components/middleware/localStorageCheck';

function App() {
    return (
        <LocalStorageCheck>
            <BrowserRouter>
                <Rotas />
            </BrowserRouter>
        </LocalStorageCheck>
    );
}
export default App;