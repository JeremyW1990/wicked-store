import React from 'react';

import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      view: { view: 'catalog', params: {} },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  setView(name, params) {
    this.setState({ view: { view: name, params } });
  }

  getProducts() {
    fetch('api/products.php', { method: 'GET' })
      .then(res => res.json())
      .then(products => {
        this.setState({ products });
      });
  }

  getCartItems() {
    fetch('api/cart.php', { method: 'GET' })
      .then(res => res.json())
      .then(cart => {
        this.setState({ cart });
      });
  }

  addToCart(product) {
    fetch('api/cart.php', {
      method: 'POST',
      product
    })
      .then(res => {
        const cart = this.state.cart.concat(product);
        this.setState({ cart });
      });
  }

  componentDidMount() {
    this.getProducts();
    this.getCartItems();
  }
  render() {
    // [ setView ] = this;
    let appRenderCmp = (
      <div className="app container">
        <ProductList { ...this.state } setView = { this.setView } ></ProductList>
      </div>
    );

    if (this.state.view.view !== 'catalog') {
      appRenderCmp = (
        <ProductDetails
          params = { this.state.view.params }
          setView = { this.setView }
          addToCart = { this.addToCart } >
        </ProductDetails>
      );
    }
    return (
      <div className="app container">
        <Header
          logo='logo'
          name='wicked sales'
          cartItemCount={ this.state.cart.length }>
        </Header>
        { appRenderCmp }

      </div>
    );
  }

}
