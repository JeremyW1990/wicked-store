import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const OrderConfirm = props => {

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  let deliverTime = new Date();
  deliverTime.setTime(deliverTime.getTime() + (2 * 24 * 60 * 60 * 1000));
  deliverTime = deliverTime.toLocaleString();

  return (
    <div>

      <div className="row border mt-3 rounded">
        <div className="col-sm-6 shipping-info pl-4">
          <div className="address font-weight-bold">Shipping Adrress:</div>
          <div className="font-weight-bold">

            {props.orderInfo.firstname}{' '} { props.orderInfo.lastname}<br/>
            {props.orderInfo.address},
            {props.orderInfo.city}<br/>
            {props.orderInfo.state} <br/>
            {props.orderInfo.zip}
          </div>
        </div>

        <div className="col-sm-6 deliver-info d-flex flex-column">
          <div className="font-weight-bold deliver-time">
            <div>
              Estimate date and time of delivery:
            </div>
            <div>
              { deliverTime }
            </div>
          </div>
          <i className="fas fa-truck"></i>
        </div>
      </div>

      <div className="col-12 border mt-3 rounded">
        <div className="title-order-summary font-weight-bold">
          Order Summary:
        </div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col" >Item</th>
              <th scope="col" className="description" >Description</th>
              <th scope="col">Qty</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>

            {props.cart.map(item => {
              return (
                <tr key={item.id}>
                  <th scope="row">
                    <img src={item.image} alt={item.name}/>
                    {item.name}

                  </th>
                  <td>{item.shortDescription}</td>
                  <td>{(item.price / 100).toFixed(2)}</td>
                  <td>${(item.quantity * item.price / 100).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="total-price text-right font-weight-bold mr-4">Total Price: {(props.totalPrice / 100).toFixed(2)}</div>
      </div>
      <div className="confirm-button d-flex flex-row-reverse">
        <button
          className="btn btn-outline-dark font-weight-bold mt-3"
          onClick={toggle}
        >Confirmed</button>
      </div>

      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Order delivering...</ModalHeader>
        <ModalBody>
              This is the end of demo. Thank you!
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-outline-dark font-weight-bold" onClick={props.placeOrder}>Ok</button>{' '}
        </ModalFooter>
      </Modal>

    </div>
  );
};

export default OrderConfirm;
