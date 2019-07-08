import React from 'react';

import CartSummaryItem from './cart-summary-item';

/*
  this component is for rendering the cart page
*/

const CartSummary = props => {

  return (
    <div className="cart-summary-list">

      <button type="button" className="btn btn-outline-dark font-weight-bold mt-4 mb-1 "
        onClick={ () => props.setView('catalog', {})} >
              &lt; Back to catalog
      </button>

      {props.products.map(item =>
        <CartSummaryItem key={item.id}
          {...item }
          setView = {props.setView}
          changeQuantityInCart = {props.changeQuantityInCart}
          quantityOnBlurHander = {props.quantityOnBlurHander}
          deleteItemInCart={props.deleteItemInCart}></CartSummaryItem>
      )}

      <div className="row d-flex justify-content-end align-items-center my-2">
        <div className="font-weight-bold mr-3">Total Price: ${(props.totalPrice / 100).toFixed(2)}</div>
        <button type="button"
          className="btn btn-outline-dark font-weight-bold "
          onClick={ () => props.setView('checkout', {})}
          disabled = { props.totalPrice === 0 }>
            CHECKOUT
        </button>
      </div>
    </div>

  );
};

export default CartSummary;
