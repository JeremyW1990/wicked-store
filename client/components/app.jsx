import React from 'react';

import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import ConfirmOrder from './order-confirm';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cart: [],
      orderInfo: {},
      view: { view: 'catalog', params: {} } // catalog, details, cart, checkout, order-confirm
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
      }
      )
      .then(products => {
        this.setState({ products });
      });
  }

  addToCart(product) {
    fetch('api/cart.php', {
      method: 'POST',
      product
    })
      .then(res => {
        let cart = [...this.state.cart];
        let newProduct = true;
        cart = cart.map(cartItem => {
          if (cartItem.id === product.id) {
            newProduct = false;
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1
            };
          }
          return cartItem;
        });
        if (newProduct) {
          product.quantity = 1;
          cart = this.state.cart.concat(product);
        }
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
        this.setState({ orderInfo, view: { view: 'order-confirm', params: {} } });
      });
  }

  calculateTotalPirce() {
    return this.state.cart.reduce((total, current) => total + parseFloat(current.price * current.quantity), 0);
  }

  calculateTotalItemsInCart() {
    return this.state.cart.reduce((total, current) => total + parseInt(current.quantity), 0);
  }
  componentDidMount() {
    this.getProducts();
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
          <ProductList { ...this.state } setView = { this.setView } ></ProductList>
        );
        break;

      case 'order-confirm':
        appRenderCmp = (
          <ConfirmOrder orderInfo={this.state.orderInfo} cart={this.state.cart} ></ConfirmOrder>
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
          name="Jeremy's Wicked-Store"
          cartItemCount={ this.calculateTotalItemsInCart() }
          setView = { this.setView }/>
        { appRenderCmp }
      </div>
    );
  }

}
