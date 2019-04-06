import React from 'react';
import loadingPic from './loadingPic.gif';
import miniLoading from './miniLoading.gif';


const LoadingCmp = () =>{
    return (
        <div id = "mainLoading">
            <img src = {loadingPic} alt = "LoadingPic"/>
        </div>
    )
}

const MinLoading = () => {
    return(
        <div id = "mainLoading">
            <img src = {miniLoading} alt = "LoadingPic" width = "30px"/>
        </div>
    )
}

export {LoadingCmp, MinLoading};