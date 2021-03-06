import React, { Component } from 'react'
import axios from 'axios'
import toStore from '../utils/toStore'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Signin extends Component {
  state = {
    email: '',
    password: '',
    loginError: ''
  }
  handleSubmit = event => {
    event.preventDefault()
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/signin',
      data: {
        email: this.state.email,
        password: this.state.password
      }
    })
      .then(res => {
        toStore('mern_auth_token', res.data.token)
        toStore('mern_auth_user', JSON.stringify(res.data.user))
        this.props.addUser(res.data.user)
        this.props.history.push('/admin')
      })
      .catch(err => {
        this.setState({ loginError: err.message })
      })
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }
  render() {
    return (
      <div className='jumbotron bg-light mt-4'>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              typr='text'
              className='form-control'
              name='email'
              placeholder='Email'
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              typr='password'
              className='form-control'
              name='password'
              placeholder='Password'
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <input
            type='submit'
            className='btn btn-primary btn-block mt-4'
            value='Login'
          />
        </form>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    ...state.UserReducer
  }
}
export default connect(
  mapStateToProps,
  actions
)(Signin)
