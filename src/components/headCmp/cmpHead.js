import React, {Component} from 'react';
import cmpLogo from './cmpLogo.svg';
import './headCmp.css';
import { NavLink } from 'react-router-dom'


// Header Component - for common head for all pages

class HeadCmp extends Component {
    constructor(props) {
        super(props);
    }

    btStatus = () => {
        let innerTxt = null;

        if(this.props.pageState==='SignIn') {
            innerTxt = 'Sign Up'
        } else if (this.props.pageState==='SignUp' || this.props.pageState==='signUpSuc') {
            innerTxt = 'Sign In'
        } else {innerTxt = 'Logout'}

        return innerTxt
    }

    render() {

    return (
        <div className='headCont'>
            <div className='head'>
                <div className='headElement'>
                    <div className='svgCont'>
                        <img src={cmpLogo} alt='logo-SVG'/>
                        <div className = 'toDoHead'>My Todoist</div>
                    </div>
                    <div className = 'loginDiv'>
                        <button onClick = {this.props.activePage} className = 'log_Out'>{this.btStatus()}</button>
                    </div>
                    <div className = 'clear'></div>
                </div>
            </div>
        </div>
    )
}
}


export default HeadCmp;