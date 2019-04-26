import React, { Component } from 'react';
import './sign_inPage.css';
import {ErrorCmp} from '../packCmp/cmpPack';
import axios from 'axios';
import loadingPic from './loadingPic.gif';
import {connect} from 'react-redux';
class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signIn_Email: "",
            signIn_Password: null,
            emailValid:false,
            signStatus:this.props.signStatus,
            loading:false,
        }
        // this.props.signInValidation.bind(this);
    }

    componentDidMount() {
        if(localStorage.getItem('signedMail')) {
            this.props.history.push({
                pathname: '/Userpagessss',
            })
        }
    }

    //statePass =()
    keyPressHandler = (event) => {
        if(event.which==13)this.signInValidation()
    }

    signInValidation = (state) => {
        this.setState({
            loading:true,
            
        })
        let Sendobject = {
          email:this.state.signIn_Email,
          password:this.state.signIn_Password,
          returnSecureToken: true,
        }
      
        axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCZqkm_qHoRtzn60E7hq4jCVgZFCVGIfQw`, Sendobject)
        .then(response => {
          console.log(response);
          this.setState({
            loading:false
          })
          sessionStorage.setItem('to-do-Page', 'UserPg');
          localStorage.setItem('to-do-Page', 'UserPg');
          localStorage.setItem('signedMail',response.data.email);
          localStorage.setItem('authToken',response.data.idToken);
        //   this.props.stateChanging();
          this.props.history.push({
            pathname: '/Userpagessss',
          })

        //   this.setState({
        //     whichpage:'UserPg',
        //     signedMail:response.data.email
        //   });
          
          // axios.post(`https://p1-to-do.firebaseio.com/to-do.json?auth=${response.data.idToken}&orderBy="email"&equalTo="${response.data.email}"`)
          //  .then(response => console.log(response)).catch(err => console.log("err in Rettive data"))
        }).catch(err => {
      
          console.log(err   )
          this.setState({
            signInPass:'Failed',
            loading:false,
            showerror:true,
            check:false,
          })
        });
      
        }

    passwordinnerTxt =() => {

        let txt = null
        if(!this.state.signIn_Password) {
            txt = "* This Field is Mandatory" 
        } else if (this.state.signInPass==="Failed"&&!this.state.check) {
            txt = "Password or E-Mail is wrong" }     
            return txt;
    }

    mailinnerTxt = () => {
        let txt = null;
        {/* {this.state.signIn_Email?null:<ErrorCmp innerText = "* This Field is Mandatory"/>}{this.state.signIn_Email!=false?(!this.state.emailValid?<ErrorCmp innerText = "Enter a Valid E-Mail"/>:null):null} */}
        if(!this.state.signIn_Email) {
            txt = "* This Field is Mandatory"
        }
        else if (this.state.signIn_Email&&!this.state.emailValid) {
            txt = "Enter a Valid E-Mail"
        }
        return txt;
    }

    storingInputs = (event) => {
        let check,emailValid,signIn_Email,signIn_Password;
       // console.log(this.props.signStatus)
        if(this.state.signInPass==="Failed"){
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
                    <div id = 'LoadingCont'>
                      {this.state.loading?<img className = 'LoadImgsgn'  src = {loadingPic} width = '42px' alt = 'loadingpic'/>:null}
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
                                    <input onKeyPress={this.state.emailValid&&this.state.signIn_Password?this.keyPressHandler:null} type="text" name="email_SignIn" placeholder="Type your Mail-Id here,.." onChange={this.storingInputs} />
                                    {/* {this.state.signIn_Email?null:<ErrorCmp innerText = "* This Field is Mandatory"/>}{this.state.signIn_Email!=false?(!this.state.emailValid?<ErrorCmp innerText = "Enter a Valid E-Mail"/>:null):null} */}
                                    {this.state.showerror?<ErrorCmp innerText = {this.mailinnerTxt()}/>:null}
                                </div>
                                <label className='passWordLabel' htmlFor="mailInput" >Enter your Password</label>
                                <div id="pwdInputCont">
                                    <div><i className="fas fa-unlock-alt"></i></div>
                                    <input onKeyPress={this.state.emailValid&&this.state.signIn_Password?this.keyPressHandler:null} type="password" name="password_SignIn" placeholder="Type your password here" onChange={this.storingInputs} />
                                    {this.state.showerror?<ErrorCmp innerText = {this.passwordinnerTxt()}/>:null}
                                </div>
                            </form>
                        </div>
                    </div>
                    <div id="sign_inLinkCont">
                        <a 
                        onClick={() => this.state.emailValid&&this.state.signIn_Password?this.signInValidation():this.setState({showerror:true}) && this.setstate({check:true})} 
                        id="sign_In_Link">Login</a>
                        <span id="forGotText">Forgot Password</span>
                    </div>
                </div>
            </div>  
        )
    }
}

// const mapDispatchToProps = dispatch => {
  
//     return {
//        stateChanging: (UserName) => dispatch({
//          type: 'USER_STATE_USERPAGE',
//        })
//     }
//   }

// export default connect(mapDispatchToProps)(Signin);
export default Signin;

