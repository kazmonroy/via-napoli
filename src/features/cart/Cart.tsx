import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Button from '../../ui/Button';
import styles from './Cart.module.css';
import { clearCart } from './cartSlice';

function Cart() {
  const cart = useAppSelector((state) => state.cart.cart);
  const username = useAppSelector((state) => state.user.username);
  const dispatch = useAppDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <section className={styles.cart}>
      <Link to='/menu'>&larr; Back to menu</Link>

      {cart.length > 0 ? (
        <>
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
        <p>Cart is empty, start adding pizzas!</p>
      )}
    </section>
  );
}

export default Cart;
