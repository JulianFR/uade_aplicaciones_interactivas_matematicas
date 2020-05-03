import React from 'react';
import SumaRestaComponent from './SumaResta/SumaResta.component';
import AccesoComponent from './Acceso/Acceso.component';
import PrincipalComponent from './Principal/Principal.component';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PuntuacionesComponent from './Puntajes/Puntajes.component';

export default () =>
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={AccesoComponent}></Route>
      <Route path="/principal" exact component={PrincipalComponent}></Route>
      <Route path="/juegos/sumas-y-restas" exact component={SumaRestaComponent}></Route>
      <Route path="/puntajes" exact component={PuntuacionesComponent}></Route>
      <Route path="" component={() => <div>404</div>}></Route>
    </Switch>
  </BrowserRouter>