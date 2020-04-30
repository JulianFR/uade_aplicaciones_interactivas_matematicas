import React from 'react';
import './Pie.css';

export default () => (
  <div className="pie">
    <p className="pie__tiempo-numero">TIEMPO RESTANTE: 120</p>
    <div className="pie__tiempo-barra pie__tiempo-barra--fondo">
      <span className="pie__tiempo-barra pie__tiempo-barra--restante"></span>
    </div>
    <p className="pie__intentos">INTENTOS: 3</p>
  </div>
);