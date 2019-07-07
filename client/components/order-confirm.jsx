import React, { useState } from 'react';

import ConfirmModal from '../functions/modal';

/*
  this component is for rendering order summary page
  including cart and shipping information
*/

const OrderConfirm = props => {

  /*
    use react hook to control the end of demo confirm modal
  */
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  /*
    We filter the cart list again here because there is case that user edit some of products to 0 before they submit
    We don't want to show any 0 quantity here.
    If all the items are 0 quantity, user won't be again to submit and navigate to this page

  */
  const filterCart = props.cart.filter(item => item.quantity > 0);

  return (
    <React.Fragment>
      <button type="button" className="btn btn-outline-dark font-weight-bold mt-4 mb-1 "
        onClick={ () => props.setView('checkout', {})} >
      &lt; Back to Address
      </button>
      <div className="order-confirm border rounded">

        <div className="row  mt-3 ">
          <div className="col-6 shipping-info pl-4">
            <div className="shipping-address-title title font-weight-bold">Shipping Adrress:</div>
            <div className="">

              {props.shippingForm.firstname}{' '} { props.shippingForm.lastname}<br/>
              {props.shippingForm.address},
              {props.shippingForm.city}<br/>
              {props.shippingForm.state} <br/>
              {props.shippingForm.zip}
            </div>
          </div>

          <div className="col-6 deliver-info d-flex flex-column justify-content-between">
            <div className="font-weight-bold deliver-time mt-2">
              <div>
              Estimate delivery time:
              </div>
              <div>
                7 ~ 10 Business Days
              </div>
            </div>
            <i className="fas fa-truck"></i>
          </div>
        </div>

        <hr color='white' className="mt-4"/>

        <div className="col-12 mt-3">
          <div className="order-summary-title title font-weight-bold">
          Order Summary:
          </div>
          <div className=" table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  {window.innerWidth > 415 ? <th scope="col" className="description" >Description</th> : null}
                  <th scope="col">Qty</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>

                {filterCart.map(item => {
                  return (
                    <tr key={item.id}>
                      <th scope="row">
                        <img src={item.image} alt={item.name}/>
                        <div className=''>{item.name}</div>
                      </th>
                      {window.innerWidth > 415 ? <td className="description-cell">{item.shortDescription}</td> : null}
                      <td>{item.quantity}</td>
                      <td>${(item.quantity * item.price / 100).toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="total-price text-right font-weight-bold mr-4">Total Price: {(props.totalPrice / 100).toFixed(2)}</div>
        </div>
        <div className="confirm-button d-flex flex-row-reverse">
          <button
            className="btn btn-outline-dark font-weight-bold m-3"
            onClick={toggle}
          >Confirmed</button>
        </div>
        <ConfirmModal
          title = "Delivering..."
          content = "This is the end of the Demo. Thank you!"
          toggle={toggle}
          modal={modal}
          confirm = {props.placeOrder}
          confirmButton = "OK"
        />

      </div>
    </React.Fragment>
  );
};

export default OrderConfirm;
