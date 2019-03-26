import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Signin from '../signInPgCmp/cmpSignIn';
import Signup from '../signUpCmp/cmpSignUp';
import { TopAddCmp, SvgContCmp, AllClrBaseCmp, TskAdgCmp, DateViewCmp } from '../userPgCmp/cmpUserPg';
import HeadCmp from '../headCmp/cmpHead'
import AppHolderCmp from '../appHolderCmp/cmpAppCont'
import UserCreated from '../packCmp/cmpPack'
import { stat } from 'fs';



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
      this.setState({ whichpage: 'SignIn'})
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

  signInValidation = (state) => {

  let Sendobject = {
    email:state.signIn_Email,
    password:state.signIn_Password,
    returnSecureToken: true,
    //fName:
  }

  axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCZqkm_qHoRtzn60E7hq4jCVgZFCVGIfQw`, Sendobject)
  .then(response => {
    console.log(response);
    sessionStorage.setItem('to-do-Page', 'UserPg')
    localStorage.setItem('to-do-Page', 'UserPg')
    this.setState({
      whichpage:'UserPg',
      signedMail:response.data.email
    });
    
    
    // axios.post(`https://p1-to-do.firebaseio.com/to-do.json?auth=${response.data.idToken}&orderBy="email"&equalTo="${response.data.email}"`)
    //  .then(response => console.log(response)).catch(err => console.log("err in Rettive data"))
  }).catch(err => {

    console.log(err.response)
    this.setState({
      signInPass:'Failed'
    })
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

  signUpValidation = (state) => {

    console.log("signInValidation:",state)

      let smObj = {
          email:state.signUp_Email,
          password:state.signUp_IntPassword,
          returnSecureToken: true,
          fName:state.userFName,
          lName:state.userLName,

      }
      axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCZqkm_qHoRtzn60E7hq4jCVgZFCVGIfQw`, smObj)
      .then(response => {
          console.log(response);
          if(response.status == 200) {
            this.setState({
              whichpage:'signUpSuc',
              lgnSucRes:response,
            });
          } 
      }).catch(err => {console.log(err.response)})

  }

  render() {
    return (
      <div className='container'>
        <HeadCmp pageState={this.state.whichpage} activePage={this.activePage} />
        <AppHolderCmp signedMail = {this.state.signedMail} >
          {this.state.whichpage === 'SignIn' ? <Signin appStateRes={this.state.response} stateChange={this.stateChange} signStatus={this.state.signInPass}  signInValidation = {this.signInValidation} loginTrue = {this.loginTrue}/> : null}
          {this.state.whichpage === 'SignUp' ? <Signup activePage={this.activePage} signUpValidation = {this.signUpValidation} /> : null}
          {this.state.whichpage === 'UserPg' ? <div><DateViewCmp dateData = {this.state.dateSession} /><TskAdgCmp /><TopAddCmp /><SvgContCmp /><AllClrBaseCmp /></div> : null}
          {this.state.whichpage === 'signUpSuc' ? <UserCreated/>:null}
        </AppHolderCmp>

      </div>

    );
  }
}

export default App;
