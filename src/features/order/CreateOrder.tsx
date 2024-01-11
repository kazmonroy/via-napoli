import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import styles from './order.module.css';
import { createOrder } from '../../services/apiRestaurant';
import { OrderFrom } from '../../services/api.interfaces';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

interface Errors {
  [k: string]: string;
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order: OrderFrom = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on',
  };

  const errors: Errors = {};

  if (!isValidPhone(order.phone!))
    errors.phone =
      'Please provide a phone number. We might need it to contact you.';

  if (Object.keys(errors).length > 0) return errors;

  // If everything is okay, new order will be created and user redirected
  const newOrder = await createOrder(order);
  return redirect(`/order/${newOrder.id}`);
}

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const formErrors = useActionData() as Errors;

  console.log(formErrors);
  const cart = fakeCart;

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      <Form method='POST' className={styles.form}>
        <div className={styles.inputs}>
          <div>
            <label>First Name</label>
            <div>
              <input type='text' name='customer' required />
            </div>
          </div>

          <div>
            <label>Phone number</label>
            <div>
              <input type='tel' name='phone' required />
              {formErrors && <span>{formErrors.phone}</span>}
            </div>
          </div>

          <div>
            <label>Address</label>
            <div>
              <input type='text' name='address' required />
            </div>
          </div>
        </div>

        <div>
          <input
            type='checkbox'
            name='priority'
            id='priority'
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor='priority'>Want to yo give your order priority?</label>
        </div>

        <div>
          <input type='hidden' name='cart' value={JSON.stringify(cart)} />
          <button disabled={isSubmitting}>
            {isSubmitting ? 'Placing order...' : 'Order now'}{' '}
          </button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
