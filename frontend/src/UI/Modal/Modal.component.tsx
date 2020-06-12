import React, { Fragment } from "react";

export default (props: any) => (
  <Fragment>
    <div style={{ position: "fixed", top: "0", left: "0", width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.5)", zIndex: 10 }}></div>
    <div className="principal__juegos" style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", padding: "2rem", zIndex: 11 }}>
      {props.children}
    </div>
  </Fragment>
);