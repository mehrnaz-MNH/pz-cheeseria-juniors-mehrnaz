import { Wrapper } from './PurchasedCart.styles';
import { CartItemType } from '../App';
import React from 'react';
import PurchasedItem from './PurchasedItem/PurchasedItem'

type Props = {
  PurchasedItems: CartItemType[];

};

const PurchasedCart: React.FC<Props> = ({ PurchasedItems }) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);
  
  return (
    <Wrapper>
      <h2>Your Recent Purchases</h2>
      {PurchasedItems.length === 0 ? <p>No item recently purchased.</p> : null}
      {PurchasedItems.map(item => (
        <PurchasedItem
          key={item.id}
          item={item}
        />
      ))}
      <h2>Total: ${calculateTotal(PurchasedItems).toFixed(2)}</h2>
    </Wrapper>
  );
};

export default PurchasedCart;
