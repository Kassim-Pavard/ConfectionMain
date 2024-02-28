import React, { useState } from "react";
import { Container, Segment, List, Button, Grid, Image } from "semantic-ui-react";

function CartPage() {
  const [cartItems, setCartItems] = useState([
    { id: 1, title: "T-shirt graphique", price: 20, quantity: 1, image: "https://img.freepik.com/vecteurs-premium/tshirt-bl…ion-conception-vectorielle-prete-2_651517-571.jpg"},
    { id: 2, title: "Pull en laine", price: 30, quantity: 2, image: "https://img.freepik.com/photos-gratuite/heureuse-f…-visage-confiante-regard-sincere_273609-43529.jpg" },
    // articles en dur, temporaire
  ]);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity >= 0) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          )
        );
      }
    };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const taxRate = 0.2; // taux de TVA à 20%
    const tax = subtotal * taxRate;
    return subtotal + tax;
  };

  return (
    <div>
      <Container>
        <h2>Mon Panier</h2>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column width={12}>
              <Segment.Group>
                <Segment>
                  <List divided relaxed>
                    {cartItems.map((item) => (
                      <List.Item key={item.id}>
                        <Grid columns={3} divided>
                          <Grid.Row>
                            <Grid.Column width={4}>
                              <Image src={item.image} alt={`Image de ${item.title}`} />
                            </Grid.Column>
                            <Grid.Column width={8}>
                              <List.Header>{item.title}</List.Header>
                              <List.Description>
                                Prix: {item.price} € | Quantité: {item.quantity}
                              </List.Description>
                              <div className="quantity-controls">
                                <Button
                                  icon="minus"
                                  className="quantity-btn"
                                  style={{ margin: "0.2rem" }}
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                />
                                <Button
                                  icon="plus"
                                  className="quantity-btn"
                                  style={{ margin: "0.2rem" }}
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                />
                              </div>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </List.Item>
                    ))}
                  </List>
                </Segment>
              </Segment.Group>
            </Grid.Column>
            <Grid.Column width={4}>
              {/* Section Sous-total, TVA et Total */}
              <Segment textAlign="left">
                <div className="cart-summary">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ textAlign: "left" }}>Sous-total:</div>
                    <div style={{ textAlign: "right" }}>{calculateSubtotal()} €</div>
                  </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ textAlign: "left" }}>TVA (20%):</div>
                    <div style={{ textAlign: "right" }}>{calculateSubtotal() * 0.2} €</div>
                  </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ textAlign: "left" }}>Total:</div>
                    <div style={{ textAlign: "right" }}>{calculateTotal()} €</div>
                  </div>
                </div>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}

export default CartPage;
