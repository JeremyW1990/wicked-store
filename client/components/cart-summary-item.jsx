import React from 'react';

const CartSummaryItem = props => {
  return (

    <div className="border cart-summary-item row">

      <div className="image col-6">
        <img className="" src={ props.image } alt="product-image"/>
      </div>
      <div className="col-6">

        <div className="name font-weight-bold">
          {props.name}
        </div>
        <div className="price">
                    ${(props.price / 100).toFixed(2)}
        </div>
        <div className="short-description">
          {props.shortDescription}
        </div>
      </div>

    </div>

  );
};

export default CartSummaryItem;
