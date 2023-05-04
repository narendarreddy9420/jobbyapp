import './index.css'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div>
      <img src="https://assets.ccbp.in/frontend/react-js/logo-img.png" alt="" />
      <Link to="/">
        <button type="button">Home</button>
      </Link>
      <Link to="/jobs">
        <button type="button">Jobs</button>
      </Link>
      <button onClick={onLogout} type="button">
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
