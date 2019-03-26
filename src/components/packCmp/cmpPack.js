import React from 'react';
import './cmpPack.css'

const ErrorCmp = (props) => {
    return(
        <span className="maTrySpan" >{props.innerText}</span>
        )
}

const ValidEmail = () => {
    return(
        <span className="maTrySpan" >Please enter a valid email address</span>
    )
}

const InvalidPwd = () => {
    return(
        <span className="maTrySpan" >Password should contain numbers and min 8 characters</span>
    )
}

const PwdNotMatch = (props) => {
    return(
        <span className="maTrySpan" >{props.innerText}</span>
    )
}


const UserCreated = (props) => {
    return(
        <div id="UserCreatedDiv">
        <span className="UserCr" >Congrats</span>
        <span className="UserSc" >Hi, Your Account has been successfully created</span>
        </div>
    )
}
export default UserCreated
export {ErrorCmp};