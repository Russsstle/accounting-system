import React, { Component } from 'react'
import Chart from 'chart.js'
import autobind from 'autobind-decorator'
import Api from '../../assets/Api'
import { cpus } from 'os'
class Dashboard extends Component {
  state = { data: [], filter: [] }
  async componentDidMount() {
    await this.fetchData()
    const labels = []
    const values = []
    const { data } = this.state
    this.state.filter.forEach(function(items) {
      labels.push(items.name)
      values.push(items.value)
    })
    console.log(this.state.filter)
    console.log(values)
    var ctx = document.getElementById('myChart')
    var coloR = []

    var dynamicColors = function() {
      var r = Math.floor(Math.random() * 255)
      var g = Math.floor(Math.random() * 255)
      var b = Math.floor(Math.random() * 255)
      return 'rgb(' + r + ',' + g + ',' + b + ')'
    }

    labels.forEach(function() {
      coloR.push(dynamicColors())
    })
    console.log(coloR)
    console.log(labels)
    var myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            label: '# of Votes',
            data: values,
            backgroundColor: coloR,
            borderColor: coloR,
            borderWidth: 1
          }
        ]
      },
      options: {
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        }
      }
    })
  }
  @autobind
  async fetchData() {
    const transaction = new Api('transactions')
    const accounts = []
    let total = 0
    try {
      const { data } = await transaction.get()
      this.setState({ data })
      for (const item of data) {
        const index = (index = _.findIndex(accounts, { name: item.account }))
        const value = item.type == 'income' ? item.value : -item.value

        if (index > -1) {
          accounts[index].value += value
        } else {
          accounts.push({ name: item.account, value })
        }

        total += value
      }

      accounts.unshift({
        name: 'All Accounts',
        value: total
      })

      this.setState({
        filter: accounts
      })
      console.log(this.state.filter)
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    return (
      <>
        <div className='row clearfix'>
          <div className='col-sm-12 col-md-4  ' />
          <div className='col-sm-12 col-md-4  '>
            <div className='card'>
              <h1 className='text-center mt-10'>Transactions</h1>
              <div className='card-body d-flex justify-content-center'>
                <canvas id='myChart' width='100' height='100' />
              </div>
            </div>
          </div>
          <div className='w-100' />
          {/* 
          <div className='col-sm-12 col-md-4'>
            <div className='card'>
              <div className='card-body d-flex justify-content-center '>
                <i className='fas fa-money-bill-wave' />
                Cash Flow
              </div>
            </div>
          </div>

          <div className='col-sm-12 col-md-4'>
            <div className='card'>
              <div className='card-body d-flex justify-content-center'>
                <i className='fas fa-file-invoice-dollar' />
                Invoice
              </div>
            </div>
          </div>
          <div className='col-sm-12 col-md-4'>
            <div className='card'>
              <div className='card-body d-flex justify-content-center'>
                <i className='fas fa-calculator' />
                Accounting
              </div>
            </div>
          </div>
          <div className='col-sm-12 col-md-4'>
            <div className='card'>
              <div className='card-body d-flex justify-content-center'>
                <i className='fas fa-chart-area' />
                Reports
              </div>
            </div>
          </div> */}
        </div>
      </>
    )
  }
}

export default Dashboard
