import React, { Component } from 'react';
import axios from 'axios';
import Form from './Form';

const baseUrl = "http://localhost:8080"

class App extends Component {

  state = {
    products: []
  }

  componentDidMount() {
    axios.get(baseUrl + '/all-products')
    .then(res => {
      const products = res.data;
      this.setState({ products });
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {

    return (
      <div id="page" className="container">
        <nav className="navbar">
          <div className="navbar-brand">
            <span className="navbar-item"><h4>Solicitud Pedido JUSTO Y BUENO</h4></span>
          </div>
        </nav>
        <hr />
        <h5>Reliza tus Solicitudes</h5>
          <div className="questionArea">
            get products
           {/*  {this.state.products.map(product => (
              <Question
                product={product.product}
              >
                {product.answer}
               </Question> 
            ))} */}
          </div>
        <p>Si tienes alguna duda llama a tu supervisor (Centro de distribucion)</p>
        <p id="phone"><img /* src={WhatsApp} */ />+57 5266288038</p>

        <h4><span>Forma</span></h4> <hr />
        <Form></Form> 
      </div>
    );
  }
  scrollToMyRef = () => window.scrollTo(0, this.myRef.offsetTop)
}


export default App;
