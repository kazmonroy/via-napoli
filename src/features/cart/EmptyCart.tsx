import { Link } from 'react-router-dom';
import styles from './cart.module.css';
function EmptyCart() {
  return (
    <div className={styles['empty-cart']}>
      <Link to='/menu'>&larr; Back to menu</Link>
      <p>Your cart is still empty. Start adding some pizzas :)</p>
    </div>
  );
}

export default EmptyCart;
