import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "semantic-ui-react";
import axios from "axios";
import "./categorypage.scss";


function CategoryPage() {
  const [items, setItems] = useState([]); 
  const [subcategories, setSubcategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const { categoryId } = useParams();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // get la catégorie hehe
        const categoriesResponse = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
        const category = categoriesResponse.data.find((cat) => cat.id === parseInt(categoryId));

        // Check pr être sûr de sûr o((>ω< ))o
        if (category) {
          setCategoryName(category.name);

          // Get les item aleatoires de la categorie
          const itemsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/articles/${category.name}/aleatoires`);
          setItems(itemsResponse.data);

          // Get les sous categories de la catégorie hahaha ggez (～￣▽￣)～
          const subcategoriesResponse = await axios.get(`${import.meta.env.VITE_API_URL}/categories/${category.name}/sous-categories`);
          setSubcategories(subcategoriesResponse.data);
        } else {
          console.error(`Category with ID ${categoryId} not found.`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [categoryId]);

  return (
    <div>
      <h1>{categoryName.toUpperCase()}</h1>

      {/* subcategories */}
      <div>
        <h2>Sous-catégories :</h2>
        <div className="ui three column doubling stackable grid container">
        {subcategories.map((subcategory) => (
          <div key={subcategory.subcategory_id} className="column">
            <Link to={`/sous-categories/${subcategory.subcategory_id}`} state={{ categoryName: categoryName }}>
              <div className="subcateogry-container">
                <img
                  //src={subcategory.subcategory_image}
                  src="https://cdn.discordapp.com/attachments/1206982808489304135/1206982970515132476/Default_category_man_clothes_22.png?ex=65e737fc&is=65d4c2fc&hm=a7ce3c6a530dd5375eabf4d2af312d9164247c329aa7d2ca50a40d6e54e6f6e1&"
                  alt={subcategory.subcategory_name}
                  className="subcategory-image"
                  style={{ width: "60%", height: "auto", borderRadius: "1.2rem" }}
                />
                <div className="subcategory-label">
                  <h3>{subcategory.subcategory_name}</h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      </div>

      {/* items */}
      <h2>Quelques articles de la catégorie {categoryName.toUpperCase()} :</h2>
  <div className="ui three column doubling stackable grid container">
    {items.map((item) => (
      <div key={item.item_id} className="column">
        <div className="item-preview__container">
          <img
            src={item.item_picture}
            alt={item.item_name}
            className="item-image"
          />
          <div className="item-preview-info">
            <h3>{item.item_name}</h3>
            <p>Prix : {item.item_price} €</p>
            <Link to={`/articles/${item.item_id}`}>
              <Button primary >Voir</Button>
            </Link>
          </div>
        </div>
      </div>
    ))}
  </div>
    </div>
  );
}

export default CategoryPage;
