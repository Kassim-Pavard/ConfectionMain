import React from "react";
import "../../styles/styles.scss";
import CreatorsList from "../CreatorsList"
import "./creatorspage.scss";

function CreatorsPage() {

  return (
    <div>
      <h1>Bienvenue sur la page des créateurs</h1>
      <div className = "container"><CreatorsList /></div>
    </div>
  );
}

export default CreatorsPage;