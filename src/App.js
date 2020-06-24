import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { Auth } from 'aws-amplify'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import ChangePassword from './components/auth/ChangePassword'
import ChangePasswordConfirm from './components/auth/ChangePasswordConfirm'
import ForgotPassword from './components/auth/ForgotPassword'
import ForgotPasswordVerification from './components/auth/ForgotPasswordVerification'
import LogIn from './components/auth/LogIn'
import Register from './components/auth/Register'
import Welcome from './components/auth/Welcome'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import CompanyProfile from './components/pages/CompanyProfile'
import Home from './components/pages/Home'
import MyProfile from './components/pages/MyProfile'
import ProjectAdd from './components/pages/ProjectAdd'
import Projects from './components/pages/Projects'

library.add(faEdit)

//root parent component
class App extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null
  }

  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated })
  }

  setUser = user => {
    this.setState({ user: user })
  }

  async componentDidMount() {
    try {
      const session = await Auth.currentSession()
      this.setAuthStatus(true)
      console.log(session)
      const user = await Auth.currentAuthenticatedUser()
      this.setUser(user)
    } catch (error) {
      console.log(error)
    }
    this.setState({ isAuthenticating: false })
  }

  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    }

    return (
      !this.state.isAuthenticating && (
        <div className="App">
          <Router>
            <div>
              <Navbar auth={authProps} />
              <Switch>
                <Route exact path="/" render={props => <Home {...props} auth={authProps} />} />
                <Route exact path="/projects" render={props => <Projects {...props} auth={authProps} />} />
                <Route exact path="/myprofile" render={props => <MyProfile {...props} auth={authProps} />} />
                <Route exact path="/companyprofile" render={props => <CompanyProfile {...props} auth={authProps} />} />
                <Route exact path="/addproject" render={props => <ProjectAdd {...props} auth={authProps} />} />
                <Route exact path="/login" render={props => <LogIn {...props} auth={authProps} />} />
                <Route exact path="/register" render={props => <Register {...props} auth={authProps} />} />
                <Route exact path="/forgotpassword" render={props => <ForgotPassword {...props} auth={authProps} />} />
                <Route exact path="/forgotpasswordverification" render={props => <ForgotPasswordVerification {...props} auth={authProps} />} />
                <Route exact path="/changepassword" render={props => <ChangePassword {...props} auth={authProps} />} />
                <Route exact path="/changepasswordconfirmation" render={props => <ChangePasswordConfirm {...props} auth={authProps} />} />
                <Route exact path="/welcome" render={props => <Welcome {...props} auth={authProps} />} />
              </Switch>
              <Footer />
            </div>
          </Router>
        </div>
      )
    )
  }
}

export default App
