import React from 'react';

const CartSummaryItem = props => {
  return (

    <div className="border rounded cart-summary-item row mt-2">

      <div className="image col-4">
        <img className="" src={ props.image } alt="product-image"/>
      </div>

      <div className="col-8 item-info">
        <div className="name font-weight-bold"
          onClick={() => { props.setView('details', props.id); }}
        >
          {props.name}
        </div>
        <div className="quantity">
          <b>Quantity:</b> {props.quantity}
        </div>
        <div className="price">
          <b>Price:</b> ${(props.price * props.quantity / 100).toFixed(2)}
        </div>
        <div className="description">
          <b>Description:</b> {props.shortDescription}
        </div>

        <div className="purchase-control d-flex justify-content-around align-items-center my-4">
          <div className="quantity-controls d-flex">
            <i className="fas fa-minus-square" onClick={() => props.changeQuantityInCart(props.id, props.quantity - 1)}></i>
            <input className='quantity-input form-control' onChange={e => { props.changeQuantityInCart(props.id, e.target.value); }} value={props.quantity} type="number"/>
            <i className="fas fa-plus-square" onClick={() => props.changeQuantityInCart(props.id, props.quantity + 1)}></i>
          </div>

          <button
            className="btn btn-outline-danger font-weight-bold"
            onClick={ () => props.deleteItemInCart(props.id)}>
            Delete
          </button>
        </div>
      </div>

    </div>

  );
};

export default CartSummaryItem;
