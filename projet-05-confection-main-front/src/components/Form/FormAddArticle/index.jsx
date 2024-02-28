import React, { useState, useEffect } from "react";
import { Form, Input, TextArea, Button, Checkbox, Dropdown, Image, Segment } from "semantic-ui-react";
import { toast } from "react-toastify";
import axios from "axios";

const Formaddarticle = () => {
  const workshopId = parseInt(localStorage.getItem("workshopId"));
  const [articleData, setArticleData] = useState({
    name: "test",
    description: "test",
    picture: "",
    price: 29,
    material: "coton",
    customizable: false,
    workshop_id: workshopId,
    category_id: 1,
    subcategory_id: 2,
    status_id: 1,
  });

  const [categoriesWithSubcategories, setCategoriesWithSubcategories] = useState([]);

  useEffect(() => {
    const fetchDataCategoriesWithSubcategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories/sous-categories`);
        setCategoriesWithSubcategories(response.data);
      } catch (error) {
        console.error("Error fetching categories with subcategories:", error);
      }
    };

    fetchDataCategoriesWithSubcategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticleData({ ...articleData, [name]: value });
  };

  const handleCheckboxChange = () => {
    setArticleData({ ...articleData, customizable: !articleData.customizable });
  };

  const handlePictureChange = (e) => {
    setArticleData({ ...articleData, picture: e.target.files[0] });
  };

  const handleCategoryChange = (e, { value }) => {
    setArticleData({ ...articleData, category_id: value, subcategory_id: 0 });
  };

  const handleSubcategoryChange = (e, { value }) => {
    setArticleData({ ...articleData, subcategory_id: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const cloudinaryData = new FormData();
      cloudinaryData.append("picture", articleData.picture);
      const cloudinaryRes = await axios.post("http://localhost:3000/upload", cloudinaryData);
      const imageUrl = cloudinaryRes.data.secure_url;
      const newArticleData = { ...articleData, picture: imageUrl };

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/articles`, newArticleData);
      toast.success("Article ajouté avec succès !");
      setArticleData({
        name: "test",
        description: "test",
        picture: "",
        price: 19.99,
        material: "test",
        customizable: false,
        workshop_id: workshopId,
        category_id: 2,
        subcategory_id: 2,
        status_id: 2,
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'article :", error);
      toast.error("Erreur lors de l'ajout de l'article");
    }
  };

  const uniqueCategories = [...new Set(categoriesWithSubcategories.map((category) => category.category_id))];

  return (
    <div className="ui grid centered">
      <div className="eight wide column">
        <Segment>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>Nom de l'article</label>
              <Input
                type="text"
                name="name"
                value={articleData.name}
                onChange={handleInputChange}
                placeholder="Entrez le nom de l'article"
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <TextArea
                name="description"
                value={articleData.description}
                onChange={handleInputChange}
                placeholder="Entrez la description de l'article"
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Image</label>
              <Input
                type="file"
                name="item Picture"
                onChange={handlePictureChange}
                accept="image/*"
                required
              />
              {articleData.picture && (
                <div className="image-preview">
                  <Image src={URL.createObjectURL(articleData.picture)} size="small" />
                </div>
              )}
            </Form.Field>
            <Form.Field>
              <label>Prix</label>
              <Input
                type="number"
                name="price"
                value={articleData.price}
                onChange={handleInputChange}
                placeholder="Entrez le prix de l'article"
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Matériel</label>
              <Input
                type="text"
                name="material"
                value={articleData.material}
                onChange={handleInputChange}
                placeholder="Entrez le matériel de l'article"
                required
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                label="Customizable"
                checked={articleData.customizable}
                onChange={handleCheckboxChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Catégorie</label>
              <Dropdown
                placeholder="Sélectionner une catégorie"
                fluid
                selection
                options={uniqueCategories.map((categoryId) => {
                  const category = categoriesWithSubcategories.find((cat) => cat.category_id === categoryId);
                  return {
                    key: categoryId,
                    text: category.category_name,
                    value: categoryId,
                  };
                })}
                onChange={handleCategoryChange}
                value={articleData.category_id}
              />
            </Form.Field>
            <Form.Field>
              <label>Sous-catégorie</label>
              <Dropdown
                placeholder="Sélectionner une sous-catégorie"
                fluid
                selection
                // options={categoriesWithSubcategories
                //   ? categoriesWithSubcategories
                //       .filter((category) => category.category_id === articleData.category_id)
                //       .flatMap((category) => category.subcategories.map((subcategory) => ({
                //         key: subcategory.subcategory_id,
                //         text: subcategory.subcategory_name,
                //         value: subcategory.subcategory_id,
                //       })))
                //   : []
                // }
                onChange={handleSubcategoryChange}
                value={articleData.subcategory_id}
              />
            </Form.Field>
            <Button type="submit">Ajouter l'article</Button>
          </Form>
        </Segment>
      </div>
    </div>
  );
};

export default Formaddarticle;
