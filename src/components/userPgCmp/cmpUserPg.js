import React, {Component} from 'react';
import './UserPgCmp.css';
import axios from 'axios';
import DateViewCmp from './DateViewCmp/cmpDateView';
import { withRouter } from 'react-router-dom'
import TopAddCmp from './mainAddTaskCmp/addTask';
import SvgContCmp from './cmpSvgCont/allClearMainSvg';
import AllClrBaseCmp from './allClearBaseCmp/cmpAllClrBase';
import {LoadingCmp, MinLoading} from './LoadingComponents/cmpLoadings';
import TaskAddingInputCmp from './input4Taskadd/cmpTaskAdding';
import TskAdgCmp from './tasksContainingCmp/cmpTskAdgCmp';
import {connect} from 'react-redux';
// import Img from 'react-image';
// import questionAllClear from './questionAllClear.svg';


class UserpageCmp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responseData:""
        }
    }

    dataDecodingHandler = (data) => {
        this.setState({
            responseData:data,
            loading:false
        })
    }

    deletionUpdation =(deletedKey) => {
        this.dataRetrivingHandler();
    }

    tickerChecking = (checkboxTicked) => { // this will execute when checkbox is ticked, 
        this.setState({
        tickingLoading:true
        })
        const taskObt = {...this.state.responseData};
        //console.log(checkboxTicked);
        const keys = Object.keys(taskObt)
        const deletingTaskKey = keys[checkboxTicked]
        //console.log(deletingTaskKey);
        const authToken = localStorage.getItem('authToken')

        axios.delete(`https://p1-to-do.firebaseio.com/to-do/${deletingTaskKey}.json?auth=${authToken}`)
        .then(resp => {
            //console.log(resp);
            this.deletionUpdation(deletingTaskKey)
        })
    }


    userNameDisplayerHandler = (response) => {
        //console.log("Consoling This>>", this.props.userNameStoring)
        //console.log(response);
        const keys = Object.keys(response.data);
        const UserName = response.data[keys[0]].fName + " " + response.data[keys[0]].lName
        //console.log(UserName);
        this.props.userNameStoring(UserName);
    }


    userDetailsRetriveHandler = (authToken, signedMailid) => {
        axios.get(`https://p1-to-do.firebaseio.com/users.json?auth=${authToken}&orderBy="userMail"&equalTo="${signedMailid}"`)
        .then( res => {
            //console.log(res)
            this.userNameDisplayerHandler(res) // username
        }).catch(res => console.log(res.response))
    }

    localPushing = () => {
        let keys = Object.keys(this.state.responseData)
        let key = keys[this.props.appState.deletingId]
        let updatingTask = this.props.appState.updatedTask
        let localState = {...this.state.responseData}
        let data = {...this.state.responseData[key]};
        if(data.Task){
        data.Task = updatingTask
        localState[key].Task = data.Task
        //console.log(localState)
        this.setState ({
            responseData:localState
        })
        this.props.editingClear();
    }
    }

    dataEditing = () => {
        let authToken = localStorage.getItem('authToken');
        let signedMailid = localStorage.getItem('signedMail');
        let data = this.state.responseData
        let keys = Object.keys(data)
        let updatingTask = this.props.appState.updatedTask
        let key = keys[this.props.appState.deletingId]
        let sendObject = {
            Task:updatingTask
        }
        this.localPushing()

        //console.log(key)
        axios.patch(`https://p1-to-do.firebaseio.com/to-do/${key}.json?auth=${authToken}`,sendObject )
        .then(response => {
        //console.log(response);

        this.props.editingClear();

        this.dataRetrivingHandler();
        }).catch(err => {
            this.setState({
                tskAdgLoading:!this.state.tskAdgLoading, //mini loading state, For setting loading while adding a task
            })
            //console.log(err.response)
        })
    }


    dataRetrivingHandler =()=> {
        
        let authToken = localStorage.getItem('authToken');
        let signedMailid = localStorage.getItem('signedMail');

        this.userDetailsRetriveHandler(authToken, signedMailid); // retriving user name
        
        axios.get(`https://p1-to-do.firebaseio.com/to-do.json?auth=${authToken}&orderBy="email"&equalTo="${signedMailid}"`)
        .then((response)=> {

            if(this.state.tskAdgLoading) {
            this.setState({
                tskAdgLoading:!this.state.tskAdgLoading, //mini loading state, For setting loading while adding a task
                tickingLoading:false,
            })
            } else {
                this.setState({
                    tickingLoading:false,
                })  
            }

            let data = response.data 
            this.dataDecodingHandler(data)
        }).catch((res)=> {
            //console.log(res)
            //console.log(res.response.statusText)
            if (res.response.statusText === 'Unauthorized') {
                localStorage.clear();
                sessionStorage.clear();
                this.props.history.push({
                    pathname: '/Signin',
                  })
            }
            
        })
    }

    taskAddInHandler = () => { // this is the state handler for task-adding input
        this.setState({
            DisplyTskAddingInput:!this.state.DisplyTskAddingInput
        })
    }

    dateHandler =(dateValue) => {
        console.log(dateValue)
        
        let datevl = dateValue
        //console.log(datevl);
        //console.log(datevl.split("-")[1]-1);
        let day = datevl.split("-")[2],
        month = datevl.split("-")[1]-1,
        year = datevl.split("-")[0];
        let d = new Date ( year, month, day);
         return d.toDateString()
    }

    taskSending = (inValue, dateValue) => { //Here the task is sending to firebase
        this.setState({
            tskAdgLoading:true, //mini loading state, For setting loading while adding a task
        })
        const value = inValue;
        const Due_date = this.dateHandler(dateValue);   
        const signedEmail = localStorage.getItem('signedMail');
        const authToken = localStorage.getItem('authToken');
        const sendObject = {
            Date:Due_date,
            Task:value,
            email:signedEmail
        }

        axios.post(`https://p1-to-do.firebaseio.com/to-do.json?auth=${authToken}`,sendObject )
        .then(response => {
        //console.log(response);
        this.dataRetrivingHandler();
        }).catch(err => {
            this.setState({
                tskAdgLoading:!this.state.tskAdgLoading, //mini loading state, For setting loading while adding a task
            })
            console.log(err.response)
        })
    }

    componentDidMount () {
        if(localStorage.getItem('signedMail')) {
        this.props.signINSignUphidding();
        this.dataRetrivingHandler()
        this.setState({ // now the loading element will run 
            loading:true,
        })
        } else {
            this.props.history.push({
                pathname: '/Signin',
              })
        }
    }

    componentWillUnmount () {
        this.props.signINSignUphidding()
    }

     componentDidUpdate () {
        if(this.props.appState.updatedTask) {
        this.dataEditing()
    } 
     }

    render() {
        return (
            <div>
                <DateViewCmp /> 
                <TskAdgCmp 
                data = {this.state.responseData}
                tickerChecking = {this.tickerChecking}
                />
                {this.state.tskAdgLoading?<MinLoading/>:null}
                {this.state.DisplyTskAddingInput?
                    <TaskAddingInputCmp
                    taskSending = {this.taskSending}
                    inputCrDeletion = {this.taskAddInHandler}/>:<TopAddCmp 
                    inputCr = {this.taskAddInHandler}/>} {/* The below operation is to show the loading function and after loading to display the all clear SVG if no tasks presents */}
                {this.state.loading||this.state.tickingLoading?<LoadingCmp/>:(Object.keys(this.state.responseData).length===0&&this.state.responseData.constructor===Object&&!this.state.DisplyTskAddingInput?<SvgContCmp />:null)}
                {this.state.loading?null:(Object.keys(this.state.responseData).length===0&&this.state.responseData.constructor===Object&&!this.state.DisplyTskAddingInput?<AllClrBaseCmp inputCr = {this.taskAddInHandler} />:null)}
                </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        appState:state
      };
}



const mapDispatchToProps = dispatch => {
  
    return {
        userNameStoring: (UserName) => dispatch({
         type: 'STORING_USERNAME',
         value: UserName
        }),
        signINSignUphidding:(UserName) => dispatch({
        type: 'SIGNIN_SIGNUP_HDN'
        }),
        editingClear:() => dispatch({
            type: 'EDITING_CLEARING'
        })
    }    
  }

export default  connect(mapStateToProps, mapDispatchToProps)(withRouter(UserpageCmp));