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

export {FieldShouldCmp , ValidEmail};