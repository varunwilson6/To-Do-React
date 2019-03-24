import React from 'react';
import './cmpPack.css'

const FieldShouldCmp = () => {
    return(
        <span className="maTrySpan" >* This Field is mandatory</span>
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

const PwdNotMatch = () => {
    return(
        <span className="maTrySpan" >Password is not matching</span>
    )
}

export {FieldShouldCmp , ValidEmail, InvalidPwd, PwdNotMatch};