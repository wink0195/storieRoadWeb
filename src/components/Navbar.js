import { Auth } from 'aws-amplify'
import React, { Component } from 'react'

export default class Navbar extends Component {
  handleLogOut = async event => {
    event.preventDefault()
    try {
      Auth.signOut()
      this.props.auth.setAuthStatus(false)
      this.props.auth.setUser(null)
    } catch (error) {
      console.log(error.message)
    }
  }

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src="storieRoad-logo.jpg" width="112" height="28" alt="storieRoad logo" />
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a href="/" className="navbar-item">
              Home
            </a>
            <a href="/MyProfile" className="navbar-item">
              MyProfile
            </a>
            <a href="/CompanyProfile" className="navbar-item">
              CompanyProfile
            </a>
            <a href="/projects" className="navbar-item">
              ViewProjects
            </a>
            <a href="/AddProject" className="navbar-item">
              AddProject
            </a>
            <a href="https://mailchi.mp/85ec44736fc5/subscribeforupdates" target="_blank" className="navbar-item">
              Newsletter
            </a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              {this.props.auth.isAuthenticated && this.props.auth.user && <p>Hello {this.props.auth.user.username}</p>}

              <div className="buttons">
                {/* if user IS NOT authenticated, show login & register btns */}
                {!this.props.auth.isAuthenticated && (
                  <div>
                    <a href="/register" className="button is-primary">
                      <strong>Register</strong>
                    </a>
                    <a href="/login" className="button is-light">
                      Log in
                    </a>
                  </div>
                )}
                {/* if user IS authenticated, show logout btn */}
                {this.props.auth.isAuthenticated && (
                  <div>
                    <a href="/changepassword" className="button is-primary">
                      Account
                    </a>
                    <a href="/login" onClick={this.handleLogOut} className="button is-light">
                      Log Out
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
