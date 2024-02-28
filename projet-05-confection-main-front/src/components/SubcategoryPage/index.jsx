import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { Button } from "semantic-ui-react";
import Banner from "../Banner";
import LoadMoreButton from "../LoadMoreBtn/index.jsx";
import "../../styles/styles.scss";

function SubcategoryPage() {
  const [items, setItems] = useState([]);
  const [randomItems, setRandomItems] = useState([]);
  const [noOfItems, setNoOfItems] = useState(6);
  const [subcategoryName, setSubcategoryName] = useState(""); // Nouvel état pour stocker le nom de la sous-catégorie
  const location = useLocation();
  const { categoryName } = location.state ? location.state : { categoryName: undefined };
  console.log(categoryName);
  const { subcategoryId } = useParams();

  const loadMore = () => {
    setNoOfItems(prevNoOfItems => prevNoOfItems + 6);
  }; // Chargement de 6 articles supplémentaires à chaque clic de bouton
  const slice = items.slice(0, noOfItems);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les détails de la sous-catégorie
        const subcategoriesResponse = await axios.get(`${import.meta.env.VITE_API_URL}/sous-categories`);
        const subcategory = subcategoriesResponse.data.find((subcat) => subcat.id === parseInt(subcategoryId));
        
        // Vérifier si la sous-catégorie existe avant de mettre à jour le nom
        if (subcategory) {
          setSubcategoryName(subcategory.name);
          
          // Liste des articles de la sous-catégorie
          const itemsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/categories/${categoryName}/sous-categories/${subcategory.name}/articles`);
          setItems(itemsResponse.data);

          // Liste de 6 articles aléatoires de la catégorie parente
          const randomItemsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/articles/${categoryName}/aleatoires`);
          setRandomItems(randomItemsResponse.data);

        } else {
          console.error(`Subcategory with ID ${subcategoryId} not found.`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (categoryName) {
      fetchData();
    }
  }, [subcategoryId, categoryName]);

  return (
    <div>
      <h1>{subcategoryName.toUpperCase()}</h1>
      
      <section className="ui three column doubling stackable grid container">
        {slice.map((item) => (
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
                <Link to={`/articles/${item.item_id}`}>
                  <Button primary>Voir</Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
        {items.length > noOfItems && (
          <LoadMoreButton onClick={loadMore} buttonText="Voir plus de produits" />
        )}
      </section>

      <Banner />

      <section>
        <h2>Découvrez d'autres articles de la catégorie {categoryName.toUpperCase()}</h2>
        <div className="ui three column doubling stackable grid container">
          {randomItems.map((item) => (
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
                  <Link to={`/articles/${item.item_id}`}>
                    <Button primary>Voir</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default SubcategoryPage;