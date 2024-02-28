import React from "react";
import WorkshopForm from "../Form/WorkshopForm";
import "./WorkshopFormPage.scss"

function LoginPage() {
  return (
    <div>
    <h2>Devenir créateur :</h2>
    <div className="container">
      <WorkshopForm />
    </div>
    </div>
  );
}

export default LoginPage;
