import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import { OrderInterface, PizzaItem } from '../../services/api.interfaces';
import styles from './order.module.css';
import {
  ActionFunctionArgs,
  ParamParseKey,
  Params,
  useFetcher,
  useLoaderData,
  useParams,
} from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurant';
import OrderItem from './OrderItem';
import { useEffect } from 'react';

const PathNames = {
  order: '/order/:orderId',
} as const;

interface Args extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof PathNames.order>>;
}

export async function loader({ params }: Args): Promise<{
  order: OrderInterface;
}> {
  const order = await getOrder(params.orderId!);
  return { order };
}

// Test ID: IIDSAT
interface Props {
  order: OrderInterface;
}
function Order() {
  const fetcher = useFetcher();
  const { order } = useLoaderData() as Props;
  const { orderId } = useParams();

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const { priority, orderPrice, estimatedDelivery, cart, status } = order;
  const priorityPrice = priority ? orderPrice * 0.2 : 0;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  const isLoadingIngredients = fetcher.state === 'loading';

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') {
      fetcher.load('/menu');
    }
  }, [fetcher]);

  console.log(fetcher);

  return (
    <section className={styles.order}>
      <div className={styles.status}>
        <h2>Order #{orderId} status</h2>

        <div>
          {priority && <span className={styles.priority}>Priority</span>}
          <span className={styles['on-going']}>{status} order</span>
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
      <ul>
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={isLoadingIngredients}
            ingredients={
              fetcher.data?.find((el: PizzaItem) => el.id === item.pizzaId)
                .ingredients ?? []
            }
          />
        ))}
      </ul>

      <div className={styles.summary}>
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p>To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </section>
  );
}

export default Order;
