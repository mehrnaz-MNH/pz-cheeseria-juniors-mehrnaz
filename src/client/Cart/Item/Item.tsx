import Button from '@material-ui/core/Button';
// Types
import { CartItemType } from '../../App';
// Styles
import { Wrapper } from './Item.styles';
import React , {useState} from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'; //imports for dialog

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => {
  const [openDialog , setDialogOpen] = useState(false);
  // handle opening
  const handleOpen = () =>{
    setDialogOpen(true);
  }
  //handle closing
  const handleClose = () =>{
    setDialogOpen(false);
  }
  return (
    <Wrapper>
    <img src={item.image} alt={item.title} />
    <div>
      <h3>{item.title}</h3>
      <h3>${item.price}</h3>
    </div>
    <Button
      onClick={() => handleAddToCart(item)}
      data-cy={`add-to-cart-${item.id}`}>Add to cart</Button>
  </Wrapper>
  )
};

export default Item;
