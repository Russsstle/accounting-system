import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import autobind from 'autobind-decorator'
import moment from 'moment'

import Api from '../../../assets/Api'
import messages from '../../../strings/messages'
import { parseForm } from '../../../assets/Helper'

export class Form extends Component {
  state = { isLoading: true, id: '', transaction: {}, dateRecord: '' }

  componentDidMount() {
    if (this.props.id) {
      this.fetchData(this.props.id)
    } else {
      this.setState({ isLoading: false })
    }
    console.log(this.props.name)
  }

  @autobind
  async handleSubmit(e) {
    e.preventDefault()

    const transaction = new Api('transactions')
    try {
      if (this.props.id) {
        await transaction.update(this.props.id, parseForm(e.target))
        alert(messages.UPDATE_SUCCESS)
      } else {
        await transaction.add(parseForm(e.target))
        alert(messages.SAVED_SUCCESS)
      }
      this.props.fetchData()
    } catch (err) {
      alert(messages.SERVER_ERROR)
      console.log(err)
    }
  }

  @autobind
  async handleDelete(id) {
    const transaction = new Api('transactions')
    if (confirm('Are you sure to you want to delete it?')) {
      try {
        await transaction.remove(id)
        alert(messages.DELETE_SUCCESS)
        this.props.fetchData()
      } catch (err) {
        console.log(err)
      }
    }
  }

  async fetchData(id = null) {
    this.setState({ isLoading: true })
    if (id) {
      const transaction = new Api('transactions')

      try {
        const { data } = await transaction.find(id)
        this.setState({ transaction: data })
      } catch (err) {
        console.log(err)
        alert(messages.FETCH_FAIL)
      } finally {
        this.setState({ isLoading: false })
      }
    } else {
      setTimeout(() => {
        this.setState({ transaction: {}, isLoading: false })
      })
    }
  }

  render() {
    const { isLoading, transaction } = this.state

    return isLoading ? (
      <div className='spinner-border' role='status'>
        <span className='sr-only'>Loading...</span>
      </div>
    ) : (
      <div>
        <div className='clearfix' style={{ marginTop: 2 }}>
          <h4 className='float-left'>Transaction Details</h4>
          <a className='float-right mr-2' onClick={this.props.handleClose}>
            <i className='fas fa-times fa-lg' />
          </a>
        </div>
        <hr style={{ borderWidth: 2 }} />
        <form onSubmit={this.handleSubmit}>
          <div className='row'>
            <div className='form-group col'>
              <label>Title</label>
              <input
                type='text'
                className='form-control'
                name='title'
                defaultValue={transaction.title}
                required
                // defaultValue={transaction.title}
              />
            </div>
            <div className='w-100' />
            <div className='form-group col'>
              <label>Date</label>
              <input
                type='date'
                className='form-control'
                name='date'
                defaultValue={transaction.date || moment().format('YYYY-MM-DD')}
              />
            </div>
            <div className='form-group col'>
              <label>Type</label>
              <select className='custom-select' name='type' defaultValue={transaction.type}>
                <option value='income'>Income</option>
                <option value='expense'>Expense</option>
              </select>
            </div>
            <div className='w-100' />
            <div className='form-group col'>
              <label>Account</label>
              <input
                list='account'
                className='form-control'
                name='account'
                defaultValue={transaction.account}
                autoComplete='off'
              />
              <datalist id='account'>
                {this.props.accounts.map((item, key) => (
                  <option key={key} value={item}>
                    {item}
                  </option>
                ))}
              </datalist>
              {/* <input type='text' className='form-control' name='account' defaultValue={transaction.account} /> */}
            </div>
            <div className='form-group col'>
              <label>Value</label>
              <input
                type='number'
                className='form-control'
                name='value'
                defaultValue={transaction.value}
                required
              />
            </div>

            <div className='w-100' />
            <div className='form-group col'>
              <label>Description</label>
              <textarea
                className='form-control rounded-0'
                name='description'
                rows='3'
                defaultValue={transaction.description}
              />
            </div>
            <div className='w-100' />
            <div className='form-group col'>
              <button className='btn btn-primary btn-rounded'>
                <i className='fas fa-save' /> Save
              </button>
              {this.props.id ? (
                <button
                  type='button'
                  className='btn btn-primary btn-rounded'
                  onClick={() => this.handleDelete(transaction.id)}
                >
                  <i className='fas fa-trash' /> Delete
                </button>
              ) : (
                <div />
              )}
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default Form
