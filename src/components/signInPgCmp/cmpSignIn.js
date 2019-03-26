import React, { Component } from 'react';
import './sign_inPage.css';
import {ErrorCmp} from '../packCmp/cmpPack'

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signIn_Email: "",
            signIn_Password: null,
            emailValid:false,
            signStatus:this.props.signStatus,
        }
        // this.props.signInValidation.bind(this);
    }

    localSignInValidation = () => {
        this.props.signInValidation({
            ...this.state
        });

    }

    innerTxt =() => {

        let txt = null
        if(!this.state.signIn_Password) {
            txt = "* This Field is Mandatory" 
        } else if (this.props.signStatus==="Failed"&&!this.state.check) {
            txt = "Password or E-Mail is wrong" } else if(this.state.check) txt = null       
            return txt;
    }

    storingInputs = (event) => {
        let check,emailValid,signIn_Email,signIn_Password;
       // console.log(this.props.signStatus)
        if(this.props.signStatus==="Failed"){
            check=true;
            this.props.stateChange();
          //  this.setState({check:true})
        } else {
            check= false;
            //this.setState({check:false})
        }
        let vlTarget = event.target;
        if (vlTarget.name === 'email_SignIn') {
            signIn_Email = vlTarget.value;
            //this.setState({signIn_Email:vlTarget.value})
            let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(vlTarget.value.match(mailformat)){
                emailValid = vlTarget.value;
                //this.setState({ emailValid: vlTarget.value }) 
            }
                else {
                    emailValid = false;
                //this.setState({ emailValid: false })
            }
            this.setState((state, props) => {
                return {
                    check:check,
                    signIn_Email:signIn_Email,
                    emailValid:emailValid
                }
            })
                
        } 
        else if (vlTarget.name === 'password_SignIn') {
                signIn_Password = vlTarget.value;
                this.setState((state, props) => {
                    return {
                        signIn_Password:signIn_Password,
                        check:check,
                    }
                })
            //this.setState({ signIn_Password: vlTarget.value })
        }
        
    }

    render() {
        return (
            <div id='sign_in_Div'>
                <div id='sign_in_Ele'>
                    <div id='sign_in_Head'>
                        <span id='sign_in_H_Span'>
                            Login Here
                    </span>
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
                                    <input type="text" name="email_SignIn" placeholder="Type your Mail-Id here,.." onChange={this.storingInputs} />
                                    {this.state.signIn_Email?null:<ErrorCmp innerText = "* This Field is Mandatory"/>}{this.state.signIn_Email!=false?(!this.state.emailValid?<ErrorCmp innerText = "Enter a Valid E-Mail"/>:null):null}
                                </div>
                                <label className='passWordLabel' htmlFor="mailInput" >Enter your Password</label>
                                <div id="pwdInputCont">
                                    <div><i className="fas fa-unlock-alt"></i></div>
                                    <input type="password" name="password_SignIn" placeholder="Type your password here" onChange={this.storingInputs} />
                                    {<ErrorCmp innerText = {this.innerTxt()}/>}
                                </div>
                            </form>
                        </div>
                    </div>
                    <div id="sign_inLinkCont">
                        <a onClick={this.state.emailValid&&this.state.signIn_Password?this.localSignInValidation:null} id="sign_In_Link">Login</a>
                        <span id="forGotText">Forgot Password</span>
                    </div>
                </div>
            </div>
        )
    }
}



export default Signin;

