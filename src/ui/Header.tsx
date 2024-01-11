import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import styles from './UI.module.css';
import { useAppSelector } from '../hooks';

function Header() {
  const username = useAppSelector((state) => state.user.username);

  return (
    <header className={styles.header}>
      <Link to='/' className='logo'>
        Via Napoli
      </Link>

      <SearchOrder />
      {username && <p>{username}</p>}
    </header>
  );
}

export default Header;
