import React, { useState, useEffect } from "react";
import "../../styles/styles.scss";
import ItemsList from "../ItemsList"
//import "./itemspage.scss";

function ItemsPage() {

  return (
    <div>
      <h1>Bienvenue sur la page des articles</h1>
      <div className = "container"><ItemsList /></div>
    </div>
  );
}

export default ItemsPage;
