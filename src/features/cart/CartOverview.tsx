import { Link } from 'react-router-dom';
import styles from './Cart.module.css';
import { useAppSelector } from '../../hooks';
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice';

function CartOverview() {
  // if (!cart) return null;

  const totalCartQuantity = useAppSelector(getTotalCartQuantity);
  const totalPrice = useAppSelector(getTotalCartPrice);

  if (!totalCartQuantity) return null;

  return (
    <div className={styles['cart-overview']}>
      <p>
        <span>
          {totalCartQuantity}
          {totalCartQuantity > 1 ? ' pizzas' : ' pizza'}
        </span>
        <span>${totalPrice}</span>
      </p>
      <Link to='/cart'>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
