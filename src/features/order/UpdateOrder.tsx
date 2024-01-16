import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';

interface ActionProps {
  request: Request;
  params: { orderId: string };
}

export async function action({ params }: ActionProps) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);

  return null;
}

function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method='PATCH'>
      <Button size='md'>Make order priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;
