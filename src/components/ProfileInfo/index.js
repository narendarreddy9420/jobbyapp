import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'

class ProfileInfo extends Component {
  state = {profileInfo: {}}

  componentDidMount() {
    this.getResults()
  }

  getResults = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const each = data.profile_details
      const fetchedData = {
        name: each.name,
        profileUrl: each.profile_image_url,
        shortBio: each.short_bio,
      }
      this.setState({profileInfo: fetchedData})
    }
  }

  render() {
    const {profileInfo} = this.state
    const {profileUrl, name, shortBio} = profileInfo
    return (
      <div>
        <img src={profileUrl} alt="" />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }
}

export default ProfileInfo
