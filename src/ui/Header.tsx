import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';

function Header() {
  return (
    <header>
      <Link to='/' className='logo'>
        Via Napoli
      </Link>

      <SearchOrder />
      <p>Katherine</p>
    </header>
  );
}

export default Header;
