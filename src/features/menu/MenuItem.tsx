import { useAppDispatch, useAppSelector } from '../../hooks';
import { PizzaItem, PizzaOrder } from '../../services/api.interfaces';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import DeleteItem from '../cart/DeleteItem';
import styles from './Menu.module.css';
import { addItem, getCurrentQuantityById } from '../cart/cartSlice';
import UpdateCartQuantities from '../cart/UpdateCartQuantities';

interface Props {
  pizza: PizzaItem;
}

function MenuItem({ pizza }: Props) {
  const dispatch = useAppDispatch();
  const { name, unitPrice, ingredients, soldOut, imageUrl, id } = pizza;

  const currentQuantity = useAppSelector(getCurrentQuantityById(id))!;
  const isInCart = currentQuantity > 0;

  const handleAddItem = () => {
    const newItem: PizzaOrder = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(newItem));
  };

  return (
    <li className={soldOut ? styles['sold-out'] : ''}>
      <img src={imageUrl} alt={name} />
      <div>
        <p>{name}</p>
        <p>{ingredients.join(', ')}</p>
        <div>
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}
          {!soldOut && !isInCart && (
            <Button size='sm' onClick={handleAddItem}>
              Add to cart
            </Button>
          )}

          {isInCart && (
            <>
              <UpdateCartQuantities
                currentQuantity={currentQuantity}
                pizzaId={id}
              />
              <DeleteItem pizzaId={id} />
            </>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
