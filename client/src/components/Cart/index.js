import React, { useEffect } from 'react';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import './style.css';
import { useStoreContext } from '../../utils/GlobalState';

const Cart = () => {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    async function getCart() {
      // get items from cart amd put them in global store
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    };

    if (!state.cart.length) {
      getCart();
    }
    // the dependency array lists everything the Hook is dependent on to execute
    // The Hook runs on load no matter what, but it will only run again if any value in the dependency array is changed 
  }, [state.cart.length, dispatch]);

  const toggleCart = () => {
    dispatch({ type: TOGGLE_CART });
  };

  const calculateTotal = () => {
    let sum = 0;
    state.cart.forEach(item => {
      sum += item.price * item.purchaseQuantity;
    });
    // toFIxed gives the numbers of decimal points after 0
    return sum.toFixed(2)
  }

  if (!state.cartOpen) {
    return (
      <div className='cart-closed' onClick={toggleCart}>
        <span
        role='img'
        aria-label='trash'>🛒</span>
      </div>
    );
  };


  return (
    <div className='cart'>
      <div className='close' onClick={toggleCart}>[close]</div>
      <h2>Shopping Cart</h2>
      {/* if cart has items */}
      {state.cart.length ? (
        <div>
          {state.cart.map(item => (
            <CartItem key={item._id} item={item} />
          ))}
          <div className='flex-row space-between'>
            <strong>Total: ${calculateTotal()}</strong>
            {
              Auth.loggedIn() ? 
              <button>
                Checkout
              </button> 
              : 
              <span>(log in to check out)</span>
            }
          </div>
        </div>
      ) : (
        <h3>
          <span role='img' aria-label='shocked'>
            😱
          </span>
          You haven't added anything to your cart yet!
        </h3>
      )}

    </div>
  );
};

export default Cart;