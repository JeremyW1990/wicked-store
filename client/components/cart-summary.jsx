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
      <div className="font-weight-bold font-italic">Item Total: ${props.totalPrice}</div>
    </div>

  );
};

export default CartSummary;