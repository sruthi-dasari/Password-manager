import {Component} from 'react'
import './index.css'

class PasswordItem extends Component {
  render() {
    const {passwordDetails} = this.props
    const {website, username, password} = passwordDetails

    const websiteInitialLetter = website[0]

    return (
      <div className="list-item-container">
        <div className="website-profile-container">
          <p>{websiteInitialLetter}</p>
        </div>
        <div className="password-details-container">
          <p className="website-name">{website}</p>
          <p className="user-name">{username}</p>
          <p className="password">{password}</p>
        </div>
      </div>
    )
  }
}

export default PasswordItem
