import React, { useState, useEffect } from "react";
import "../../styles/styles.scss";
import ItemDetails from "../ItemDetails"
//import "./itemdetailspage.scss";

function ItemDetailsPage() {

  return (
    <div>
      <h1>Page d'un article</h1>
      <div className = "container"><ItemDetails /></div>
    </div>
  );
}

export default ItemDetailsPage;
