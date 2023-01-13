import {Component} from 'react'
import './index.css'

class PasswordItem extends Component {
  onDelete = () => {
    console.log('In onDelete()')
    const {passwordDetails, updateList} = this.props
    const {id} = passwordDetails

    updateList(id)
  }

  render() {
    const {passwordDetails, isShowPasswordsActive} = this.props
    const {website, username, password, initialClassName} = passwordDetails

    const websiteInitialLetter = website[0]
    const letterInCapital = websiteInitialLetter.toUpperCase()

    const starsImg = (
      <img
        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
        alt="stars"
        className="stars-img"
      />
    )

    const passwordText = isShowPasswordsActive ? password : starsImg

    return (
      <li className="list-item-container">
        <div className="profile-details-container">
          <div className={`website-profile-container ${initialClassName}`}>
            <p className="letter">{letterInCapital}</p>
          </div>
          <div className="password-details-container">
            <p className="website-name">{website}</p>
            <p className="user-name">{username}</p>
            <p className="password">{passwordText}</p>
          </div>
        </div>

        <button
          className="delete-btn"
          type="button"
          onClick={this.onDelete}
          testid="delete"
        >
          <img
            className="delete-icon"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
          />
        </button>
      </li>
    )
  }
}

export default PasswordItem
