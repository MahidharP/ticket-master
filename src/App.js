import React, { Component } from 'react';
import TicketIndex from '../src/tickets/index'


class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Ticket Master</h1>
        <TicketIndex/>
      </div>
    );
  }
}

export default App;