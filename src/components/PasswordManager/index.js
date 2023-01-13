import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import PasswordItem from '../PasswordItem'

const initialContainerBackgroundClassNames = [
  'yellow',
  'green',
  'orange',
  'teal',
  'red',
]

const initialState = {
  website: '',
  username: '',
  password: '',
  passwordsList: [],
  isShowPasswordsActive: false,
  searchInput: '',
}

class PasswordManager extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
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

  onAdd = event => {
    event.preventDefault()

    const {website, username, password} = this.state

    const initialBackgroundClassName =
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]

    const newPassword = {
      id: uuidv4(),
      website,
      username,
      password,
      initialClassName: initialBackgroundClassName,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      website: '',
      username: '',
      password: '',
    }))
  }

  onClickShowPasswords = () => {
    this.setState(prevState => ({
      isShowPasswordsActive: !prevState.isShowPasswordsActive,
    }))
  }

  updateList = deletedPasswordId => {
    const {passwordsList} = this.state

    const filteredpasswords = passwordsList.filter(
      eachPassword => eachPassword.id !== deletedPasswordId,
    )

    this.setState({passwordsList: filteredpasswords})
  }

  showOrNoPasswords = () => {
    const {passwordsList, isShowPasswordsActive, searchInput} = this.state

    const searchResults = passwordsList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const passwordsListLength = searchResults.length

    if (passwordsListLength > 0) {
      return (
        <ul className="show-passwords-container">
          {searchResults.map(eachPassword => (
            <PasswordItem
              passwordDetails={eachPassword}
              isShowPasswordsActive={isShowPasswordsActive}
              updateList={this.updateList}
              key={eachPassword.id}
            />
          ))}
        </ul>
      )
    }
    return (
      <div className="no-passwords-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          alt="no passwords"
          className="no-passwords-img"
        />
        <p className="no-passwords-text">No Passwords</p>
      </div>
    )
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {passwordsList, website, username, password} = this.state

    const passwordsCount = passwordsList.length
    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo-img"
        />
        <div className="main-container">
          <div className="password-entry-outer-container">
            {/* <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="password-manager-img"
            /> */}
            <div className="password-manager-image-container" />
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
                    value={website}
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
                    value={username}
                    placeholder="Enter Username"
                    className="input-box"
                    onChange={this.onChangeUsername}
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
                    type="password"
                    value={password}
                    placeholder="Enter Password"
                    className="input-box"
                    onChange={this.onChangePassword}
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
                <h1 className="count-title">Your passwords</h1>
                <div className="count-container">
                  <p className="count">{passwordsCount}</p>
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
                  onChange={this.onChangeSearchInput}
                />
              </div>
            </div>
            <hr className="color-seperator" />
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="show-password"
                className="check-box"
                onChange={this.onClickShowPasswords}
              />
              <label htmlFor="show-password" className="show-passwords-label">
                Show Passwords
              </label>
            </div>
            {this.showOrNoPasswords()}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
