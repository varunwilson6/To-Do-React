import React, { Component } from 'react';
import './sign_inPage.css';
import {FieldShouldCmp , ValidEmail} from '../packCmp/cmpPack'

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signIn_Email: "",
            signIn_Password: null,
            emailValid:false
        }
        // this.props.signInValidation.bind(this);
    }

    localSignInValidation = () => {
        this.props.signInValidation({
            ...this.state
        });

    }

    storingInputs = (event) => {
        let vlTarget = event.target;
        if (vlTarget.name === 'email_SignIn') {
            this.setState({signIn_Email:vlTarget.value})
            let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(vlTarget.value.match(mailformat)){this.setState({ emailValid: vlTarget.value }) }else {
                this.setState({ emailValid: false })
            }
            } else if (vlTarget.name === 'password_SignIn') {
            this.setState({ signIn_Password: vlTarget.value })
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
                                    {this.state.signIn_Email?null:<FieldShouldCmp/>}{this.state.signIn_Email!=false?(!this.state.emailValid?<ValidEmail/>:null):null}
                                </div>
                                <label className='passWordLabel' htmlFor="mailInput" >Enter your Password</label>
                                <div id="pwdInputCont">
                                    <div><i className="fas fa-unlock-alt"></i></div>
                                    <input type="password" name="password_SignIn" placeholder="Type your password here" onChange={this.storingInputs} />
                                    {this.state.signIn_Password?null:<FieldShouldCmp/>}
                                </div>
                            </form>
                        </div>
                    </div>
                    <div id="sign_inLinkCont">
                        <a onClick={this.localSignInValidation} id="sign_In_Link">Login</a>
                        <span id="forGotText">Forgot Password</span>
                    </div>
                </div>
            </div>
        )
    }
}



export default Signin;

