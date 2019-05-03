import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './sign_upPage.css'
import {ErrorCmp , ValidEmail, InvalidPwd, PwdNotMatch} from '../packCmp/cmpPack'
import loadingPic from './loadingPic.gif';

const Signup =(props)=> {

        const [state, stateChanger] = useState({
            userFName:"",
            userLName:"",
            signUp_Email:"",
            emailValid:"",
            signUp_IntPassword:"",
            IntPasswordStatus:false,
            signUp_CnfPassword:"",
            CnfPasswordStatus:false,
            loading:false,
            showError:false,
            mailUniqe:"",
        })
    

    useEffect(()=> {
        if(localStorage.getItem('signedMail')) {
             props.history.push({
                pathname: '/Userpage'
            })
        }
    })

    const mailPreCheck=(event)=> {
        if( state.emailValid&&event.target.name==='email_inbx') {
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

              stateChanger({
                  ...state,
                  mailUniqe:'Failed',
              })
            }
            });
    }
    }

    const signUpValidation = (state) => {

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
               props.history.push({
                pathname: '/signUpSuc',
              })
            // this.props.accountCreated();  
             userNameRegisterHandler(response)
          }).catch(err => {console.log(err.response)})
      }

      const accountCreation = () => {
        stateChanger({
            ...state,
            showError:true,
        })
        let lc = state
        if(lc.CnfPasswordStatus&&lc.emailValid&&lc.userLName&&lc.userFName&&!state.mailUniqe){
        stateChanger({
            ...state,
            loading:true,
        })
        signUpValidation({
            ...state
        })
    }
    }

    const userNameRegisterHandler = (response) => {
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

    const mailTxt = () => {
        let txt = null;
        if(!state.signUp_Email) {
            console.log(state)
            txt = "* This Field is Mandatory"
        } else if(!state.emailValid) {
            txt = "Enter a Valid Mail-Id"
        } else if(state.mailUniqe==='Failed') {
            txt = "Mail-Id is already registered"
        }
        return txt;
    }


    const storingInputs = (event) => {
        // if( state.mailUniqe){ setState({
        //     mailUniqe:null
        // })}
        let vlTarget = event.target; // getting target input 
        if(vlTarget.name==="email_inbx" && state.mailUniqe==='Failed'){
            stateChanger({
                ...state,
                mailUniqe:null,
            })
        }
        if (vlTarget.name === 'email_inbx') { // compraing with target input name 
            console.log(vlTarget.value)
            console.log(vlTarget.name);
            let signUp_Email, emailValid
            signUp_Email = vlTarget.value;
            console.log(state)
            
            // storing input value in local state to make sure the input field is not empty
            let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // Regular Expression for mail validation

            if(vlTarget.value.match(mailformat)){
                emailValid = vlTarget.value
            } else { // setting the state emailValid with current successfull valid email
                emailValid = false;
             // if the validation fails, the state to store successful mail is set as false
            }
            stateChanger({
                ...state,
                signUp_Email: signUp_Email,
                emailValid:emailValid,
                mailUniqe:"",
            })

            } else if (vlTarget.name === 'Intial_pwd') {
                let signUp_IntPassword, IntPasswordStatus;
                signUp_IntPassword = vlTarget.value;
            let passwordformat = /^(?=.*\d).{8,32}$/;
            if(vlTarget.value.match(passwordformat)){
                IntPasswordStatus = true; 
            } else {
                IntPasswordStatus = false;
            }
            stateChanger({
                ...state,
                signUp_IntPassword: signUp_IntPassword,
                IntPasswordStatus:IntPasswordStatus,
            })

            } else if(vlTarget.name === 'confirm_pwd') {
                stateChanger({
                    ...state,
                    signUp_CnfPassword: vlTarget.value,
                    CnfPasswordStatus:vlTarget.value === state.signUp_IntPassword?true:false,
                })
                } else if (vlTarget.name==='f_name') {
                    stateChanger({
                        ...state,
                        userFName:vlTarget.value,
                    })
            } else if (vlTarget.name==='l_name') {
                stateChanger({
                    ...state,
                    userLName:vlTarget.value,
                })}
    }


    return (
        <div id="sign_up_Ele">
            <div id="sign_up_Head">
                <span id="sign_up_H_Span">Sign-Up</span>
            </div>
           
            <div id="comCont">
            <div id = 'LoadingCont'>
                { state.loading?<img className = 'LoadImgsgn'  src = {loadingPic} width = '42px' alt = 'loadingpic'/>:null}
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
                            <input autoComplete = 'off' type="text" name="f_name" placeholder="Enter your First name" onChange = { storingInputs}/>
                            { state.userFName?null:
                            ( state.showError?<ErrorCmp innerText = "* This Field is Mandatory"/>:null)}
                            </div>
                        <div id="l_name">
                            <input autoComplete = 'off' placeholder="Enter your Last name" type="text" name="l_name" onChange = { storingInputs}/>
                            { state.userLName?false:
                                (state.showError?<ErrorCmp innerText = "* This Field is Mandatory"/>:null)}                        
                            </div>
                    </div>
                    <div id="mail_Div" className="formSub_div">
                        <div id="mail_icon_cont">
                            <i className="fas fa-at"></i>
                        </div>
                        <input name="email_inbx" placeholder="Enter your mail-Id" onChange = { storingInputs} onBlur = { mailPreCheck} />
                        { state.showError?<ErrorCmp innerText = {mailTxt()}/>:false}
                        </div>
                    <div id="pwd_Div" className="formSub_div">
                        <div id="pwd_Intial">
                            <div id="password_Pic">
                                <i className="fas fa-key"></i>
                            </div>
                            <input type="password" name="Intial_pwd" placeholder="Enter your Password" onChange = { storingInputs}/>
                            { state.signUp_IntPassword?false:
                            ( state.showError?<ErrorCmp innerText = "* This Field is Mandatory"/>:null)}{state.signUp_IntPassword?(state.IntPasswordStatus?null:<ErrorCmp innerText = "Password should contain numbers and min 8 characters"/>):null}
                            </div>
                        <div id="pwd_Confirm">
                            <input placeholder="Repeat your Password" type="password" name="confirm_pwd" onChange = { storingInputs}/>
                            { state.signUp_CnfPassword?false:
                            ( state.showError?<ErrorCmp innerText = "* This Field is Mandatory"/>:null)}
                            { state.signUp_CnfPassword?(state.CnfPasswordStatus?null:
                            <ErrorCmp innerText = "Password not matching"/>):null}
                            </div>
                        <div className="clear"></div>
                    </div>
                </div>
            </div>
            <div id="sign_upLinkCont">
                <a id="sign_Up_Link" onClick = { accountCreation}>Create My Account</a>
                <span onClick = {() =>  props.history.push({
                    pathname: '/Signin',
                    hash: '#submit',
                    search: '?quick-submit=true'
            }) } id="cancel_span">I already have a account</span>
            </div>
        </div>
    )

}

export default Signup;