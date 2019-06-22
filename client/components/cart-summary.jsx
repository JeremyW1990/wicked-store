import React from 'react';
import CartSummaryItem from './cart-summary-item';

const CartSummary = props => {
  return (
    <div className="cart-summary-list container">
      <div className="row">
        <button type="button" className="btn btn-default" onClick={ () => props.setView('catalog', {})} >&lt; Back to catalog</button>
      </div>

      {props.products.map(item =>
        <CartSummaryItem key={item.id} {...item } ></CartSummaryItem>
      )}

      <div className="row d-flex justify-content-between mt-2">
        <div className="font-weight-bold font-italic">Item Total: ${(props.totalPrice / 100).toFixed(2)}</div>
        <button type="button"
          className="btn btn-primary"
          onClick={ () => props.setView('checkout', {})}
          disabled = { props.products.length === 0 }>
            CHECKOUT
        </button>
      </div>

    </div>

  );
};

export default CartSummary;
