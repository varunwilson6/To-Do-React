import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import './App.css';
import Signin from '../signInPgCmp/cmpSignIn';
import Signup from '../signUpCmp/cmpSignUp';
import UserpageCmp from '../userPgCmp/cmpUserPg';
import HeadCmp from '../headCmp/cmpHead';
import AppHolderCmp from '../appHolderCmp/cmpAppCont';
import UserCreated from '../packCmp/cmpPack';




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
        UserName:"",
    })
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

  passVerify = (response) => {
    console.log(response.data);
    let rcvData =  response.data;
    let usrkey = (Object.keys(rcvData));
    let userPwd = this.state.signIn_Password
    let key = usrkey[0]
    console.log(rcvData[key].password);
    if(rcvData[key].password == this.state.signIn_Password) {
      console.log('Ok');
      this.loginTrue();
    }
  }

  userPageEntery = () => {
    this.setState({
      whichpage:'UserPg'
    })
  }

  signUpSucPageENtry = () => {
    this.setState({
      whichpage:'signUpSuc',
      //lgnSucRes:response,
    });
  }

  

  stateChange =() => {
    this.setState({
      signInPass:null
    })
  }

  signInPass =() => {
    this.setState({
      signInPass:null
    })
  }



  userNameDisplayerHandler = (response) => {
    console.log(response);
    const keys = Object.keys(response.data);
    const UserName = response.data[keys[0]].fName + " " + response.data[keys[0]].lName
    console.log(UserName);
    this.setState({
      UserName:UserName,
    })
  }

  userNameRegisterHandler = (response) => {
    const decodingObjt = JSON.parse(response.config.data);
    console.log(decodingObjt);
    const authToken = response.data.idToken
    const transObjct = {
      fName:decodingObjt.fName,
      lName:decodingObjt.lName,
      userMail:response.data.email
    }

    axios.post(`https://p1-to-do.firebaseio.com/users.json?auth=${authToken}`,transObjct )
        .then(response => {
        console.log(response);
        }).catch(err => {
            console.log(err)
            })
}


  render() {
    return (
      <BrowserRouter>
      <div className='container'>
        <HeadCmp UserName = {this.state.UserName} pageState={this.state.whichpage} activePage={this.activePage} />
        <AppHolderCmp>
        <Switch>
          <Route path = "/Signin" render = {(props) => <Signin {...props} 
          appStateRes={this.state.response} 
          stateChange={this.stateChange} 
          signStatus={this.state.signInPass}
          userPageEntery = {this.userPageEntery}  
          signInValidation = {this.signInValidation} 
          loginTrue = {this.loginTrue}/> } />

          <Route path = "/Signup" render = {(props) => <Signup {...props}
          activePage={this.activePage} 
          userNmReg = {this.userNameRegisterHandler}
          signupOk = {this.signUpSucPageENtry}
          signUpValidation = {this.signUpValidation} /> } />
          
          <Route path = "/Userpage" render = {(props) => <UserpageCmp 
            userNameDsp = {this.userNameDisplayerHandler} /> } />

          <Route path = "/signUpSuc" render = {(props) =>  <UserCreated/> } />
          <Redirect from = "/" to = "/Signin" />
          </Switch>
          </AppHolderCmp>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;


