import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "semantic-ui-react";
import LoadMoreButton from "../LoadMoreBtn/index.jsx";
import "../../styles/styles.scss";

function ItemsList() {
  const [items, setItems] = useState([]);
  const [noOfItems, setNoOfItems] = useState(9);

  const loadMore = () => {
    setNoOfItems(prevNoOfItems => prevNoOfItems + 12);
  }; // Chargement de 12 articles supplémentaires à chaque clic de bouton
  const slice = items.slice(0, noOfItems);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/articles`);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Liste de tous les articles */}
      <div className="ui three column doubling stackable grid container">
        {slice.map((item) => (
          <div key={item.id} className="column">
          <div className="item-preview__container">
            <img
              src={item.picture}
              alt={item.name}
              className="item-image"
            />
            <div className="item-preview-info">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Prix : {item.price} €</p>
              <Link to={`/articles/${item.id}`}>
                <Button primary>Voir</Button>
              </Link>
            </div>
          </div>
        </div>
        ))}
        {items.length > noOfItems && (
          <LoadMoreButton onClick={loadMore} buttonText="Voir plus de produits" />
        )}
      </div>
    </div>
  );
}

export default ItemsList;
