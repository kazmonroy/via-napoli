import { PizzaOrder } from '../../services/api.interfaces';
import { formatCurrency } from '../../utils/helpers';
import styles from './Order.module.css';
interface Props {
  item: PizzaOrder;
  ingredients: string[];
  isLoadingIngredients: boolean;
}

function OrderItem({ item, ingredients, isLoadingIngredients }: Props) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className={styles.item}>
      <div>
        <p>
          <span>{quantity}&times;</span> {name}
        </p>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
      {<p>{isLoadingIngredients ? 'loading...' : ingredients?.join(', ')}</p>}
    </li>
  );
}

export default OrderItem;
