import React from 'react';
import Encabezado from './presentacion/Encabezado/Encabezado';
import Juego from './presentacion/Juego/Juego';
import Pie from './presentacion/Pie/Pie';

function App() {
  return (
    <div className="App">
      <Encabezado></Encabezado>
      <Juego></Juego>
      <Pie></Pie>
    </div>
  );
}

export default App;
