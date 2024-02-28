import React, { useState, useEffect } from "react";
import { Form, Input, Button, Icon } from "semantic-ui-react";
import axios from "axios";

function PersonalInformation() {
  const userId = localStorage.getItem("id");

  // Données utilisateur initiales
  const initialUserData = {
    firstname: "",
    lastname: "",
    email: "",
    currentpassword: "",
    newpassword: "",
    confirmpassword: "",
    address: "",
    city: "",
    zipcode: "",
    phone_number: "",
  };

  const [userData, setUserData] = useState(initialUserData);
  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    setEditMode(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/${userId}`
        );
        console.log("Données de l'API USER :", response.data);
        setUserData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };
    fetchData();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateUserData = {
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        newpassword: userData.newpassword,
        address: userData.address,
        city: userData.city,
        zipcode: userData.zipcode,
        phone_number: userData.phone_number,
      };

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/${userId}`,
        updateUserData
      );

      setUserData((prevData) => ({
        ...prevData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      setEditMode(false);
    } catch (error) {
      console.error("Erreur lors de la soumission des données:", error);
    }
  };

  return (
    <div  style={{ minWidth: "350px" }}>
      <Form onSubmit={handleSubmit}
            >
        <h2>Informations Personnelles</h2>
        <Button
          icon
          style={{ position: "absolute", top: "10px", right: "10px" }}
          onClick={(e) => {
            e.preventDefault();
            handleEditClick();
          }}
        >
          <Icon name="pencil" />
        </Button>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Prénom</label>
            <Input
              type="text"
              name="firstName"
              value={userData.firstname || ""}
              onChange={(e) =>
                setUserData({ ...userData, firstname: e.target.value })
              }
              disabled={!editMode}
            />
          </Form.Field>
          <Form.Field>
            <label>Nom</label>
            <Input
              type="text"
              name="lastName"
              value={userData.lastname || ""}
              onChange={(e) =>
                setUserData({ ...userData, lastname: e.target.value })
              }
              disabled={!editMode}
            />
          </Form.Field>
          <Form.Field>
            <label>Numéro de téléphone</label>
            <Input
              type="text"
              name="phoneNumber"
              value={userData.phone_number || ""}
              onChange={(e) =>
                setUserData({ ...userData, phone_number: e.target.value })
              }
              disabled={!editMode}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Adresse E-mail</label>
            <Input
              type="email"
              name="email"
              value={userData.email || ""}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              disabled={!editMode}
            />
          </Form.Field>
        </Form.Group>
        <h2>Mot de passe</h2>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Mot de passe actuel</label>
            <Input
              type="password"
              name="currentPassword"
              value={userData.currentpassword || ""}
              onChange={(e) =>
                setUserData({ ...userData, currentpassword: e.target.value })
              }
              disabled={!editMode}
            />
          </Form.Field>
          <Form.Field>
            <label>Nouveau mot de passe</label>
            <Input
              type="password"
              name="newPassword"
              value={userData.newpassword || ""}
              onChange={(e) =>
                setUserData({ ...userData, newpassword: e.target.value })
              }
              disabled={!editMode}
            />
          </Form.Field>
          <Form.Field>
            <label>Confirmer nouveau mot de passe</label>
            <Input
              type="password"
              name="confirmPassword"
              value={userData.confirmpassword || ""}
              onChange={(e) =>
                setUserData({ ...userData, confirmpassword: e.target.value })
              }
              disabled={!editMode}
            />
          </Form.Field>
        </Form.Group>
        <h2>Adresse</h2>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Rue</label>
            <Input
              type="text"
              name="address"
              value={userData.address || ""}
              onChange={(e) =>
                setUserData({ ...userData, address: e.target.value })
              }
              disabled={!editMode}
            />
          </Form.Field>
          <Form.Field>
            <label>Ville</label>
            <Input
              type="text"
              name="city"
              value={userData.city || ""}
              onChange={(e) =>
                setUserData({ ...userData, city: e.target.value })
              }
              disabled={!editMode}
            />
          </Form.Field>
          <Form.Field>
            <label>Code Postal</label>
            <Input
              type="text"
              name="zipcode"
              value={userData.zipcode || ""}
              onChange={(e) =>
                setUserData({ ...userData, zipcode: e.target.value })
              }
              disabled={!editMode}
            />
          </Form.Field>
        </Form.Group>

        {editMode ? (
          <Button type="submit">Enregistrer les modifications</Button>
        ) : null}
      </Form>
    </div>
  );
}

export default PersonalInformation;

