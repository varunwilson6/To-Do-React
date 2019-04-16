import React, {Component} from 'react';
import cmpLogo from './cmpLogo.svg';
import './headCmp.css';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';


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
        this.props.userNameRemoving();
    }



    searching =(event)=> {
        let input, filter, ul, li, a, i, txtValue;
        input = event.target.value
        
    
            console.log(input)
        filter = input.toUpperCase();
        ul = document.getElementById("MyUl");
        input = document.querySelectorAll('input[style]');
        console.log("flter>>", filter,'<br>',
        ul, li
        )

        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < input.length; i++) {
        a = input[i];
        txtValue = a.value
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            input[i].parentNode.style.display = "";
        } else {
            input[i].parentNode.style.display = "none";
        }

    }   
    }




    searchInputHandler = (event) => {
        this.setState({
            textAreaVal:event.target.value
        })
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
                   
                    {!this.props.getUserName&&!this.props.signHide?
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
                    </div>:<React.Fragment>
                    <div className='SearchContainer'>
                    <div className='SearchEle'>
                    <i className="fas fa-search"></i><textarea value = {this.state.textAreaVal} onKeyUp = {this.searching} onChange = {this.searchInputHandler} className = 'Searchtextarea' placeholder = 'Search your task here,...' 
                        rows='1' type = 'textbox' />
                    </div>
                </div>
                    <div className = "userNameDisplayer" >{this.props.getUserName}
                        <div onClick ={this.over} className = "logDivOut">
                            <NavLink title = "Logout" className = 'logOUT' to = {{pathname: '/Signin', }} onClick = {this.activePageHandler}>
                             Log-Out <i className="fas fa-sign-out-alt"></i>
                             </NavLink>
                        </div>
                    </div>
                </React.Fragment>
                    }
                    <div className = 'clear'></div>
                </div>
            </div>
        </div>
    )
}
}
const mapDispatchToProps = dispatch => {
    return {
        userNameRemoving: () => dispatch({
            type: 'USERNAME_REMOVING'
        }),
    }
}

const mapStateToProps = state => {
    console.log("ss",state);
  return {
    getUserName:state.UserName,
    getPageState:state.whichpage,
    signHide:state.signHide,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeadCmp);