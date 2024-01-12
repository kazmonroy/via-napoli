import { useAppDispatch } from '../../hooks';
import Button from '../../ui/Button';
import { deleteItem } from './cartSlice';

interface Props {
  pizzaId: number;
}

function DeleteItem({ pizzaId }: Props) {
  const dispatch = useAppDispatch();

  const handleDeleteItem = () => {
    dispatch(deleteItem(pizzaId));
  };
  return (
    <Button size='sm' onClick={handleDeleteItem}>
      Delete
    </Button>
  );
}

export default DeleteItem;
