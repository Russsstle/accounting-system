import React, { Component } from 'react'
import { withRouter, Link, NavLink } from 'react-router-dom'
import autobind from 'autobind-decorator'

export class Navbar extends Component {
  componentDidMount() {
    Waves.attach('.nav-link')
    Waves.attach('.navbar-brand')
    Waves.attach('.dropdown-item')
  }

  render() {
    return (
      <div>
        <nav
          className='navbar navbar-expand-lg navbar-dark default-color bg-primary shadow'
          style={{ marginBottom: 20 }}
        >
          <a className='navbar-brand' href='#'>
            Accounting System
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon' />
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav'>
              <li className='nav-item '>
                <NavLink className='nav-link' to='/'>
                  Home <span className='sr-only'>(current)</span>
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/transaction'>
                  Transaction
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

export default withRouter(Navbar)
