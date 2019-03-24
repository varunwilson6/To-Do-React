import React from 'react';
import './sign_upPage.css'

function Signup() {
    return (
        <div id="sign_up_Ele">
            <div id="sign_up_Head">
                <span id="sign_up_H_Span">Sign-Up</span>
            </div>
            <div id="comCont">
                <span id="comEleSpan">Please fill the below Details</span>
            </div>
            <div id="sign_up_Body">
                <div id="sign_up_FormCont">
                    <div id="name_Div" className="formSub_div">
                        <div id="f_name">
                            <div id="account_icon">
                                <i className="fas fa-user-alt"></i>
                            </div>
                            <input type="text" name="f_name" placeholder="Enter your First name" />
                        </div>
                        <div id="l_name">
                            <input placeholder="Enter your Last name" type="text" name="l_name" />
                        </div>
                    </div>
                    <div id="mail_Div" className="formSub_div">
                        <div id="mail_icon_cont">
                            <i className="fas fa-at"></i>
                        </div>
                        <input name="email_inbx" placeholder="Enter your mail-Id" />
                    </div>
                    <div id="pwd_Div" className="formSub_div">
                        <div id="pwd_Intial">
                            <div id="password_Pic">
                                <i className="fas fa-key"></i>
                            </div>
                            <input type="password" name="Intial_pwd" placeholder="Enter your Password" />
                        </div>
                        <div id="pwd_Confirm">
                            <input placeholder="Repeat your Password" type="password" name="confirm_pwd" />
                        </div>
                        <div className="clear"></div>
                    </div>
                </div>
            </div>
            <div id="sign_upLinkCont">
                <a id="sign_Up_Link">Create My Account</a>
                <span id="cancel_span">I already have a account</span>
            </div>
        </div>
    )
}

export default Signup;