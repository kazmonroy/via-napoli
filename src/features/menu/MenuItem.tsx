import { PizzaItem } from '../../services/api.interfaces';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';

interface Props {
  pizza: PizzaItem;
}

function MenuItem({ pizza }: Props) {
  const { name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const handleClick = () => {
    console.log('do something!');
  };

  return (
    <li>
      <img src={imageUrl} alt={name} />
      <div>
        <p>{name}</p>
        <p>{ingredients.join(', ')}</p>
        <div>
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}
          <Button size='sm' onClick={handleClick}>
            Add to cart
          </Button>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
