import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Banner from "../Banner";
import "../../styles/styles.scss";
import { useSelector } from 'react-redux';

function HomePage() {

  const [categories, setCategories] = useState([]);
  const [creators, setCreators] = useState([]);
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const decodedToken = useSelector(state => state.user.decodedToken);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/categories`
          );
          setCategories(categoriesResponse.data);
        
        // Récupérer les 6 derniers créateurs inscrits
        const workshopResponse = await axios.get(`${import.meta.env.VITE_API_URL}/createurs/derniers-inscrits`);
        setCreators(workshopResponse.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      
      fetchData();
  });


 return (
    <div>
      <h1>Bienvenue sur la page d'accueil</h1>
        {isLoggedIn && decodedToken ? (
          <p>
            Bonjour, <br /> {decodedToken.firstname}
          </p>
        ) : null}
      
      <section className="ui three column doubling stackable grid container">
        {categories.map((category) => (
          <div key={category.id} className="column">
            <Link to={`/categories/${category.id}`} className="category-link">
              <div className="category-container">
                <img
                  src={`/images/${category.name}.png`}
                  alt={`Catégorie ${category.name}`}
                  className="category-image"
                />
                <div className="category-label">{category.name}</div>
              </div>
            </Link>
          </div>
        ))}
      </section>

      <Banner />

      <h2>Découvrez de nouveaux créateurs...</h2>
      {/* Liste des 6 derniers créateurs inscrits */}
      <section className="ui three column doubling stackable grid container" style={{ marginBottom: "1.5rem" }}>
        {creators.map((creator) => (
          <div key={creator.workshop_id} className="column">
            <Link to={`/createurs/${creator.workshop_id}`} className="creator-link">
              <div className="creator-container">
                <img
                  src={`${creator.workshop_picture}`}
                  alt={`Créateur ${creator.workshop_name}`}
                  className="workshop-image"
                />
                <div className="creator-label">{creator.workshop_name}</div>
              </div>
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export default HomePage;