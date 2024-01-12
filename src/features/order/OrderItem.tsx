import { PizzaOrder } from '../../services/api.interfaces';
import { formatCurrency } from '../../utils/helpers';
import styles from './Order.module.css';
interface Props {
  item: PizzaOrder;
}

function OrderItem({ item }: Props) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className={styles.item}>
      <div>
        <p>
          <span>{quantity}&times;</span> {name}
        </p>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
