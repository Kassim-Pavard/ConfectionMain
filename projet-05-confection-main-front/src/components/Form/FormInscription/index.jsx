import React, { useState } from "react";
import PasswordCheck from "./PasswordCheck";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FormInscription = () => {
  const navigate = useNavigate();

  // Initialisation de l'état du formulaire
  const [formData, setFormData] = useState({
    lastname: "Doe",
    firstname: "John",
    email: "john.doe@example.com",
    password: "Password1234!",
    confirmPassword: "Password1234!",
    role: "",
    confirmConditions: false,
  });

  // État pour gérer l'activité des champs de mot de passe
  const [isPasswordInputActive, setIsPasswordInputActive] = useState(false);
  const [isConfirmPasswordInputActive, setIsConfirmPasswordInputActive] =
    useState(false);

  // État pour afficher la modal de confirmation après soumission
  const [showModal, setShowModal] = useState(false);
  // Message de confirmation en fonction du rôle
  const [confirmationMessage, setConfirmationMessage] = useState(
    "Veuillez confirmer votre inscription."
  );

  // Fonction pour gérer les changements dans les champs de saisie
  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    // Déterminer la nouvelle valeur en fonction du type de champ
    const newValue = e.target.type === "checkbox" ? checked : value;
    // Mettre à jour l'état du formulaire avec les nouvelles valeurs
    setFormData({
      ...formData,
      [name]: newValue,
    });

    // Mettre à jour le message de confirmation en fonction du rôle sélectionné
    if (name === "role") {
      const message =
        value === "client"
          ? "Veuillez confirmer votre inscription."
          : "En confirmant, vous serez redirigé pour finaliser votre inscription et ainsi pouvoir vendre sur notre site, rejoignant ainsi la grande famille des créateurs.";
      setConfirmationMessage(message);
    }
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Vérification si les mots de passe correspondent
    if (formData.password !== formData.confirmPassword) {
      toast.info("Le mot de passe et la confirmation doivent être identiques.");
      return;
    }

    // Afficher la modal de confirmation après soumission
    setShowModal(true);
  };

  // Fonction pour gérer la confirmation dans la modal
  const handleConfirmation = async () => {
    try {
      const { lastname, firstname, email, password } = formData;
      const newFormData = { lastname, firstname, email, password };
      console.log(newFormData);
      // Effectuer une requête POST à l'API pour créer un nouvel utilisateur
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users`,
        newFormData
      );
      // Log des données du formulaire
      console.log("Réponse de la création de l'utilisateur:", response.data);
      const userId = response.data.id; // Récupérer l'ID de l'utilisateur créé

      // Réinitialiser le formulaire après soumission
      setFormData({
        lastname: "",
        firstname: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "client",
        confirmConditions: false,
      });

      // Cacher la modal après confirmation
      setShowModal(false);

      // Logique conditionnelle basée sur le rôle sélectionné
      if (formData.role === "client") {
        // TODO: Afficher une modal pour indiquer l'inscription réussie
        toast.success("Inscription réussie. Vous pouvez maintenant vous connecter.");
      } else if (formData.role === "creator") {
        // TODO => Stocker l'utilisateur pour récupérer son ID et le rendre accessible du workshopLogin
        navigate("/login/createur", { state: { userId } });
      }
    } catch (error) {
      toast.error("Erreur lors de la création de l'utilisateur:", error);
      // TODO: Gérer l'erreur de création de l'utilisateur
    }
  };

  // Fonction pour annuler la confirmation dans la modal
  const handleCancelConfirmation = () => {
    setShowModal(false);
  };

  // Rendu du composant de formulaire
  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* Champ email */}
        <div>
          <label htmlFor="emailInscription">Email:</label>
          <input
            type="email"
            id="emailInscription"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            autoComplete="email"
            required
          />
        </div>
        {/* Champ mot de passe */}
        <div>
          <label htmlFor="passwordInscription">Mot de passe:</label>
          <input
            type="password"
            id="passwordInscription"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleInputChange}
            onFocus={() => setIsPasswordInputActive(true)}
            onBlur={() => setIsPasswordInputActive(false)}
            autoComplete="current-password"
            required
          />
        </div>
        {/* Champ confirmation de mot de passe */}
        <div>
          <label htmlFor="confirmPasswordInscription">Confirmer Mot de passe:</label>
          <input
            type="password"
            id="confirmPasswordInscription"
            name="confirmPassword"
            placeholder="Confirmer votre Mot de passe"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            onFocus={() => setIsConfirmPasswordInputActive(true)}
            onBlur={() => setIsConfirmPasswordInputActive(false)}
            autoComplete="current-password"
            required
          />
        </div>
        {/* Utilisation du composant PasswordCheck pour vérifier la force du mot de passe */}
        <PasswordCheck
          password={formData.password}
          confirmPassword={formData.confirmPassword}
          isPasswordInputActive={isPasswordInputActive}
          isConfirmPasswordInputActive={isConfirmPasswordInputActive}
        />

        {/* Champ de saisie pour le nom */}
        <div>
          <label htmlFor="lastname">Nom:</label>{" "}
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Nom"
            value={formData.lastname}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Champ de saisie pour le prénom */}
        <div>
          <label htmlFor="firstname">Prénom:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="Prénom"
            value={formData.firstname}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Sélection du rôle */}
        <div>
          <input
            type="radio"
            id="inscriptionClient"
            name="role"
            value="client"
            checked={formData.role === "client"}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="inscriptionClient" style={{ marginLeft: '0.5em' }}>Je suis client</label>
        </div>
        <div>
          <input
            type="radio"
            id="inscriptionCreator"
            name="role"
            value="creator"
            checked={formData.role === "creator"}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="inscriptionCreator" style={{ marginLeft: '0.5em' }}>Je suis créateur</label>
        </div>
        {/* Case à cocher pour accepter les conditions */}
        <div>
          <input
            type="checkbox"
            id="confirmConditions"
            name="confirmConditions"
            checked={formData.confirmConditions}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="confirmConditions" style={{ marginLeft: '0.5em' }}>
            Accepter les conditions d'utilisation.
          </label>
        </div>
        {/* Bouton pour soumettre le formulaire */}
        <button type="submit">Inscription</button>
      </form>

      {/* Modal de confirmation */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>{confirmationMessage}</p>
            <div className="modal-buttons">
              <button onClick={handleConfirmation}>Confirmer</button>
              <button onClick={handleCancelConfirmation}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormInscription;
