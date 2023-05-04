import './index.css'
import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <div>
      <Header />
      <h1>Find The Job That Fits Your Life</h1>
      <p>
        Millions of people are searching for jobs,salary information,company
        reviews.Find job that fit your abilities and potential
      </p>
      <img
        src="https://assets.ccbp.in/frontend/react-js/home-sm-bg.png"
        alt="website logo"
      />
      <Link to="/jobs">
        <button type="button">Find Jobs</button>
      </Link>
    </div>
  )
}

export default Home
