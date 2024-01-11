import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import styles from './UI.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <Link to='/' className='logo'>
        Via Napoli
      </Link>

      <SearchOrder />
      <p>Katherine</p>
    </header>
  );
}

export default Header;
