import { Outlet, useNavigation } from 'react-router-dom';
import Header from './Header';
import CartOverview from '../features/cart/CartOverview';
import Loader from './Loader';
import styles from './shared.module.css';

function AppLayout() {
  const { state } = useNavigation();

  const isLoading = state === 'loading';

  return (
    <div className={styles.layout}>
      {isLoading && <Loader />}
      <Header />

      <main className={isLoading ? styles.blur : ''}>
        <Outlet />
      </main>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
