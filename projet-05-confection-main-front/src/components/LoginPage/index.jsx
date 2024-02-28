import React from "react";
import FormLogin from "../Form/FormLogin";
import FormInscription from "../Form/FormInscription";
import "./loginpage.scss";

function LoginPage() {
  return (
    <div className="container forms">
      <div className="left-form">
        <h2>Se connecter</h2>
        <FormLogin />
      </div>
      <div className="right-form">
        <h2>S'inscrire</h2>
        <FormInscription />
      </div>
    </div>
  );
}

export default LoginPage;
