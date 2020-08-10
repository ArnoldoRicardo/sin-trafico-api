/** @format */

import React, { Component } from 'react';
import { render } from 'react-dom';

import Mapa from './Mapa';

class App extends Component {
    render() {
        return <Mapa />;
    }
}

export default App;

const container = document.getElementById('app');
render(<App />, container);
