import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Input, Dropdown } from 'semantic-ui-react';
import Logo from "../../../images/logo.svg";
import "./header.scss";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../../store/reducers/user";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import SearchComponent from './SearchComponent.jsx';

const Header = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, role } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

  const accountOptions = [
    { key: 'profile', text: 'Mon Espace', icon: 'user' },
    { key: 'logout', text: 'Déconnexion', icon: 'sign-out' },
  ];

  const [searchVisible, setSearchVisible] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchVisible(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const handleSearchIconClick = (event) => {
    event.stopPropagation();
    toggleSearch();
  };

  const handleLogout = () => {
    // Vérifie si l'utilisateur est connecté avant de déclencher la déconnexion
    if (isLoggedIn) {
      try {
        // Déclenche la déconnexion en dispatchant l'action de déconnexion
        dispatch(logout());
        toast.success("Vous êtes déconnecté.");
        // Redirige vers l'accueil après la déconnexion réussie
        navigate('/');
      } catch (error) {
        // Gère les erreurs de déconnexion, par exemple affiche une notification
        toast.error("Erreur de déconnexion", error);
      }
    } else {
      // L'utilisateur n'est pas connecté, pas besoin de déconnexion
      toast.info("Vous n'êtes pas connecté.");
    }
  };

  return (
    <header>
      <div className="ui inverted menu">
        <Link to="/">
          <h2 className="ui header">
            <img src={Logo} alt="logo" className="ui circular image enlarged-logo" />
            Confection Main
          </h2>
        </Link>
        <div className="right menu">
          {searchVisible ? (
            <div className="item" ref={searchRef}>
            <SearchComponent
           // onSearch={handleSearch}
            />
            </div>
          ) : (
            <a className="item" onClick={handleSearchIconClick}>
              <i className="search icon"></i>
            </a>
          )}
          {isLoggedIn ? (
            <Dropdown
              className="custom-dropdown"
              item
              trigger={<span className="item"><i className="user icon"></i></span>}
              options={accountOptions.map((option) => ({
                key: option.key,
                text: option.text,
                icon: option.icon,
                as: Link,
                to: option.key === 'profile' ?
                  // Redirection en fonction du rôle de l'utilisateur
                  role === 'client' ? `/monespace/client/${userId}` : `/monespace/createur/${userId}` :
                  // Redirection pour la déconnexion
                  '#',
                // Ajout d'un gestionnaire d'événements pour la déconnexion
                onClick: option.key === 'logout' ? handleLogout : undefined,
              }))}
            />
          ) : (
            <Link to="/login" className="item">
              <i className="user icon"></i>
            </Link>
          )}
          <Link to="/panier" className="item cart">
            <i className="shopping cart icon"></i>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
