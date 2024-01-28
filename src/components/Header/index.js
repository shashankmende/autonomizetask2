import {Component} from 'react'
import {Link, withRouter, NavLink} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  state = {showNavigationBar: false}

  onClickMenu = () => {
    this.setState(prevState => ({
      showNavigationBar: !prevState.showNavigationBar,
    }))
  }

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  onClickClose = () => {
    this.setState(prevState => ({
      showNavigationBar: !prevState.showNavigationBar,
    }))
  }

  render() {
    const {showNavigationBar} = this.state
    return (
      <>
        <div className="header">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dvvhafkyv/image/upload/v1706263202/Group_7732book_hub_logo_ogos6t.png"
              alt="website logo"
              className="web-logo"
            />
          </Link>
          <img
            src="https://res.cloudinary.com/dvvhafkyv/image/upload/v1706320721/menu_lqcq4c.png"
            alt="menu"
            className="ham-menu"
            onClick={this.onClickMenu}
          />
          <ul className="large-device-navigation-container">
            <li className="home">
              <NavLink to="/" activeStyle={{color: 'blue'}}>
                Home
              </NavLink>
            </li>
            <li className="bookshelves">
              <NavLink to="/shelf" activeStyle={{color: 'blue'}}>
                Bookshelves
              </NavLink>
            </li>
            <button
              type="button"
              className="logout-button"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </ul>
        </div>
        {showNavigationBar ? (
          <div className="navigation-container">
            <p className="home">
              <NavLink to="/" activeStyle={{color: 'blue'}}>
                Home
              </NavLink>
            </p>
            <p className="bookshelves">
              <Link to="/shelf" activeStyle={{color: 'blue'}}>
                Bookshelves
              </Link>
            </p>
            <button
              type="button"
              className="logout-button"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
            <button
              type="button"
              className="close-button"
              onClick={this.onClickClose}
            >
              <img
                src="https://res.cloudinary.com/dvvhafkyv/image/upload/v1706322185/Solidcroos-symbol_sfl0wy.png"
                alt="cross-mark"
              />
            </button>
          </div>
        ) : null}
      </>
    )
  }
}

export default withRouter(Header)
