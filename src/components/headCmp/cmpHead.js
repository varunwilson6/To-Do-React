import React, {Component} from 'react';
import cmpLogo from './cmpLogo.svg';
import './headCmp.css';
import { NavLink } from 'react-router-dom'


// Header Component - for common head for all pages

class HeadCmp extends Component {
    constructor(props) {
        super(props);
    
    this.state = {
        logout:false,    
    }

    }
    over = () => {
        this.setState({
            logout:!this.state.logout
        })
    }


    activePageHandler = () => {
        localStorage.removeItem('signedMail');
        localStorage.removeItem('authToken');
        this.props.activePage();
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
                   
                    {this.props.pageState!=="UserPg"?
                        <div className = "signup_signIn">
                        <NavLink className = 'signNav' to = {{
                            pathname: '/Signup',
                            hash: '#submit',
                            search: '?quick-submit=true'
                        }} activeClassName="selected"  > Signup </NavLink>
                        <NavLink className = 'signNav' to = {{
                            pathname: '/Signin',
                            hash: '#submit',
                            search: '?quick-submit=true'
                        }} activeClassName="selected" > Signin </NavLink>
                    </div>:null
                    }
                        
                        {this.props.UserName?
                            <React.Fragment>
                                <div className = "userNameDisplayer" >{this.props.UserName}
                                    <div onClick ={this.over} className = "logDivOut">
                                        <NavLink title = "Logout" className = 'logOUT' to = {{pathname: '/Signin', }} onClick = {this.activePageHandler}>
                                         Log-Out <i className="fas fa-sign-out-alt"></i>
                                         </NavLink>
                                    </div>
                                </div>
                            </React.Fragment>:null
                        } 

                    
                    <div className = 'clear'></div>
                </div>
            </div>
        </div>
    )
}
}


export default HeadCmp;