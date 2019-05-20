import React from 'react';

import Header from './header';
import ProductList from './product-list';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  getProducts() {
    fetch('api/products.php', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(products => {
        this.setState({ products });
      });
  }

  componentDidMount() {
    this.getProducts();
  }
  render() {
    return (
      <div className="app container">
        <Header logo='logo' name='wicked sales'></Header>
        <ProductList { ...this.state }></ProductList>

      </div>

    );
  }

}
