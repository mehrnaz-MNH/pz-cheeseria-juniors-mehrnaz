// Types
import React from 'react';
import { CartItemType } from '../../App';
// Styles
import { Wrapper } from './PurchasedItem.styles';

type Props = {
  item: CartItemType;
};

const PurchasedItem: React.FC<Props> = ({ item }) => (
  <Wrapper>
    <div>
      <h3>{item.title}</h3>
      <div className='information'>
        <img src={item.image} alt={item.title} />
        <p>Price: ${item.price}</p>
        <p>Amount : {item.amount} </p>
        <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
      </div>
    </div>
  </Wrapper>
);

export default PurchasedItem;
