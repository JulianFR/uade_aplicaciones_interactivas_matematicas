import React, { Fragment } from 'react';
import './Acceso.css';
import { withRouter } from 'react-router';
import { SesionService } from '../Sesion/Sesion.service';
import ModalComponent from '../UI/Modal/Modal.component';
import { Link } from 'react-router-dom';

class AccesoComponent extends React.Component<any> {
  readonly avatares = ["avi", "raptor", "ovo"];
  readonly nombre = React.createRef<HTMLInputElement>();
  readonly state = {
    avatar: 0,
    estado: ""
  };

  constructor(props: any) {
    super(props);

    this.comenzar = this.comenzar.bind(this);
    this.cambiarAvatar = this.cambiarAvatar.bind(this);
  }

  async componentDidMount() {
    try {
      this.setState({ estado: "Recuperando tu sesión..." });

      if (await SesionService.descargarSesion()) { this.props.history.push("/principal"); }
    }
    catch (error) {
      alert("¡Ups! Algo salió mal...");
    } finally {
      this.setState({ estado: "" });
    }
  }

  async comenzar() {
    try {
      this.setState({ estado: "Creando tu sesión..." });

      await SesionService.crearSesion(this.nombre.current?.value || "Max", this.avatares[this.state.avatar]);

      this.props.history.push("/principal");
    }
    catch (error) {
      alert("¡Ups! Algo salió mal...");
    } finally {
      this.setState({ estado: "" });
    }
  }

  cambiarAvatar() {
    this.setState({
      avatar: this.state.avatar >= this.avatares.length - 1 ? 0 : this.state.avatar + 1
    });
  }

  render() {
    return (
      <div className="acceso"> {this.state.estado
        ? <ModalComponent>
          <p className="juego__texto">{this.state.estado || "Cargando..."}</p>
        </ModalComponent>
        : <Fragment>
          <div className="acceso__formulario">
            <h1 className="acceso__formulario-titulo">¡Bienvenido!</h1>
            <p className="acceso__formulario-mensaje">Hacé clic en la imagen para elegir tu avatar</p>
            <div className="acceso__formulario-avatar" style={{ backgroundImage: `url("/${this.avatares[this.state.avatar]}.png")` }} onClick={this.cambiarAvatar}></div>
            <input ref={this.nombre} type="text" placeholder="Ingresá tu Nombre" className="acceso__formulario-nombre" />
            <button className="acceso__formulario-boton" onClick={this.comenzar}>Comenzar</button>
          </div>
          <Link className="acceso__mejores-puntuaciones boton--verde" to="/puntajes">Mejores Puntuaciones</Link>
        </Fragment>}
      </div>
    );
  }
}

export default withRouter(AccesoComponent);
