import React from 'react';

const Header = props => {
  return (
    <div className="header border">
      <div className="logo">
      </div>
      <div className="name font-weight-bolder">
        { props.name }
      </div>

    </div>
  );
};

export default Header;
