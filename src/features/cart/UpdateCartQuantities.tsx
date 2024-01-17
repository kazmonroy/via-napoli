import { useAppDispatch } from '../../hooks';
import Button from '../../ui/Button';
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';
import styles from './cart.module.css';

interface Props {
  pizzaId: number;
  currentQuantity: number;
}

function UpdateCartQuantities({ pizzaId, currentQuantity }: Props) {
  const dispatch = useAppDispatch();

  const handleIncrease = () => {
    dispatch(increaseItemQuantity(pizzaId));
  };

  const handleDecrease = () => {
    dispatch(decreaseItemQuantity(pizzaId));
  };

  return (
    <div className={styles['cart-quantity']}>
      <Button size='sm' onClick={handleDecrease}>
        -
      </Button>
      <span>{currentQuantity}</span>

      <Button size='sm' onClick={handleIncrease}>
        +
      </Button>
    </div>
  );
}

export default UpdateCartQuantities;
