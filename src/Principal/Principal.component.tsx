import React from 'react';
import './Principal.css';
import '../App.css';

export default () => 
  <div className="principal ">
    <h2 className="principal__titulo">Bienvenido</h2>
    <div className="principal__avatar"></div>
    <h1 className="principal__nombre">Max</h1>
    <h3 className="principal__subtitulo">¿Qué te gustaría practicar hoy?</h3>
    <ul className="principal__juegos">
      <li className="principal__juego ">
        <h4>Sumas y Restas</h4>
        <img className="principal__juego-imagen" src="" alt=""/>
        <p>Tu mejor puntuación</p>
        <p>0</p>
        </li>
      <li className="principal__juego ">
        <h4>Juego 2</h4>
      <img className="principal__juego-imagen" src="" alt=""/>
        <p>Tu mejor puntuación</p>
        <p>0</p>
      </li>
      <li className="principal__juego ">
        <h4>Juego 3</h4>
      <img className="principal__juego-imagen" src="" alt=""/>
        <p>Tu mejor puntuación</p>
        <p>0</p>
      </li>
    </ul>
    <p className="principal__opcion">Mejores Puntuaciones</p>
    <p className="principal__opcion">Salir</p>
  </div>;