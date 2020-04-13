import React from 'react';
import './App.css';
import Encabezado from './presentacion/Encabezado/Encabezado';
import Juego from './presentacion/Juego/Juego';

function App() {
  return (
    <div className="App">
      <Encabezado></Encabezado>
      <Juego></Juego>
    </div>
  );
}

export default App;
