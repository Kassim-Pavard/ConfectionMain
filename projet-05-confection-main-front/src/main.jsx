// Import des fonctions pour création du routeur
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles/styles.scss";


//Importation des composants
import App from "./components/App/app.jsx";
import HomePage from "./components/HomePage/index.jsx";
import LoginPage from "./components/LoginPage/";
import WorkshopFormPage from "./components/WorkshopFormPage";
import CartPage from "./components/CartPage/";
import CreatorsPage from "./components/CreatorsPage/";
import CreatorSpacePage from "./components/CreatorSpacePage";
import ItemsPage from "./components/ItemsPage/";
import ItemDetailsPage from "./components/ItemDetailsPage/";
import CreatorDetailsPage from "./components/CreatorDetailsPage/";
import CategoryPage from "./components/CategoryPage/index.jsx";
import SubcategoryPage from "./components/SubcategoryPage/index.jsx";
import NotFound from "./components/NotFound/index.jsx";
import Formaddarticle from "./components/Form/FormAddArticle/index.jsx";


// Création du routeur
const router = createBrowserRouter([
  /* Premier élément: le layout qui va acceuillir tous les sous composants de nos pages */
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage />, },
      { path: "login", element: <LoginPage /> },
      { path: "login/createur", element: <WorkshopFormPage /> },
      { path: "panier", element: <CartPage /> },
      { path: "createurs", element: <CreatorsPage /> },
      { path: "articles", element: <ItemsPage /> },
      { path: "articles/:itemId", element: <ItemDetailsPage /> },
      { path: "createurs/:creatorId", element: <CreatorDetailsPage /> },
      { path: `monespace/createur/:userId`,element: (<CreatorSpacePage/>)},
      { path: "categories/:categoryId", element: <CategoryPage /> },
      { path: "sous-categories/:subcategoryId", element: <SubcategoryPage /> },
      { path: "ajout-article", element: <Formaddarticle /> },
      { path: "*", element: <NotFound /> }, // pour toutes les routes inexsitantes renvoyant une 404

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
        <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
