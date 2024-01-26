import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {
    username: '',
    password: '',
    ErrorMsg: '',
    invalid: false,
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onClickLogin = async event => {
    const {username, password} = this.state
    event.preventDefault()
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok === true) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      this.setState({
        username: '',
        password: '',
        ErrorMsg: '',
        invalid: false,
      })
      const {history} = this.props

      history.replace('/')
    } else {
      this.setState({
        ErrorMsg: data.error_msg,
        invalid: true,
      })
    }
  }

  render() {
    const {invalid, ErrorMsg} = this.state

    return (
      <div className="login-container">
        <img
          src="https://res.cloudinary.com/dvvhafkyv/image/upload/v1706263034/Ellipse_99login_mobile_book_image_x4czju.png"
          alt="mobile book"
          className="mobile_book_image"
        />
        <img
          src="
https://res.cloudinary.com/dvvhafkyv/image/upload/v1706262868/Rectangle_1467login_desktop_book_img_xsp5sy.png
"
          alt="desktop book"
          className="desktop_book_image"
        />
        <div className="login-bottom-container">
          <form className="form-container" onSubmit={this.onClickLogin}>
            <img
              src="https://res.cloudinary.com/dvvhafkyv/image/upload/v1706263202/Group_7732book_hub_logo_ogos6t.png"
              alt="app-logo"
              className="mobile_app_logo"
            />
            <label htmlFor="username" className="username-label">
              Username*
            </label>
            <input
              id="username"
              type="text"
              className="username-input"
              onChange={this.onChangeUsername}
            />
            <label htmlFor="password" className="username-label">
              Password*
            </label>
            <input
              id="password"
              type="password"
              className="username-input"
              onChange={this.onChangePassword}
            />
            {invalid ? <p className="error-msg">{ErrorMsg}</p> : null}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
