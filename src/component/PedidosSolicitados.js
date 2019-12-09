import React from 'react';
import axios from 'axios';
import PedidoCard from './PedidoCard.js'

const baseUrl = "https://pedidos-justybueno-backend.herokuapp.com/"


export default class PedidosSolicitados extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      pedidos:  []
    }
  }

  componentDidMount(){
    axios.get(baseUrl + '/pedidos')
    .then(res => {
      const pedidosGet = res.data;
      this.setState({
        pedidos: pedidosGet
      })
    })
    .catch(error => {
      console.log(error);
    });
  }

  

  render(){
    const listPedidos = this.state.pedidos.map(p =>
      <PedidoCard key={p.id}
        id = {p.id}
        estado = {p.estado}
        descripcion = {p.descripcion}
        ordenes = {p.ordenes}>
      </PedidoCard>
    );
    return(
      <React.Fragment>
        {listPedidos}
      </React.Fragment>
    );
  };
}