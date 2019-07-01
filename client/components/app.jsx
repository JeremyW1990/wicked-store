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
      shippingForm: {},
      view: { view: 'catalog', params: {} } // catalog, details, cart, checkout, order-confirm
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.deleteItemInCart = this.deleteItemInCart.bind(this);
    this.calculateTotalItemsInCart = this.calculateTotalItemsInCart.bind(this);
    this.calculateTotalPirce = this.calculateTotalPirce.bind(this);
    this.changeQuantityInCart = this.changeQuantityInCart.bind(this);
    this.submitShippingForm = this.submitShippingForm.bind(this);
    this.quantityOnBlurHander = this.quantityOnBlurHander.bind(this);
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

  quantityOnBlurHander(id, quantity) {
    if (quantity === '') {
      const cart = this.state.cart.map(item => {
        if (item.id !== id) return item;
        return {
          ...item,
          quantity: 1
        };
      });
      this.setState({ cart });
    }
  }

  submitShippingForm(shippingForm) {
    this.setState({ shippingForm });
  }

  placeOrder() {
    const postBody = {
      cart: this.state.cart,
      shippingForm: this.state.shippingForm
    };
    fetch('api/orders.php', {
      method: 'POST',
      body: JSON.stringify(postBody)
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ shippingForm: {}, cart: [], view: { view: 'catalog', params: {} } });
      });
  }

  calculateTotalPirce() {
    const totolPrice = this.state.cart.reduce((total, current) => total + parseFloat(current.price * current.quantity), 0);
    return isNaN(totolPrice) || totolPrice === '' ? 0 : totolPrice;
  }

  calculateTotalItemsInCart() {
    const totalItems = this.state.cart.reduce((total, current) => total + parseInt(current.quantity), 0);
    return isNaN(totalItems) || totalItems === '' ? 0 : totalItems;

  }
  componentDidMount() {
    this.getProducts();
  }

  render() {
    let appRenderCmp;
    const { products, cart, shippingForm, view } = this.state;
    const {
      setView,
      calculateTotalPirce,
      calculateTotalItemsInCart,
      placeOrder,
      addToCart,
      changeQuantityInCart,
      deleteItemInCart,
      submitShippingForm,
      quantityOnBlurHander
    } = this;

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
            quantityOnBlurHander = {quantityOnBlurHander}
          >
          </CartSummary>
        );
        break;

      case 'checkout':
        appRenderCmp = (
          <CheckoutForm
            setView = {setView}
            submitShippingForm = {submitShippingForm}
            shippingForm = {shippingForm}
          >
          </CheckoutForm>
        );
        break;

      case 'catalog':
        appRenderCmp = (
          <ProductList
            products = { products }
            setView = { setView }>
          </ProductList>
        );
        break;

      case 'order-confirm':
        appRenderCmp = (
          <ConfirmOrder
            shippingForm={shippingForm}
            cart={cart}
            view={view}
            setView = {setView}
            placeOrder = {placeOrder}
            totalPrice = { calculateTotalPirce()}
          ></ConfirmOrder>
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
