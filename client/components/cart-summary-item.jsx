import React, { useState } from 'react';

import ConfirmModal from '../functions/modal';

const CartSummaryItem = props => {

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  const removeItemConfirm = () => {
    props.deleteItemInCart(props.id);
    setModal(false);
  };

  return (

    <div className="border rounded cart-summary-item row mt-2 pb-2">

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
            <input className='quantity-input form-control'
              onChange={e => { props.changeQuantityInCart(props.id, e.target.value); }}
              onBlur = { e => { props.quantityOnBlurHander(props.id, e.target.value); }}
              value={props.quantity} type="number"/>
            <i className="fas fa-plus-square" onClick={() => props.changeQuantityInCart(props.id, props.quantity + 1)}></i>
          </div>

          <button
            className="btn btn-outline-danger font-weight-bold"
            onClick={() => setModal(true)}>
            Delete
          </button>
        </div>

        <ConfirmModal
          title = "Item Remove Confirm"
          content = "You sure you want to remove this item from cart?"
          toggle={toggle}
          modal={modal}
          confirm = {removeItemConfirm}
          confirmButton = "Remove"/>
      </div>

    </div>

  );
};

export default CartSummaryItem;
