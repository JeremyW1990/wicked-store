import React from 'react';

import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

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
    this.placeOrder = this.placeOrder.bind(this);
  }

  setView(name, params) {
    this.setState({ view: { view: name, params } });
  }

  getProducts() {
    fetch('api/products.php', { method: 'GET' })
      .then(res => {
        return res.json();
      })
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
        this.setState({
          view: { view: 'catalog', params: {} },
          cart
        });
      });
  }

  placeOrder(orderInfo) {
    const postBody = {
      cart: this.state.cart,
      orderInfo
    };
    fetch('api/orders.php', {
      method: 'POST',
      body: JSON.stringify(postBody)
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ cart: [], view: { view: 'catalog', params: {} } });
      });
  }

  calculateTotalPirce() {
    return this.state.cart.reduce((total, current) => total + parseInt(current.price), 0);
  }
  componentDidMount() {
    this.getProducts();
    this.getCartItems();
  }
  render() {
    let appRenderCmp;
    switch (this.state.view.view) {
      case 'details':
        appRenderCmp = (
          <ProductDetails
            params = { this.state.view.params }
            setView = { this.setView }
            addToCart = { this.addToCart } >
          </ProductDetails>
        );
        break;

      case 'cart' :
        appRenderCmp = (
          <CartSummary
            products = { this.state.cart }
            setView = { this.setView }
            totalPrice = { this.calculateTotalPirce()}
          >
          </CartSummary>
        );
        break;

      case 'checkout':
        appRenderCmp = (
          <CheckoutForm placeOrder={this.placeOrder}/>
        );
        break;

      case 'catalog':
        appRenderCmp = (
          <div className="app container">
            <ProductList { ...this.state } setView = { this.setView } ></ProductList>
          </div>
        );
        break;

      default:
        appRenderCmp = (
          <div>Something went wrong...</div>
        );

    }

    return (
      <div className="app container">
        <Header
          logo='logo'
          name='wicked sales'
          cartItemCount={ this.state.cart.length }
          setView = { this.setView }
        >
        </Header>
        { appRenderCmp }

      </div>
    );
  }

}
