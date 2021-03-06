import React, {Component} from 'react';
import axios from 'axios'
import './sign_upPage.css'
import {ErrorCmp , ValidEmail, InvalidPwd, PwdNotMatch} from '../packCmp/cmpPack'
import loadingPic from './loadingPic.gif';
import { connect } from 'react-redux';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userFName:null,
            userLName:null,
            signUp_Email:null,
            emailValid:null,
            signUp_IntPassword:null,
            IntPasswordStatus:false,
            signUp_CnfPassword:null,
            CnfPasswordStatus:false,
            loading:false,
            showError:false,
        }
    }

    componentDidMount() {
        if(localStorage.getItem('signedMail')) {
            this.props.history.push({
                pathname: '/Userpage'
            })
        }
    }

    mailPreCheck=(event)=> {
        if(this.state.emailValid&&event.target.name==='email_inbx') {
            console.log(event.target.value)
            let smObj = {
                email:event.target.value,
                password:'dfndsfmnsdm8787384jfhhdfjjgggj',
                returnSecureToken: true,
            }

            axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCZqkm_qHoRtzn60E7hq4jCVgZFCVGIfQw`, smObj)
            .then(response => {
              console.log(response);
              // axios.post(`https://p1-to-do.firebaseio.com/to-do.json?auth=${response.data.idToken}&orderBy="email"&equalTo="${response.data.email}"`)
              //  .then(response => console.log(response)).catch(err => console.log("err in Rettive data"))
            }).catch(err => {
              console.log(err.response.data.error.message)
              if(err.response.data.error.message==='INVALID_PASSWORD'){
                  console.log('Mail-Id is already registered')
              this.setState({
                mailUniqe:'Failed'
              })
            }
            });
    }
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
              this.props.history.push({
                pathname: '/signUpSuc',
              })
            // this.props.accountCreated();  
            this.userNameRegisterHandler(response)
          }).catch(err => {console.log(err.response)})
      }

    accountCreation = () => {
        this.setState({
            showError:true
        })
        let lc = this.state
        if(lc.CnfPasswordStatus&&lc.emailValid&&lc.userLName&&lc.userFName&&!this.state.mailUniqe){
        this.setState({
            loading:true,
        })
        this.signUpValidation({
            ...this.state
        })
    }
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
        console.log(transObjct)
    
        axios.post(`https://p1-to-do.firebaseio.com/users.json?auth=${authToken}`,transObjct )
            .then(response => {
            console.log(response);
            }).catch(err => {
                console.log(err)
                })
    }

    mailTxt = () => {
        let txt = null;
        if(!this.state.signUp_Email) {
            txt = "* This Field is Mandatory"
        } else if(!this.state.emailValid) {
            txt = "Enter a Valid Mail-Id"
        } else if(this.state.mailUniqe==='Failed') {
            txt = "Mail-Id is already registered"
        }
        return txt;
    }


    storingInputs = (event) => {
        // if(this.state.mailUniqe){this.setState({
        //     mailUniqe:null
        // })}
        let vlTarget = event.target; // getting target input 
        if(vlTarget.name==="email_inbx" && this.state.mailUniqe==='Failed'){
            this.setState({
                mailUniqe:null
            })
        }
        if (vlTarget.name === 'email_inbx') { // compraing with target input name 
            this.setState({signUp_Email:vlTarget.value}) // storing input value in local state to make sure the input field is not empty
            let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // Regular Expression for mail validation
            // if(vlTarget.value.match(mailformat)){()=> Promise ((resolve,reject)=> {
            //     this.mailChecking(vlTarget.value)                
            // }).then(()=> {
            //     this.setState({ emailValid: vlTarget.value })
            // })
            // }else { // setting the state emailValid with current successfull valid email
            //     this.setState({ emailValid: false }) // if the validation fails, the state to store successful mail is set as false
            // }
            // } else if (vlTarget.name === 'Intial_pwd') {
            if(vlTarget.value.match(mailformat)){
                this.setState({ emailValid: vlTarget.value }) }else { // setting the state emailValid with current successfull valid email
                this.setState({ emailValid: false }) // if the validation fails, the state to store successful mail is set as false
            }
            } else if (vlTarget.name === 'Intial_pwd') {
            this.setState({ signUp_IntPassword: vlTarget.value });
            let passwordformat = /^(?=.*\d).{8,32}$/;
            if(vlTarget.value.match(passwordformat)){this.setState({ IntPasswordStatus: true }) } else {
                this.setState({ IntPasswordStatus: false })
            }
            } else if(vlTarget.name === 'confirm_pwd') {
                this.setState({ signUp_CnfPassword: vlTarget.value });
                this.setState({CnfPasswordStatus:vlTarget.value === this.state.signUp_IntPassword?true:false})
                } else if (vlTarget.name==='f_name') {this.setState({userFName:vlTarget.value})
            } else if (vlTarget.name==='l_name') {this.setState({userLName:vlTarget.value})}
    }


    render() {
    return (
        <div id="sign_up_Ele">
            <div id="sign_up_Head">
                <span id="sign_up_H_Span">Sign-Up</span>
            </div>
           
            <div id="comCont">
            <div id = 'LoadingCont'>
                {this.state.loading?<img className = 'LoadImgsgn'  src = {loadingPic} width = '42px' alt = 'loadingpic'/>:null}
              </div>
                <span id="comEleSpan">Please fill the below Details</span>
            </div>
            <div id="sign_up_Body">
                <div id="sign_up_FormCont">
                    <div id="name_Div" className="formSub_div">
                        <div id="f_name">
                            <div id="account_icon">
                                <i className="fas fa-user-alt"></i>
                            </div>
                            <input autoComplete = 'off' type="text" name="f_name" placeholder="Enter your First name" onChange = {this.storingInputs}/>
                            {this.state.userFName?null:
                            (this.state.showError?<ErrorCmp innerText = "* This Field is Mandatory"/>:null)}
                            </div>
                        <div id="l_name">
                            <input autoComplete = 'off' placeholder="Enter your Last name" type="text" name="l_name" onChange = {this.storingInputs}/>
                            {this.state.userLName?false:
                                (this.state.showError?<ErrorCmp innerText = "* This Field is Mandatory"/>:null)}                        
                            </div>
                    </div>
                    <div id="mail_Div" className="formSub_div">
                        <div id="mail_icon_cont">
                            <i className="fas fa-at"></i>
                        </div>
                        <input name="email_inbx" placeholder="Enter your mail-Id" onChange = {this.storingInputs} onBlur = {this.mailPreCheck} />
                        {this.state.showError?<ErrorCmp innerText = {this.mailTxt()}/>:false}
                        </div>
                    <div id="pwd_Div" className="formSub_div">
                        <div id="pwd_Intial">
                            <div id="password_Pic">
                                <i className="fas fa-key"></i>
                            </div>
                            <input type="password" name="Intial_pwd" placeholder="Enter your Password" onChange = {this.storingInputs}/>
                            {this.state.signUp_IntPassword?false:
                            (this.state.showError?<ErrorCmp innerText = "* This Field is Mandatory"/>:null)}{this.state.signUp_IntPassword?(this.state.IntPasswordStatus?null:<ErrorCmp innerText = "Password should contain numbers and min 8 characters"/>):null}
                            </div>
                        <div id="pwd_Confirm">
                            <input placeholder="Repeat your Password" type="password" name="confirm_pwd" onChange = {this.storingInputs}/>
                            {this.state.signUp_CnfPassword?false:
                            (this.state.showError?<ErrorCmp innerText = "* This Field is Mandatory"/>:null)}
                            {this.state.signUp_CnfPassword?(this.state.CnfPasswordStatus?null:
                            <ErrorCmp innerText = "Password not matching"/>):null}
                            </div>
                        <div className="clear"></div>
                    </div>
                </div>
            </div>
            <div id="sign_upLinkCont">
                <a id="sign_Up_Link" onClick = {this.accountCreation}>Create My Account</a>
                <span onClick = {() => this.props.history.push({
                pathname: '/Userpagessss',
            }) } id="cancel_span">I already have a account</span>
            </div>
        </div>
    )
}
}

// const mapDispatchToProps = dispatch => {
//     return {
//         accountCreated: (UserName) => dispatch({
//           type: 'ROUTING_USERPAGE',
//         })
//      }
//    }

export default Signup;