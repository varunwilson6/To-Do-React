import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Signin from '../signInPgCmp/cmpSignIn';
import Signup from '../signUpCmp/cmpSignUp';
import { TopAddCmp, SvgContCmp, AllClrBaseCmp, TskAdgCmp, DateViewCmp } from '../userPgCmp/cmpUserPg';
import HeadCmp from '../headCmp/cmpHead'
import AppHolderCmp from '../appHolderCmp/cmpAppCont'



class App extends Component {
  constructor(props) {
    super(props)
    this.state = { // Here if their is any item stored in session storage - 'to-do-Page', it will
    // set as state else if any local storage, it set as state else state will set as 'signIn'
      whichpage: sessionStorage.getItem('to-do-Page')?sessionStorage.getItem('to-do-Page') : (localStorage.getItem('to-do-Page')?localStorage.getItem('to-do-Page'):'SignIn'),
      dateSession: {
                    date: new Date(),
                    days:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
                    months:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Nov','Dec']
                  },
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
      this.setState({ whichpage: 'SignIn'})}
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

  signInValidation = (state) => {
    // Storing the user credintials to App state
   // console.log("signInValidation:",state)
    this.setState({
      signIn_Email:state.signIn_Email
    });
    this.setState({
      signIn_Password:state.signIn_Password
    });
     let userMailid = state.signIn_Email;
    const axios =require('axios');
    console.log(userMailid)
    axios.get(`https://p1-to-do.firebaseio.com/users.json?orderBy="mail"&equalTo="${userMailid}"`).then((response)=>{
      this.passVerify(response)
  }).catch((error)=>{
      console.log(error)
    })
  }

  signUpValidation = (state) => {

    console.log("signInValidation:",state)
  }

  render() {
    return (
      <div className='container'>
        <HeadCmp pageState={this.state.whichpage} activePage={this.activePage} />
        <AppHolderCmp >
          {this.state.whichpage === 'SignIn' ? <Signin signInValidation = {this.signInValidation} loginTrue = {this.loginTrue} /> : null}
          {this.state.whichpage === 'SignUp' ? <Signup signUpValidation = {this.signUpValidation} /> : null}
          {this.state.whichpage === 'UserPg' ? <div><DateViewCmp dateData = {this.state.dateSession} /><TskAdgCmp /><TopAddCmp /><SvgContCmp /><AllClrBaseCmp /></div> : null}
        </AppHolderCmp>

      </div>

    );
  }
}

export default App;
