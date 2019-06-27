import React from 'react';
import { Col, Row, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInputValid: {
        // use status 'null' here to present 'not-touched'
        // 'null' will not trigger input validation
        firstnameValid: null,
        lastnameValid: null,
        addressValid: null,
        cityValid: null,
        stateValid: null,
        zipValid: null,
        checkBoxValid: null
      },
      formValue: {
        firstname: '',
        lastname: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        checkBox: false
      },
      formValidated: false
    };
    this.validationRules = {
      firstname: { required: true },
      lastname: { required: true },
      address: { required: true },
      city: { required: true },
      state: { required: true },
      zip: {
        required: true,
        length: 5
      }

    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onChangeHandler(event) {
    const filed = event.target.name;

    if (filed === 'check') {
      this.setState({
        ...this.state,
        formValue: {
          ...this.state.formValue,
          checkBox: !this.state.formValue.checkBox
        },
        isInputValid: {
          ...this.state.isInputValid,
          checkBoxValid: !this.state.formValue.checkBox
        }
      });
      return;
    }

    this.setState({
      ...this.state,
      formValue: {
        ...this.state.formValue,
        [filed]: event.target.value
      }

    }, () => {
      this.setState({
        ...this.state,
        isInputValid: {
          ...this.state.isInputValid,
          [filed + 'Valid']: this.isFieldValidated(filed)
        }
      });
    });
  }

  onSubmitHandler(event) {
    event.preventDefault();
    if (this.isFormValidated()) {
      this.props.setView('order-confirm', {});
    }

  }

  isFieldValidated(field) {
    if (this.validationRules[field]['required'] && this.state.formValue[field].trim() === '') return false;
    if (this.validationRules[field]['length'] && this.state.formValue[field].trim().length !== this.validationRules[field]['length']) return false;

    return true;
  }

  isFormValidated() {
    const isInputValid = { ...this.state.isInputValid };
    let formValidated = true;
    for (const field in this.state.isInputValid) {
      if (!this.state.isInputValid[field]) { // whenever it is null or false, we think the input is invalid
        isInputValid[field] = false;
        formValidated = false;
      }
    }

    this.setState({ isInputValid, formValidated });
    return formValidated;
  }
  render() {
    const { firstname, lastname, address, city, state, zip, checkBox } = this.state.formValue;
    const { onChangeHandler, onSubmitHandler } = this;
    const { firstnameValid, lastnameValid, addressValid, cityValid, stateValid, zipValid, checkBoxValid } = this.state.isInputValid;
    return (
      <React.Fragment>
        <h1>Checkout</h1>

        <Form>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input
                  value={firstname}
                  invalid = {firstnameValid === false}
                  type="text"
                  name="firstname"
                  id="firstName"
                  placeholder="First name"
                  onChange={onChangeHandler}/>
                {firstnameValid === false ? <FormFeedback>First Name is required</FormFeedback> : null}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input
                  value={lastname}
                  invalid = {lastnameValid === false}
                  type="text" name="lastname" id="lastName" placeholder="Last name"
                  onChange={onChangeHandler} />
                {lastnameValid === false ? <FormFeedback>Last Name is required</FormFeedback> : null}
              </FormGroup>

            </Col>
          </Row>
          <FormGroup>
            <Label for="Address">Address</Label>
            <Input
              value={address}
              invalid = {addressValid === false}
              type="text" name="address" id="Address" placeholder="1234 Main St"
              onChange={onChangeHandler}/>
            {addressValid === false ? <FormFeedback>Address is required</FormFeedback> : null}
          </FormGroup>

          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="City">City</Label>
                <Input
                  value={city}
                  invalid = {cityValid === false}
                  type="text" name="city" id="City"
                  onChange={onChangeHandler}/>
                {cityValid === false ? <FormFeedback>City is required</FormFeedback> : null}
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="State">State</Label>
                <Input
                  value={state}
                  invalid = {stateValid === false}
                  type="text" name="state" id="State"
                  onChange={onChangeHandler}/>
                {stateValid === false ? <FormFeedback>State is required</FormFeedback> : null}
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label for="Zip">Zip</Label>
                <Input
                  value={zip}
                  invalid = {zipValid === false}
                  type="number" name="zip" id="Zip"
                  onChange={onChangeHandler}/>
                {zipValid === false ? <FormFeedback>{zip.trim() === '' ? 'Zip is required' : 'Zip has to be 5 digital length'}</FormFeedback> : null}
              </FormGroup>
            </Col>
          </Row>
          <FormGroup check>
            <Input invalid = {checkBoxValid === false} checked={checkBox} type="checkbox" name="check" id="Check" onChange={onChangeHandler}/>
            <Label for="Check" check>I understand that my personal information above will not be saved or sent.</Label>
          </FormGroup>
          <button className=" btn btn-outline-dark font-weight-bold" onClick={onSubmitHandler}>Next</button>
        </Form>
      </React.Fragment>
    );
  }
}
