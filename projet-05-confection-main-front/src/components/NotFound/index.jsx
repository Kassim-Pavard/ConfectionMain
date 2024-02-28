import React from "react";
import { Link } from "react-router-dom";
import "../../styles/styles.scss";
import "./notfound.scss";

function NotFound() {
  return (
    <div>
      <main>
        <h1>Ouaf ! Cette magnifique tenue est à moi </h1>
        <h2><Link to="/"> Retournez plutôt sur la page d'accueil </Link></h2>
        <div>
          <img
            src="https://cdn.discordapp.com/attachments/1210223107038777384/1210223109760618506/dog-8405867_1280.jpg?ex=65e9c71a&is=65d7521a&hm=dbaf2523badb71465c97c5cf93d457d3921413454182a9d92587ff90d9644a2e&"
            alt="chien portant des lunettes de soleil, un béret rouge et une chemise"
          />
        </div>
      </main>
    </div>
  )
}

export default NotFound;