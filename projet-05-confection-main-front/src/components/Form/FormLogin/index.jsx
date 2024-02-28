import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../../store/reducers/user";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FormLogin = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const initialFormData = {
    email: "marty.mcfly@hillvalley.com",
    password: "Password1234!",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
   e.preventDefault();

    try {
      const response = await dispatch(userLogin(formData));

      // Vérifier la présence du token avant de le décoder
      if (!response.payload || !response.payload.accessToken) {
        toast.error("Email ou mot de passe incorrect.");
      }

      const decodedToken = jwtDecode(response.payload.accessToken);

      // Redirection en fonction du rôle de l'utilisateur
      if (decodedToken.role === "membre") {
        navigate("/");
        toast.success("Vous êtes connecté", { type: "success" });
      } else if (decodedToken.role === "createur") {
        navigate("/");
      } else {
        navigate("/login");
      }

      setFormData(initialFormData);
    } catch (error) {
      console.error(error);
      if (response && response.status === 401) {
        toast.info("Email ou mot de passe incorrect.");
      } else {
        toast.error("Une erreur est survenue pendant la requête.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          autoComplete="username"
          required
        />
      </div>
      <div>
        <label htmlFor="password">Mot de passe:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleInputChange}
          autoComplete="current-password"
          required
        />
      </div>
      {error && <div>{error.message}</div>}
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default FormLogin;
