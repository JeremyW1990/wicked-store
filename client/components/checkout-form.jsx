import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCardNumber: '',
      address: ''
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onChangeHandler(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmitHandler(event) {
    event.preventDefault();
    this.props.placeOrder(this.state);
  }
  render() {
    // const { name, creditCardNumber, address } = this.state;
    // const { onChangeHandler, onSubmitHandler } = this;
    return (
      <React.Fragment>
        <h1>Checkout</h1>
      </React.Fragment>
    );
  }
}
