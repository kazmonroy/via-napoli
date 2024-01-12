import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';
import { PizzaItem } from '../../services/api.interfaces';
import styles from './Menu.module.css';

export async function loader() {
  const menu = await getMenu();

  return menu;
}

function Menu() {
  const menu = useLoaderData() as PizzaItem[];

  return (
    <div className={styles['menu-wrapper']}>
      <h1>Menu</h1>
      <ul className={styles.menu}>
        {menu.map((pizza) => (
          <MenuItem key={pizza.id} pizza={pizza} />
        ))}
      </ul>
    </div>
  );
}

export default Menu;
