import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import styles from './order.module.css';
import { createOrder } from '../../services/apiRestaurant';
import { OrderFrom } from '../../services/api.interfaces';
import Button from '../../ui/Button';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import store from '../../store';
import { formatCurrency } from '../../utils/helpers';
import React, { useState } from 'react';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

interface Errors {
  [k: string]: string;
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order: OrderFrom = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  const errors: Errors = {};

  if (!isValidPhone(order.phone!))
    errors.phone =
      'Please provide a phone number. We might need it to contact you.';

  if (Object.keys(errors).length > 0) return errors;

  // If everything is okay, new order will be created and user redirected
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const {
    username,
    address,
    status: addressStatus,
    error: addressError,
    position,
  } = useAppSelector((state) => state.user);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const formErrors = useActionData() as Errors;

  const totalCartPrice = useAppSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  const cart = useAppSelector(getCart);

  console.log('position', position, address);

  const isLoading = addressStatus === 'loading';

  const dispatch = useAppDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className={styles['order-wrapper']}>
      <h2>Ready to order? Let's go!</h2>

      <Form method='POST' className={styles.form}>
        <div className={styles.inputs}>
          <div>
            <label>First Name</label>
            <div>
              <input
                type='text'
                name='customer'
                defaultValue={username}
                required
              />
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
            <div className='address'>
              <input
                type='text'
                name='address'
                defaultValue={address ? address : ''}
                required
                disabled={isLoading}
                placeholder={isLoading ? 'Getting address' : ''}
              />
              {addressStatus === 'error' && <span>{addressError}</span>}

              <Button
                size='sm'
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get address
              </Button>
            </div>
          </div>
        </div>

        <div>
          <input
            type='checkbox'
            name='priority'
            id='priority'
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor='priority'>
            Want to yo give your order priority?{' '}
            <span>(+ {formatCurrency(priorityPrice)})</span>{' '}
          </label>
        </div>

        <div>
          <input type='hidden' name='cart' value={JSON.stringify(cart)} />

          <Button disabled={isSubmitting} size='md'>
            {isSubmitting
              ? 'Placing order...'
              : `Order now from  ${formatCurrency(totalPrice)}`}{' '}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
