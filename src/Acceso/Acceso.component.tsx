import React from 'react';
import './Acceso.css';
import { Link } from 'react-router-dom';
import { UsuarioService } from '../Usuario/Usuario.service';

export default class AccesoComponent extends React.Component {
  readonly avatares = ["avi", "raptor"];
  readonly nombre = React.createRef<HTMLInputElement>();
  readonly state = {
    avatar: 0
  };
  
  constructor(props: any) {
    super(props);

    this.comenzar = this.comenzar.bind(this);
    this.cambiarAvatar = this.cambiarAvatar.bind(this);
  }

  comenzar() {
    UsuarioService.crearUsuario(this.nombre.current?.value || "Max", this.avatares[this.state.avatar]);
  }

  cambiarAvatar() {
    this.setState({
      avatar: this.state.avatar >= this.avatares.length - 1 ? 0 : this.state.avatar + 1
    });
  }

  render() {
    return (
      <div className="acceso">
        <div className="acceso__formulario">
          <h1 className="acceso__formulario-titulo">¡Bienvenido!</h1>
          <p className="acceso__formulario-mensaje">Hacé clic en la imagen para elegir tu avatar</p>
          <div className="acceso__formulario-avatar" style={{ backgroundImage: `url("/${this.avatares[this.state.avatar]}.png")` }} onClick={this.cambiarAvatar}></div>
          <input ref={this.nombre} type="text" placeholder="Ingresá tu Nombre" className="acceso__formulario-nombre" />
          <Link className="acceso__formulario-boton" to="/principal" onClick={this.comenzar}>Comenzar</Link>
        </div>
      </div>
    );
  }
}
