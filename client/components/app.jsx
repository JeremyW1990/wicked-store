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

      /*
        State "view" works like router in this app.
        "view" has 5 different key words: "catalog", "details", "cart", "checkout", "order-confirm"
        Each key wrods present a different page.
      */
      view: { view: 'catalog', params: {} }
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

  /* Set view, dispalying different pages.
     An alternative way of react-routers
  */
  setView(name, params) {
    this.setState({ view: { view: name, params } });
  }

  /* hit the endpoint to fetch all the products details */
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

  /* hit the endpoint to send the products to cart */
  addToCart(product, quantity) {
    fetch('api/cart.php', {
      method: 'POST',
      product,
      quantity
    })
    /* When products successlly at backend, update UI according */
      .then(res => {
        let cart = [...this.state.cart];
        /* We need to know if the product is already in the cart or not.
       If it is a new product not existing in the cart yet, we need to creat a new element in array.
       If it exists already, we need to find it in array and update the quantity.
    */
        let newProduct = true;
        cart = cart.map(cartItem => {
          if (cartItem.id === product.id) {
            newProduct = false; // already exists in cart
            return {
              ...cartItem,
              quantity: cartItem.quantity + quantity
            };
          }
          return cartItem;
        });
        if (newProduct) { // a new product not exists in cart yet
          product.quantity = quantity;
          cart = this.state.cart.concat(product);
        }

        /* When products successlly at backend, update UI according */
        this.setState({
          view: { view: 'catalog', params: {} },
          cart
        });
      });
  }

  /* Delete an product with a certain ID in cart */
  deleteItemInCart(id) {
    let cart = this.state.cart.filter(item => {
      if (item.id !== id) return item;
    });

    this.setState({ cart });
  }

  /* Change the quantity of a certain product with ID in cart */
  changeQuantityInCart(id, quantity) {
    /*
      Guard
      we only allow customer buy 99 in a single purchase
    */
    if (quantity < 0 || quantity > 99) return;

    /* find the id, update the quantity  */
    const cart = this.state.cart.map(item => {
      if (item.id !== id) return item;
      return {
        ...item,
        quantity
      };
    });
    this.setState({ cart });
  }

  /*
    When user leave the quantity input field but leave it blank,
    the quantity will be reset to 1
  */
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

  /*
    Update the shipping information from form
  */
  submitShippingForm(shippingForm) {
    this.setState({ shippingForm });
  }

  /*
    End of purchase
    warp user's cart and shipping information together,
    send them to endpoint
  */
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
        /*
          Clear user's shipping information
          Clear user's prodcuts in cart
          Redirect to home page
        */
        this.setState({ shippingForm: {}, cart: [], view: { view: 'catalog', params: {} } });
      });
  }

  /* calculate the total price of products in cart */
  calculateTotalPirce() {
    const totolPrice = this.state.cart.reduce((total, current) => total + parseFloat(current.price * current.quantity), 0);
    return isNaN(totolPrice) || totolPrice === '' ? 0 : totolPrice;
  }

  /* calculate the total items in cart */
  calculateTotalItemsInCart() {
    const totalItems = this.state.cart.reduce((total, current) => total + parseInt(current.quantity), 0);
    return isNaN(totalItems) || totalItems === '' ? 0 : totalItems;
  }

  /* When this page mounted, fetch all the products from endpoint */
  componentDidMount() {
    this.getProducts();
  }

  render() {
    let appRenderCmp;

    /*
      deconstructing here to make render method neat and clean
    */
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

    /*
      render different page according to the view value
    */
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
