import React from 'react';

const Header = props => {
  return (
    <div className="header border d-flex align-items-center">

      <div className="logo">

      </div>
      <div className="title ">
        { props.name }
      </div>

      <div className="ml-auto d-flex align-items-center font-weight-bol">
        <div className="cart-item-count ">
          { props.cartItemCount }
        </div>
        <i className="fas fa-cart-plus" onClick={() => props.setView('cart', {})}></i>
      </div>

    </div>
  );
};

export default Header;
