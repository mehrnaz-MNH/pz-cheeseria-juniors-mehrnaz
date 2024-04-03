import CartItem from './CartItem/CartItem';
import { Wrapper } from './Cart.styles';
import { CartItemType } from '../App';
import { Button, Snackbar } from '@material-ui/core';
import React, { useState } from 'react';

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  onSuccessPurchase: () => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart , onSuccessPurchase }) => {
 
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);
  
  const [purchaseState , setPurchaseState] = useState(false) 
  const [alertOpen , setAlertOpen] = useState(false)

  const handlePurchase = () =>{
     
      fetch('/api/purchases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartItems)
      })
      .then(response => {
        if (response.ok) {
          
          setPurchaseState(true)
          setAlertOpen(true)
          console.log('Purchase successful');
          onSuccessPurchase();
              
        } else {
          
          setPurchaseState(false)
          setAlertOpen(true)
          console.error('Purchase failed');
          
        }
      })
      .catch(error => {
        console.error('Error:', error);
        
      });
      
  
    }

   const handleCloseAlert = () => {

      setAlertOpen(false)
    
  }

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p data-cy="cart-clear" >No items in cart.</p> : null}
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
      {cartItems.length !== 0 ? 
       <Button 
       data-cy="purchase-button"
       onClick={handlePurchase}>Purchase</Button>
        : null}
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        message={purchaseState ? "Purchase successful" : "Purchase failed"}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        data-cy="purchase-alert"
      />
    </Wrapper>
  );
};

export default Cart;
