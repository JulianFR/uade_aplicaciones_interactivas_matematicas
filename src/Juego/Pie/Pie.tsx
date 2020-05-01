import React from 'react';
import './Pie.css';
import { PieProps } from './Pie.model';

export default (props: PieProps) => (
  <div className="pie">
    <p className="pie__tiempo-numero">TIEMPO RESTANTE: {props.tiempo}</p>
    {/* <div className="pie__tiempo-barra pie__tiempo-barra--fondo">
      <span className="pie__tiempo-barra pie__tiempo-barra--restante"></span>
    </div> */}
    <p className="pie__intentos">INTENTOS: {props.intentos}</p>
  </div>
);