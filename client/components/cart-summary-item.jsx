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

        <div className="purchase-control d-flex justify-content-around my-4">
          <div className="quantity-controls  d-flex">
            <i className="fas fa-plus-square" onClick={() => props.changeQuantityInCart(props.id, props.quantity + 1)}></i>
            <input className='quantity-input form-control' onChange={e => { props.changeQuantityInCart(props.id, e.target.value); }} value={props.quantity} type="number"/>
            <i className="fas fa-minus-square" onClick={() => props.changeQuantityInCart(props.id, props.quantity - 1)}></i>
          </div>

          <button
            className="btn btn-outline-danger font-weight-bold add-to-cart"
            onClick={ () => props.deleteItemInCart(props.id)}>
            Delete
          </button>
        </div>
      </div>

    </div>

  );
};

export default CartSummaryItem;
