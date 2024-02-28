import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./creatoritems.scss";

function CreatorItems() {
  const [creatorArticles, setCreatorArticles] = useState([]);
  // const { userId } = useParams();
  const workshopId = localStorage.getItem("workshopId");
  console.log("workshopId", workshopId)
  console.log("creatorArticles", creatorArticles)
  useEffect(() => {
    const fetchCreatorArticles = async () => {
      try {
        // Appel API pour récupérer les articles du créateur
        const articlesResponse = await axios.get(`${import.meta.env.VITE_API_URL}/articles/createurs/${workshopId}`);
        console.log("articlesResponse", articlesResponse)
        setCreatorArticles(articlesResponse.data);
      } catch (error) {
        console.error("Error fetching creator articles:", error);
      }
    };

    fetchCreatorArticles();
  }, [workshopId]);

  return (
    <div className="ui three column doubling stackable grid container">
      {/* Bouton "Créer un article" */}
      <div className="column">
        <div className="item-preview__container">
          <div className="item-preview-info">
            <Link to={`/ajout-article`}>
              <button className="ui inverted green button"><i class="plus icon"></i>Créer un article</button>
            </Link>
          </div>
        </div>
      </div>
  
      {/* Liste des articles existants */}
      {creatorArticles.map((item) => (
        <div key={item.item_id} className="column">
          <div className="item-preview__container">
            <img
              src={item.item_picture}
              alt={item.item_name}
              className="item-image"
            />
            <div className="item-preview-info">
              <h3>{item.item_name}</h3>
              <p>{item.item_description}</p>
              <p>Prix : {item.item_price} €</p>
              <div className="buttons">
                <Link to={`/articles/${item.item_id}`}>
                  <button className="ui inverted violet button"><i className="eye icon"></i></button>
                </Link>
                <Link to={`#`}>
                  <button className="ui inverted violet button"><i className="pencil alternate icon"></i></button>
                </Link>
                <Link to={`#`}>
                  <button className="ui inverted red button"><i className="trash icon"></i></button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  
}

export default CreatorItems;
