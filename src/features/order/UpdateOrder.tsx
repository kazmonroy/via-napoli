import {
  useFetcher,
  ActionFunctionArgs,
  Params,
  ParamParseKey,
} from 'react-router-dom';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';

// interface MyParams {
//   orderId: string;
// }

const MyParams = {
  orderId: '/order/:orderId',
} as const;

interface Args extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof MyParams.orderId>>;
}

export async function action({ params }: Args) {
  const data = { priority: true };

  await updateOrder(params.orderId!, data);

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
