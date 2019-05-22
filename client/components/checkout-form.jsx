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
    const { name, creditCardNumber, address } = this.state;
    const { onChangeHandler, onSubmitHandler } = this;
    return (
      <React.Fragment>
        <h1>Checkout</h1>
        <form onSubmit = {onSubmitHandler}>
          <div className="form-group">
            <label htmlFor="name ">Name</label>
            <input type="text" className="form-control" id="name" placeholder="Name"
              name="name" value={name} onChange={onChangeHandler} />
          </div>
          <div className="form-group">
            <label htmlFor="creditcard">Credit Card</label>
            <input type="number" className="form-control" id="creditcard" placeholder="Credit Card"
              name="creditCardNumber" value={creditCardNumber} onChange={onChangeHandler}/>
          </div>
          <div className="form-group">
            <label htmlFor="shopping_address">Shopping Address</label>
            <textarea className="form-control" id="shopping_address" rows="3"
              name="address" value={address} onChange={onChangeHandler}
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
          >Place Order</button>
        </form>

      </React.Fragment>
    );
  }
}
