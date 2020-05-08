import React from 'react';
import './Principal.css';
import '../App.css';
import { UsuarioService } from '../Usuario/Usuario.service';
import { Link } from 'react-router-dom';

export default () =>
  <div className="principal">
    <div className="principal__avatar" style={{backgroundImage: `url("/${UsuarioService.obtenerAvatar()}.png")`}}></div>
    <h1 className="principal__nombre">{UsuarioService.obtenerNombre()}</h1>
    <h3 className="principal__subtitulo">¿Qué te gustaría practicar hoy?</h3>
    <ul className="principal__juegos">
      <li>
        <Link className="principal__juego" to="/juegos/sumas-y-restas">
          <h4>Sumas y Restas</h4>
          <img className="principal__juego-imagen" src="" alt="Sumas y Restas" />
          <p>Tu mejor puntuación</p>
          <p>0</p>
        </Link>
      </li>
      <li className="principal__juego">
        <h4>Juego 2</h4>
        <img className="principal__juego-imagen" src="" alt="" />
        <p>Tu mejor puntuación</p>
        <p>0</p>
      </li>
      <li className="principal__juego">
        <h4>Juego 3</h4>
        <img className="principal__juego-imagen" src="" alt="" />
        <p>Tu mejor puntuación</p>
        <p>0</p>
      </li>
    </ul>
    <Link className="principal__opcion" to="/puntajes">Mejores Puntuaciones</Link>
    <Link className="principal__opcion" to="/" onClick={UsuarioService.limpiarUsuario}>Salir</Link>
  </div>;