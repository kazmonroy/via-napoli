import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import { getOrder } from '../../services/apiRestaurant';
import styles from './order.module.css';
import {
  ActionFunctionArgs,
  ParamParseKey,
  Params,
  useLoaderData,
} from 'react-router-dom';
import { OrderInterface } from './Order.models';

const PathNames = {
  order: '/order/:orderId',
} as const;

interface Args extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof PathNames.order>>;
}

export async function loader({ params }: Args): Promise<{
  order: OrderInterface;
}> {
  console.log(params.orderId);
  const order = await getOrder(params.orderId!);
  return { order };
}

// Test ID: IIDSAT

function Order() {
  const { order } = useLoaderData() as OrderInterface;

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const { priority, priorityPrice, orderPrice, estimatedDelivery } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <section>
      <div className={styles.status}>
        <h2>Order XXXX status</h2>

        <div>
          {priority && <span className={styles.priority}>Priority</span>}
          <span className={styles['on-going']}>{status}order</span>
        </div>
      </div>

      <div className={styles.delivery}>
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>
      <div>
        <p>order info goes here</p>
      </div>

      <div className={styles.summary}>
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p>To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </section>
  );
}

export default Order;
