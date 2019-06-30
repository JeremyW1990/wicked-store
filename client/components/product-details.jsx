import React from 'react';
import Carousel from './carousel';

class ProductDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      product: null,
      quantity: 1
    };
    this.quantityChangeHanlder = this.quantityChangeHanlder.bind(this);
  }

  quantityChangeHanlder(quantity) {
    if (quantity >= 0 && quantity <= 99) {
      this.setState({ quantity });
    }
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

    const { quantity, product } = this.state;
    const { quantityChangeHanlder } = this;

    let productDetailsDOM = <div>No product detail shown.</div>;
    if (this.state.product) {
      productDetailsDOM = (
        <div className="product-details">
          <button type="button" className="btn btn-outline-dark font-weight-bold mt-4 mb-1 "
            onClick={ () => this.props.setView('catalog', {})} >
              &lt; Back to catalog
          </button>

          <div className="border rounded">
            <div className="row">
              <div className="col-sm-6">
                { this.state.product.gallery !== null
                  ? <Carousel images={this.state.product.gallery}/>
                  : <img className="mx-auto img-fluid" src={ product.image } alt="product-image"/> }
              </div>

              <div className="col-sm-6 basic-info d-flex flex-column ">
                <div
                  className="name font-weight-bold">
                  {product.name}
                </div>
                <div className="price">
                  <b>Price:</b> ${(product.price / 100).toFixed(2)}
                </div>
                <div className="description">
                  <b>Description:</b> {product.shortDescription}
                </div>

                <div className="purchase-control d-flex justify-content-around align-items-center mb-2">
                  <div className="quantity-controls d-flex">
                    <i className="fas fa-minus-square" onClick={() => quantityChangeHanlder(quantity - 1)}></i>
                    <input className='quantity-input form-control' onChange={e => { quantityChangeHanlder(e.target.value); }} value={quantity} type="number"/>
                    <i className="fas fa-plus-square" onClick={() => quantityChangeHanlder(quantity + 1)}></i>
                  </div>

                  <button
                    disabled = {quantity <= 0}
                    className="btn btn-outline-dark font-weight-bold add-to-cart-btn"
                    onClick={ () => this.props.addToCart(product, quantity)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return productDetailsDOM;
  }

}

export default ProductDetails;
