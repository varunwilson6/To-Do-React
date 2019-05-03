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
    
  }
  render() {
    return (
      <BrowserRouter>
      <div className='container'>
        <HeadCmp />
        <AppHolderCmp>
        <Switch>
          <Route path = "/Signin" component= {Signin} />
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




