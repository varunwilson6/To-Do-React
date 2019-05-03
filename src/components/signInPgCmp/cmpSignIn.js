import React, { useState, useEffect} from 'react';
import './sign_inPage.css';
import {ErrorCmp} from '../packCmp/cmpPack';
import axios from 'axios';
import loadingPic from './loadingPic.gif';
import { stat } from 'fs';


const Signin =(props)=> {

        const [state, stateChanger] = useState({
            signIn_Email: "",
            signIn_Password: null,
            emailValid:false,
            loading:false,
            signInPass:"",
        })
    

    useEffect(()=>{
        if(localStorage.getItem('signedMail')) {
              props.history.push({
                pathname: '/Userpagessss',
            })
        }
    })

    //statePass =()
   const keyPressHandler = (event) => {
        if(event.which==13)  signInValidation(state)
    }

    const signInValidation = (state) => {
        console.log(state)
        stateChanger({
            ...state,
            loading:true,
        })
        console.log(state)
        let Sendobject = {
          email:state.signIn_Email,
          password:state.signIn_Password,
          returnSecureToken: true,
        }
      
        axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCZqkm_qHoRtzn60E7hq4jCVgZFCVGIfQw`, Sendobject)
        .then(response => {
            stateChanger({
                ...state,   
                loading:false
            })
          localStorage.setItem('signedMail',response.data.email);
          localStorage.setItem('authToken',response.data.idToken);
        //     props.stateChanging();
            props.history.push({
            pathname: '/Userpagessss',
          })

        //     setState({
        //     whichpage:'UserPg',
        //     signedMail:response.data.email
        //   });
          
          // axios.post(`https://p1-to-do.firebaseio.com/to-do.json?auth=${response.data.idToken}&orderBy="email"&equalTo="${response.data.email}"`)
          //  .then(response => console.log(response)).catch(err => console.log("err in Rettive data"))
        }).catch(err => {
      
          console.log(err   )
          stateChanger({
              ...state,
            signInPass:'Failed',
            loading:false,
            showerror:true,
            check:false,
          })
        });
      
        }

        const passwordinnerTxt =() => {
        let txt = null
        if(!state.signIn_Password) {
            txt = "* This Field is Mandatory" 
        } else if (state.signInPass==="Failed"&&!state.check) {
            txt = "Password or E-Mail is wrong" }     
            return txt;
    }

    const mailinnerTxt = () => {
        console.log(state);
        let txt = null;
        {/* {  state.signIn_Email?null:<ErrorCmp innerText = "* This Field is Mandatory"/>}{  state.signIn_Email!=false?( ! state.emailValid?<ErrorCmp innerText = "Enter a Valid E-Mail"/>:null):null} */}
        if(!state.signIn_Email) {
            txt = "* This Field is Mandatory"
        }
        else if (  state.signIn_Email&&!state.emailValid) {
            txt = "Enter a Valid E-Mail"
        }
        return txt;
    }

    const storingInputs = (event) => {
        let check,emailValid,signIn_Email,signIn_Password;
        if(state.signInPass==="Failed"){
            check=true;

          //    setState({check:true})
        } else {
            check= false;
            //  setState({check:false})
        }
        let vlTarget = event.target;
        if (vlTarget.name === 'email_SignIn') {
            signIn_Email = vlTarget.value;
            //  setState({signIn_Email:vlTarget.value})
            let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(vlTarget.value.match(mailformat)){
                emailValid = vlTarget.value;
                //  setState({ emailValid: vlTarget.value }) 
            }
                else {
                    emailValid = false;
                //  setState({ emailValid: false })
            }
            stateChanger({
                ...state,
                check:check,
                signIn_Email:signIn_Email,
                emailValid:emailValid
            })
                
        } 
        else if (vlTarget.name === 'password_SignIn') {
                signIn_Password = vlTarget.value;
                stateChanger({
                    ...state,
                    signIn_Password:signIn_Password,
                    check:check,
                })
        }
        
    }

        return (
            <div id='sign_in_Div'>
                <div id='sign_in_Ele'>
                    <div id='sign_in_Head'>
                        <span id='sign_in_H_Span'>
                            Login Here
                    </span>
                    <div id = 'LoadingCont'>
                      {  state.loading?<img className = 'LoadImgsgn'  src = {loadingPic} width = '42px' alt = 'loadingpic'/>:null}
                    </div>
                    </div>
                    <div id='comCont'>
                        <span id='comEleSpan'>Please fill the Login Details</span>
                    </div>
                    <div id="sign_in_Body">
                        <div id="sign_in_FormCont">
                            <form id="signIn">
                                <label htmlFor="mailInput">Enter your registered Mail-Id</label>
                                <div id="mailInputCont">
                                    <div><i className="fas fa-at"></i></div>
                                    <input onKeyPress={  state.emailValid&&  state.signIn_Password?  keyPressHandler:null} type="text" name="email_SignIn" placeholder="Type your Mail-Id here,.." onChange={  storingInputs} />
                                    {/* {  state.signIn_Email?null:<ErrorCmp innerText = "* This Field is Mandatory"/>}{  state.signIn_Email!=false?(!state.emailValid?<ErrorCmp innerText = "Enter a Valid E-Mail"/>:null):null} */}
                                    {  state.showerror?<ErrorCmp innerText = {  mailinnerTxt()}/>:null}
                                </div>
                                <label className='passWordLabel' htmlFor="mailInput" >Enter your Password</label>
                                <div id="pwdInputCont">
                                    <div><i className="fas fa-unlock-alt"></i></div>
                                    <input onKeyPress={  state.emailValid&&  state.signIn_Password?  keyPressHandler:null} type="password" name="password_SignIn" placeholder="Type your password here" onChange={  storingInputs} />
                                    {  state.showerror?<ErrorCmp innerText = {  passwordinnerTxt()}/>:null}
                                </div>
                            </form>
                        </div>
                    </div>
                    <div id="sign_inLinkCont">
                        <a
                        onClick={() =>   state.emailValid&&state.signIn_Password?signInValidation(state):stateChanger({...state, showerror:true, check:true})} 
                        id="sign_In_Link">Login</a>
                        <span id="forGotText">Forgot Password</span>
                    </div>
                </div>
            </div>  
        )
}



export default Signin;

