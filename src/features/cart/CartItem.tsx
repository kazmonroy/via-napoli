import { PizzaOrder } from '../../services/api.interfaces';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import styles from './Cart.module.css';

interface Props {
  item: PizzaOrder;
}

function CartItem({ item }: Props) {
  const { name, quantity, totalPrice } = item;

  return (
    <li className={styles.item}>
      <p>
        {quantity}&times; {name}
      </p>
      <div>
        <p>{formatCurrency(totalPrice)}</p>
        <Button size='sm'>+</Button>
        <span>{quantity}</span>
        <Button size='sm'>-</Button>
        <Button size='sm'>Delete</Button>
      </div>
    </li>
  );
}

export default CartItem;
