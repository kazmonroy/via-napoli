import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Button from '../../ui/Button';
import styles from './Cart.module.css';
import { clearCart } from './cartSlice';

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

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

      <h2>Your cart, {username}</h2>
      {cart.map((item) => (
        <CartItem key={item.pizzaId} item={item} />
      ))}

      <div className={styles.buttons}>
        <Button size='md' to='/order/new'>
          Order pizzas
        </Button>
        <Button
          size='md'
          to='/order/new'
          style='secondary'
          onClick={handleClearCart}
        >
          Clear cart
        </Button>
      </div>
    </section>
  );
}

export default Cart;
