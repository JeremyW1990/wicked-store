import React from 'react';

import Carousel from './carousel';

class ProductDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      product: null

    };
  }

  componentDidMount() {
    fetch(`api/products.php?id=${this.props.params}`, {
      method: 'GET'

    })
      .then(res => res.json())
      .then(res => {
        const product = res[0];
        if (product.gallery !== null) {
          product.gallery = [...product.gallery.split(',')];
        }
        this.setState({ product });
      })
      .catch(error => error);
  }

  render() {

    let productDetailsDOM = <div>No product detail shown.</div>;
    if (this.state.product) {
      productDetailsDOM = (
        <div className="product-details">
          <button type="button" className="btn btn-outline-dark font-weight-bold ml-3"
            onClick={ () => this.props.setView('catalog', {})} >&lt; Back to catalog</button>
          <div className="border">
            <div className="row">
              <div className="col-sm-6">
                { this.state.product.gallery !== null
                  ? <Carousel images={this.state.product.gallery}/>
                  : <img className="mx-auto img-fluid" src={ this.state.product.image } alt="product-image"/> }
              </div>

              <div className="col-sm-6 basic-info d-flex flex-column">
                <div className="name font-weight-bold ">
                  {this.state.product.name}
                </div>
                <div className="price">
                  <b>Price:</b> ${(this.state.product.price / 100).toFixed(2)}
                </div>
                <div className="short-description">
                  <b>Description:</b> {this.state.product.shortDescription}
                </div>

                <button
                  className="btn btn-success add-to-cart"
                  onClick={ () => this.props.addToCart(this.state.product)}>
                  Add to Cart
                </button>

              </div>

            </div>

            <div className="long-description col-12 mt-3">
              {this.state.product.longDescription}
            </div>
          </div>
        </div>
      );
    }
    return productDetailsDOM;
  }

}

export default ProductDetails;
