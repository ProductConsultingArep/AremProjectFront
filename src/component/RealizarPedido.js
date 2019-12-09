import React, { Component } from 'react';
import axios from 'axios';
import Form from './Form';

const baseUrl = "https://pedidos-justybueno-backend.herokuapp.com/"

export class RealizarPedido extends Component {

  state = {
    products: []
  }

  componentDidMount() {
    axios.get(baseUrl + '/productos')
    .then(res => {
      const products = res.data;
      this.setState({ products });
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    const listProductos=this.state.products.map(producto => 
      <li key={producto.id}>
        <div>{producto.nombre}</div>
        <div>{producto.descripcion}</div>
        <div>{producto.precio}</div>
        
      </li>
      );
    return (
      <div id="page" className="container">
        <nav className="navbar">
          <div className="navbar-brand">
            <span className="navbar-item"><h4>Justo & Bueno. Realiza tus pedidos!</h4></span>
          </div>
        </nav>
        <hr />
          <div className="questionArea">
            <h5>Productos</h5>
            <ul>
              {listProductos}
            </ul>
          </div>
        <p>Si tienes alguna duda llama a tu supervisor (Centro de distribucion). +57 5266288038</p>
        {/*<p id="phone"><img src={WhatsApp}  />+57 5266288038</p>*/}

        <br/><h4><span>Formulario</span></h4> <hr />
        <Form></Form> 
      </div>
    );
  }
  scrollToMyRef = () => window.scrollTo(0, this.myRef.offsetTop)
}