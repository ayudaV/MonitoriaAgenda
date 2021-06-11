import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Rotas from './Rotas';
import './App.scss';

function App() {
    return (
        <BrowserRouter>
            <Rotas />
        </BrowserRouter>
    );
}
export default App;