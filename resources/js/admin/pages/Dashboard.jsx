import React, { Component } from 'react'

class Dashboard extends Component {
  render() {
    return (
      <>
        <h1 className='text-center'>Welcome</h1>
        <div className='row'>
          <div className='col-sm-12 col-md-4  '>
            <div className='card'>
              <div className='card-body d-flex justify-content-center '>
                <i className='fas fa-money-bill-wave' />
                Cash Flow
              </div>
            </div>
          </div>
          <div className='col-sm-12 col-md-4  '>
            <div className='card'>
              <div className='card-body d-flex justify-content-center'>
                <i className='fas fa-file-invoice-dollar' />
                Invoice
              </div>
            </div>
          </div>
          <div className='col-sm-12 col-md-4  '>
            <div className='card'>
              <div className='card-body d-flex justify-content-center'>
                <i className='fas fa-calculator' />
                Accounting
              </div>
            </div>
          </div>
          <div className='col-sm-12 col-md-4  '>
            <div className='card'>
              <div className='card-body d-flex justify-content-center'>
                <i className='fas fa-chart-area' />
                Reports
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Dashboard
