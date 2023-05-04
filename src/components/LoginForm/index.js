import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class LoginForm extends Component {
  state = {username: '', password: '', isErrorPresent: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  getSuccessCode = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMessage => {
    this.setState({errorMsg: errorMessage, isErrorPresent: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.getSuccessCode(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, isErrorPresent, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div>
        <form onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt=""
          />
          <label htmlFor="USERNAME">USERNAME</label>
          <input
            onChange={this.onChangeUsername}
            value={username}
            id="USERNAME"
            placeholder="USERNAME"
            type="text"
          />
          <label htmlFor="password">PASSWORD</label>
          <input
            onChange={this.onChangePassword}
            value={password}
            id="password"
          />
          <button type="submit">Login</button>
          {isErrorPresent && <p>{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
