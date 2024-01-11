import { useAppDispatch } from '../../hooks';
import { PizzaOrder } from '../../services/api.interfaces';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import styles from './Cart.module.css';
import {
  decreaseItemQuantity,
  deleteItem,
  increaseItemQuantity,
} from './cartSlice';

interface Props {
  item: PizzaOrder;
}

function CartItem({ item }: Props) {
  const dispatch = useAppDispatch();
  const { name, quantity, totalPrice, pizzaId } = item;

  const handleIncrease = () => {
    dispatch(increaseItemQuantity(pizzaId));
  };

  const handleDecrease = () => {
    dispatch(decreaseItemQuantity(pizzaId));
  };

  const handleDeleteItem = () => {
    dispatch(deleteItem(pizzaId));
  };

  return (
    <li className={styles.item}>
      <p>
        {quantity}&times; {name}
      </p>
      <div>
        <p>{formatCurrency(totalPrice)}</p>
        <Button size='sm' onClick={handleIncrease}>
          +
        </Button>
        <span>{quantity}</span>
        <Button size='sm' onClick={handleDecrease}>
          -
        </Button>
        <Button size='sm' onClick={handleDeleteItem}>
          Delete
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
