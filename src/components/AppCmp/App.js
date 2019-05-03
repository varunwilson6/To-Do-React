import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import './App.css';
import Signin from '../signInPgCmp/cmpSignIn';
import Signup from '../signUpCmp/cmpSignUp';
import UserpageCmp from '../userPgCmp/cmpUserPg';
import HeadCmp from '../headCmp/cmpHead';
import AppHolderCmp from '../appHolderCmp/cmpAppCont';
import UserCreated from '../packCmp/cmpPack';
import { connect } from 'react-redux';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = { // Here if their is any item stored in session storage - 'to-do-Page', it will
    // set as state else if any local storage, it set as state else state will set as 'signIn'
      whichpage: sessionStorage.getItem('to-do-Page')?sessionStorage.getItem('to-do-Page') : (localStorage.getItem('to-do-Page')?localStorage.getItem('to-do-Page'):'SignIn'),
      signIn_Email:null,
      signIn_Password:null,
    }
  }

  // localStorage.getItem('to-do-Page')?localStorage.getItem('to-do-Page'):'SignIn'
  
  activePage = () => {
  
    if (this.state.whichpage === 'SignIn') {  
      this.setState({ whichpage: 'SignUp' });
      sessionStorage.setItem('to-do-Page', 'SignUp')
      } else if (this.state.whichpage === 'SignUp') {
        this.setState({ whichpage: 'SignIn'});
        sessionStorage.setItem('to-do-Page', 'SignIn')
    } else if(this.state.whichpage === 'UserPg') {
      localStorage.removeItem('to-do-Page');
      sessionStorage.removeItem('to-do-Page', 'UserPg')
      this.setState({ 
        whichpage: 'SignIn',
    })
    this.props.mapDispatchToProps("")
    }else if(this.state.whichpage === 'signUpSuc') {
      this.setState({whichpage: 'SignIn'})
      sessionStorage.setItem('to-do-Page', 'SignIn')
    }
  }

  loginTrue = () => {
    this.setState({whichpage:'UserPg'})
    sessionStorage.setItem('to-do-Page', 'UserPg')
    localStorage.setItem('to-do-Page', 'UserPg')
  }

  userPageEntery = () => {
    this.setState({
      whichpage:'UserPg'
    })
  }

  stateChange =() => {
    this.setState({
      signInPass:null
    })
  }


  render() {
    return (
      <BrowserRouter>
      <div className='container'>
        <HeadCmp pageState={this.state.whichpage} activePage={this.activePage} />
        <AppHolderCmp>
        <Switch>
          <Route path = "/Signin" render = {(props) => <Signin {...props} 
          stateChange={this.stateChange}
          signStatus={this.state.signInPass} 
          loginTrue = {this.loginTrue}/> } />

          <Route path = "/Signup" component= {Signup} />
          <Route path = "/Userpagessss" component= {UserpageCmp} />
          <Route path = "/signUpSuc" component= {UserCreated} />
          <Redirect from = "/" to = "/Signin" />
          </Switch>
          </AppHolderCmp>
      </div>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = state => {
  return {
    appState:state
  };
}

export default connect(mapStateToProps)(App);




