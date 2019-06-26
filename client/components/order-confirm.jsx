import React from 'react';
import CartSummaryItem from './cart-summary-item';

const OrderConfirm = props => {
  const deliverTime = new Date().toDateString();

  return (
    <div>

      <div className="row border">
        <div className="col-sm-6 shipping-info ">
          Shipping Adrress: <br/>
          {props.orderInfo.firstname + props.orderInfo.lastname}<br/>
          {props.orderInfo.address},
          {props.orderInfo.city},
          {props.orderInfo.state}, <br/>
          {props.orderInfo.zip}
        </div>

        <div className="col-sm-6 deliver-info d-flex flex-column">
          <div>Estimate date and time of delivery:</div>
          <div>{ deliverTime }</div>
          <div className="flex-grow-1 d-flex align-items-center justify-content-center">
            <i className="fas fa-truck"></i>

          </div>
        </div>
      </div>

      <div className="col-sm-12">
        Order Summary:
        {props.cart.map(item =>
          <CartSummaryItem key={item.id} {...item } ></CartSummaryItem>
        )}
      </div>

    </div>

  );
};

export default OrderConfirm;
