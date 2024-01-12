import styles from './Cart.module.css';
function EmptyCart() {
  return (
    <div className={styles['empty-cart']}>
      <p>Your cart is still empty. Start adding some pizzas :)</p>
    </div>
  );
}

export default EmptyCart;
