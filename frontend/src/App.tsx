import React from 'react';
import SumaRestaComponent from './Juegos/SumaResta/SumaResta.component';
import AccesoComponent from './Acceso/Acceso.component';
import PrincipalComponent from './Principal/Principal.component';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PuntuacionesComponent from './Puntajes/Puntajes.component';
import AsociacionComponent from './Asociacion/Asociacion.component';
import { SesionService } from './Sesion/Sesion.service';

export default () => {
  if (window.location.pathname !== "/") { window.location.href = "/"; }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={AccesoComponent}></Route>
        <Route path="/principal" exact render={ () => <PrincipalComponent avatar={SesionService.obtenerAvatar()} jugador={SesionService.obtenerJugador()}></PrincipalComponent>}></Route>
        <Route path="/juegos/sumas-y-restas" exact component={SumaRestaComponent}></Route>
        <Route path="/juegos/asociacion" exact component={AsociacionComponent}></Route>
        <Route path="/puntajes" exact component={PuntuacionesComponent}></Route>
        <Route path="" component={() => <div>404</div>}></Route>
      </Switch>
    </BrowserRouter>)
}

//numeros más grandes