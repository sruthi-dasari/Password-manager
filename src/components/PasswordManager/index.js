import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import PasswordItem from '../PasswordItem'

class PasswordManager extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordsList: [],
    isPasswordAdded: false,
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onAdd = () => {
    console.log('In onAdd()')
    const {website, username, password} = this.state

    const newPassword = {
      id: uuidv4(),
      website,
      username,
      password,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      website: '',
      username: '',
      password: '',
      isPasswordAdded: true,
    }))
  }

  render() {
    const {passwordsList, isPasswordAdded} = this.state

    const showPasswords = (
      <ul className="show-passwords-container">
        {passwordsList.map(eachPassword => (
          <PasswordItem passwordDetails={eachPassword} key={eachPassword.id} />
        ))}
      </ul>
    )

    const noPasswords = (
      <div className="no-passwords-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          alt="no passwords"
          className="no-passwords-img"
        />
        <h1 className="no-passwords-text">No Passwords</h1>
      </div>
    )

    const showOrNoPasswords = isPasswordAdded ? showPasswords : noPasswords

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo-img"
        />
        <div className="password-entry-outer-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-manager-img"
          />
          <div className="password-entry-inner-container">
            <h1 className="entry-heading">Add New Password</h1>
            <form className="form-container" onSubmit={this.onAdd}>
              <div className="input-container">
                <div className="icon-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="icon"
                  />
                </div>

                <hr className="seperator" />
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="input-box"
                  onChange={this.onChangeWebsite}
                />
              </div>
              <div className="input-container">
                <div className="icon-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="icon"
                  />
                </div>
                <hr className="seperator" />
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="input-box"
                />
              </div>
              <div className="input-container">
                <div className="icon-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="icon"
                  />
                </div>
                <hr className="seperator" />
                <input
                  type="text"
                  placeholder="Enter Password"
                  className="input-box"
                />
              </div>
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
          </div>
        </div>
        <div className="passwords-container">
          <div className="password-count-and-search-container">
            <div className="password-count-container">
              <p className="count-title">Your passwords</p>
              <div className="count-container">
                <p className="count">0</p>
              </div>
            </div>
            <div className="search-container">
              <div className="icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="icon"
                />
              </div>

              <hr className="seperator" />
              <input
                type="search"
                className="search-input"
                placeholder="Search"
              />
            </div>
          </div>
          <hr className="color-seperator" />
          <div className="checkbox-container">
            <input type="checkbox" id="show-password" className="check-box" />
            <label htmlFor="show-password" className="show-passwords-label">
              Show Passwords
            </label>
          </div>
          {showOrNoPasswords}
        </div>
      </div>
    )
  }
}

export default PasswordManager
