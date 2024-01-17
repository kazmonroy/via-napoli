import { PizzaOrder } from '../../services/api.interfaces';
import { formatCurrency } from '../../utils/helpers';
import styles from './cart.module.css';
import DeleteItem from './DeleteItem';
import UpdateCartQuantities from './UpdateCartQuantities';

interface Props {
  item: PizzaOrder;
}

function CartItem({ item }: Props) {
  const { name, quantity, totalPrice, pizzaId } = item;

  return (
    <li className={styles.item}>
      <p>
        {quantity}&times; {name}
      </p>
      <div>
        <p>{formatCurrency(totalPrice)}</p>

        <UpdateCartQuantities currentQuantity={quantity} pizzaId={pizzaId} />

        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
