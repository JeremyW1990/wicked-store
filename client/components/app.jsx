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
      cart: [{
        gallery: [
          'https://i.ya-webdesign.com/images/png-dragonite-13.png',
          'https://img.rankedboost.com/wp-content/uploads/2018/10/Dragonite-Pokemon-Lets-GO.png',
          'https://i.pinimg.com/originals/e7/96/ef/e796ef9a767fa96ce1a18d7b8e3bc551.png'],
        id:
                '1',
        image:
                'https://i.pinimg.com/originals/e7/96/ef/e796ef9a767fa96ce1a18d7b8e3bc551.png',
        name:
                'Dragonite',
        price:
                '3000',
        quantity:
                4,
        shortDescription:
                'Dragonite is a draconic, bipedal Pokemon with light orange skin. It has large, grayish-green eyes and a round snout with small nostrils.'
      }],
      orderInfo: {},
      view: { view: 'cart', params: {} } // catalog, details, cart, checkout, order-confirm
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.deleteItemInCart = this.deleteItemInCart.bind(this);
    this.calculateTotalItemsInCart = this.calculateTotalItemsInCart.bind(this);
    this.calculateTotalPirce = this.calculateTotalPirce.bind(this);
    this.changeQuantityInCart = this.changeQuantityInCart.bind(this);
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

  addToCart(product, quantity) {
    fetch('api/cart.php', {
      method: 'POST',
      product,
      quantity
    })
      .then(res => {
        let cart = [...this.state.cart];
        let newProduct = true;
        cart = cart.map(cartItem => {
          if (cartItem.id === product.id) {
            newProduct = false;
            return {
              ...cartItem,
              quantity: cartItem.quantity + quantity
            };
          }
          return cartItem;
        });
        if (newProduct) {
          product.quantity = quantity;
          cart = this.state.cart.concat(product);
        }
        this.setState({
          view: { view: 'catalog', params: {} },
          cart
        });
      });
  }

  deleteItemInCart(id) {
    let cart = this.state.cart.filter(item => {
      if (item.id !== id) return item;
    });

    this.setState({ cart });
  }

  changeQuantityInCart(id, quantity) {
    if (quantity === '') { quantity = 0; }
    if ((quantity >= 0 && quantity <= 99)) {
      const cart = this.state.cart.map(item => {
        if (item.id !== id) return item;
        return {
          ...item,
          quantity
        };
      });
      this.setState({ cart });
    }
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
    const { products, cart, orderInfo, view } = this.state;
    const { setView, calculateTotalPirce, calculateTotalItemsInCart, placeOrder, addToCart, changeQuantityInCart, deleteItemInCart } = this;

    switch (view.view) {
      case 'details':
        appRenderCmp = (
          <ProductDetails
            params = { view.params }
            setView = { setView }
            addToCart = { addToCart } >
          </ProductDetails>
        );
        break;

      case 'cart' :
        appRenderCmp = (
          <CartSummary
            products = { cart }
            setView = { setView }
            totalPrice = { calculateTotalPirce()}
            changeQuantityInCart = {changeQuantityInCart}
            deleteItemInCart = {deleteItemInCart}
          >
          </CartSummary>
        );
        break;

      case 'checkout':
        appRenderCmp = (
          <CheckoutForm placeOrder={placeOrder}/>
        );
        break;

      case 'catalog':
        appRenderCmp = (
          <ProductList products = { products } setView = { setView } ></ProductList>
        );
        break;

      case 'order-confirm':
        appRenderCmp = (
          <ConfirmOrder orderInfo={orderInfo} cart={ cart} ></ConfirmOrder>
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
          cartItemCount={ calculateTotalItemsInCart() }
          setView = { setView }/>
        <div className="store">
          { appRenderCmp }
        </div>
      </div>
    );
  }

}
