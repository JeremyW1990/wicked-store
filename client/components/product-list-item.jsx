import React from 'react';

const ProductListItem = props => {
  return (

    <div className="product-list-item border col-12 col-sm-4 d-flex" onClick = {() => props.setView('details', props.id)}>
      <div className="border product-item-content overflow-hidden my-auto container">
        <div className="image">
          <img className="mx-auto d-block img-fluid" src={ props.image } alt="product-image"/>
        </div>
        <div className="name font-weight-bold">
          {props.name}
        </div>
        <div className="price">
                    ${props.price}
        </div>
        <div className="short-description">
          {props.shortDescription}
        </div>
      </div>

    </div>

  );
};

export default ProductListItem;
