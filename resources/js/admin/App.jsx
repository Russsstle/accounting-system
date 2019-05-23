import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Navbar from './Navbar'
import Dashboard from './pages/Dashboard'
import Transaction from './pages/Transaction'
// import Expense from './pages/Expense'
// import Income from './pages/Income'

export class Router extends Component {
  // state = {
  //   url: this.props.history.location.pathname
  // }

  // componentDidMount() {
  //   this.props.history.listen(location => {
  //     this.setState({ url: location.pathname })
  //   })
  // }

  render() {
    return (
      <>
        <Navbar />
        <div className='container pb-5' style={{ width: '85%', maxWidth: '100%' }}>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/transaction' component={Transaction} />
          </Switch>
        </div>
      </>
    )
  }
}

export default Router
