import React from 'react';
import HeaderContainer from './containers/HeaderContainer'
import Profile from './components/Profile'
import Signup from './components/Signup'
import Login from './components/Login'
import AddBaby from './components/AddBaby'
import { Switch, Route } from "react-router-dom"
import HomeContainer from './containers/HomeContainer'
import { connect } from 'react-redux'

// import actions from '../actions'

// import './App.css'
// import logo from './logo.svg';


class App extends React.Component {
  state = {
  }


  logOut = () => {
    localStorage.removeItem('token')
    this.props.removeCurrentUser()
    this.props.history.push("/login")
  }

  componentDidMount() {
    const token = localStorage.getItem("token")
    // console.log(token)
    if (token) {
      // console.log("hit")
      fetch('http://localhost:3001/api/v1/auto_login', {
        headers: {
          "Authorization": token
        }
      })
      .then(res => res.json())
      .then(response => {
        if (response.errors) {
          alert(response.errors)
        } else {
          // localStorage.setItem("token", response.token)
          this.props.setCurrentUser(response)
          // this.props.history.push(`/users/${response.user.id}`)
        }
      })
    }
  }


  render() {
    // console.log('app props',this.props.currentUser)
    return (
        <div className="App">
          <HeaderContainer logOut={this.logOut}/>

          <Switch>

            <Route exact path="/home" render={(routerProps) => (
               <HomeContainer {...routerProps}/>
            )} />

            <Route exact path="/users/:id" component={Profile} />
            
            <Route exact path="/login" render={(routerProps) => (
               <Login {...routerProps}/>
            )} />

            <Route exact path="/add-baby" render={(routerProps) => (
               <AddBaby {...routerProps}/>
            )} />

            <Route exact path="/sign-up" render={(routerProps) => (
              <Signup {...routerProps}/>
            )} />

          </Switch>
          
        </div>
      );
  }
}

function mapStateToProps(state){
  return {currentUser: state.currentUser}
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentUser: (user) => {
      return dispatch({
        type: "SET_CURRENT_USER",
        payload: user
      })
    },
    removeCurrentUser: () => {
      return dispatch({
        type: "REMOVE_CURRENT_USER"
      })
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App);
