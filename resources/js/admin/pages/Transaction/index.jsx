import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import NumberFormat from 'react-number-format'

import Form from './form'
import Api from '../../../assets/Api'
import numeral from 'numeral'
import messages from '../../../strings/messages'
export class Transactions extends Component {
  form = React.createRef()
  state = {
    formShown: false,
    data: [],
    id: null,
    filter: [],
    table: [],
    accounts: [],
    accountName: 'All Accounts'
  }

  componentDidMount() {
    this.fetchData()
  }

  @autobind
  toggleForm(id = null) {
    this.form.current.fetchData(id)
    // document.documentElement.scrollTop = 0
    this.setState({
      formShown: true,
      id
    })
  }
  @autobind
  async add() {
    const transaction = new Api('transactions')
    await transaction.add()
    // alert(messages.ADDED_SUCCESS)
    this.setState({
      accountName: 'All Accounts'
    })
    this.fetchData()
  }

  @autobind
  async fetchData() {
    const transaction = new Api('transactions')
    const { accountName } = this.state
    const accounts = []
    let total = 0
    const filteredAccounts = []

    try {
      const { data } = await transaction.get()
      this.setState({ data })
      if (_.findIndex(data, { account: accountName }) == -1 || accountName == 'All Accounts') {
        $('select#filter').val('All Accounts')
        this.setState({ table: data })
      } else {
        var selectFilter = await data.filter(function(item) {
          return item.account == accountName
        })
        this.setState({ table: selectFilter })
      }

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

      this.state.data.forEach(function(accountNames) {
        if (!filteredAccounts.includes(accountNames.account)) {
          filteredAccounts.push(accountNames.account)
        }
      })
      this.setState({
        filter: accounts,
        accounts: filteredAccounts
      })
      // console.log(filteredAccounts)
      // console.log(accounts)
      // console.log(data)
      // console.log(this.state.filter)
    } catch (err) {
      console.log(err)
    }
  }

  @autobind
  handleClose() {
    this.setState({ formShown: false })
  }
  @autobind
  async changeAccount(e) {
    const { data } = this.state
    const value = e.target.value
    this.setState({
      accountName: e.target.value
    })
    var selectFilter = await data.filter(function(item) {
      return item.account == value
    })
    this.setState({ table: selectFilter })

    this.fetchData()

    // console.log(this.state.table)
    // alert(this.state.accountName)
  }

  render() {
    const { data, filter, table } = this.state

    return (
      <>
        <div className='clearfix mb-3'>
          <h3 className='float-left m-0 mt-2'>
            <select
              id='filter'
              className='custom-select'
              name='filter'
              onChange={this.changeAccount}
              defaultValue='All Accounts'
            >
              {filter.map((item, key) => (
                <option key={key} value={item.name}>
                  {item.name}
                  {item.value < 0
                    ? ' (₱ ' + numeral(Math.abs(item.value)).format('0,0.00') + ')'
                    : ' ₱ ' + numeral(item.value).format('0,0.00')}
                </option>
              ))}
            </select>
          </h3>
          {/* onClick={() => this.toggleForm()} */}
          <button className='btn btn-primary btn-rounded float-right' onClick={this.add}>
            <i className='fas fa-plus' /> Add
          </button>
        </div>
        <div className='card'>
          <div className='card-body'>
            <div className='row'>
              <div className='col'>
                <div className='table-responsive' style={{ height: 450 }}>
                  <table className='table table-hover' width='100%'>
                    <thead>
                      <tr>
                        <th>Note</th>
                        <th>Value</th>
                        {/* <th style={{ width: 115 }}>Actions</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {table.map((item, key) => (
                        <tr key={key} onClick={() => this.toggleForm(item.id)} style={{ cursor: 'pointer' }}>
                          <td>
                            <h5 className='font-weight-bold'>{item.title || 'Write a Description'}</h5>
                            {item.date} <i>{item.account}</i>
                          </td>
                          <td
                            style={{
                              fontWeight: 'bold',
                              fontSize: 16,
                              color: item.type == 'income' ? '#26de81' : '#777'
                            }}
                          >
                            <NumberFormat
                              value={item.value}
                              displayType={'text'}
                              thousandSeparator={true}
                              prefix={'Php '}
                              decimalScale={2}
                              fixedDecimalScale={true}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className='col col-lg-5' style={{ display: this.state.formShown ? 'block' : 'none' }}>
                <Form
                  ref={this.form}
                  fetchData={this.fetchData}
                  id={this.state.id}
                  handleClose={this.handleClose}
                  accounts={this.state.accounts}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Transactions
