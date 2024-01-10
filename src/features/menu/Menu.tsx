import { useLoaderData } from 'react-router-dom';
import { Pizza, getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

export async function loader() {
  const menu = await getMenu();

  return menu;
}

function Menu() {
  const menu = useLoaderData() as Pizza[];

  return (
    <div>
      <h1>Menu</h1>
      <ul>
        {menu.map((pizza) => (
          <MenuItem key={pizza.id} pizza={pizza} />
        ))}
      </ul>
    </div>
  );
}

export default Menu;
