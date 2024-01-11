import { Link } from 'react-router-dom';
import styles from './Cart.module.css';
import { useAppSelector } from '../../hooks';

function CartOverview() {
  const cart = useAppSelector((state) => state.cart.cart);

  const totalPizzas = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalPrice = cart.reduce((acc, curr) => acc + curr.totalPrice, 0);

  if (!cart) return null;

  return (
    <>
      {cart.length > 0 && (
        <div className={styles['cart-overview']}>
          <p>
            <span>{totalPizzas} pizzas</span>
            <span>${totalPrice}</span>
          </p>
          <Link to='/cart'>Open cart &rarr;</Link>
        </div>
      )}
    </>
  );
}

export default CartOverview;
