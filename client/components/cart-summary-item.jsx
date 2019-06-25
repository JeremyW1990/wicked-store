import React from 'react';

const CartSummaryItem = props => {
  return (

    <div className="border cart-summary-item row mt-2">

      <div className="image col-12 col-sm-3">
        <img className="" src={ props.image } alt="product-image"/>
      </div>

      <div className="col-12 col-sm-9">
        <div className="name font-weight-bold">
          {props.name}
        </div>
        <div className="quantity">
          Quantity: {props.quantity}
        </div>
        <div className="price">
            ${(props.price * props.quantity / 100).toFixed(2)}
        </div>
        <div className="short-description">
          {props.shortDescription}
        </div>
      </div>

    </div>

  );
};

export default CartSummaryItem;
