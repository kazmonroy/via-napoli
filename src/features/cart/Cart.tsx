import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Button from '../../ui/Button';
import styles from './cart.module.css';
import { clearCart, getCart } from './cartSlice';
import EmptyCart from './EmptyCart';
import { getUsername } from '../user/userSlice';

function Cart() {
  const cart = useAppSelector(getCart);
  const username = useAppSelector(getUsername);
  const dispatch = useAppDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <section className={styles.cart}>
      {cart.length > 0 ? (
        <>
          <Link to='/menu'>&larr; Back to menu</Link>
          <h2>Your cart, {username}</h2>

          {cart.map((item) => (
            <CartItem key={item.pizzaId} item={item} />
          ))}

          <div className={styles.buttons}>
            <Button size='md' to='/order/new'>
              Order pizzas
            </Button>
            <Button size='md' style='secondary' onClick={handleClearCart}>
              Clear cart
            </Button>
          </div>
        </>
      ) : (
        <EmptyCart />
      )}
    </section>
  );
}

export default Cart;
