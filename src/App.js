import React, { Component } from 'react';
import {RealizarPedido} from './component/RealizarPedido.js';
import Tabs from './component/Tabs.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {

  render() {
    const RealizarPedidoView = () => (
      <React.Fragment>
        <RealizarPedido/>
      </React.Fragment>
    );

    const PedidoSolicitadosView = () => (
      <React.Fragment>
        <RealizarPedido/>
      </React.Fragment>
    );

    const TabsView = () => (
      <React.Fragment>
        <Tabs/>
      </React.Fragment>
    );

    return (
      <Router>
        <Switch>
          <Route exact path="/" component={TabsView} />
          <Route exact path="/solicitar" component={RealizarPedidoView} />
          <Route exact path="/pedidos" component={PedidoSolicitadosView} />
        </Switch>
    </Router>
    );
  }
}

export default App;
