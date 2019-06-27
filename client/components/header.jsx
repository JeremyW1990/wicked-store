import React from 'react';

const Header = props => {
  return (
    <div className="header d-flex align-items-center">

      <div className="logo">
      </div>

      <div className="title">
        { props.name }
      </div>

      <div className="cart-btn ml-auto d-flex align-items-center font-weight-bold btn btn-outline-dark font-weight-bold"
        onClick={() => props.setView('cart', {})}>
        <i className="fas fa-cart-plus" ></i>
        <div className="cart-item-count ">
          Items { props.cartItemCount }
        </div>
      </div>

    </div>
  );
};

export default Header;
