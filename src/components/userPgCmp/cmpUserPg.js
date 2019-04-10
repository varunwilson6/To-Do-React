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
        console.log(deletedKey)
        this.dataRetrivingHandler();
    }

    tickerChecking = (checkboxTicked) => { // this will execute when checkbox is ticked, This fuction is passes as props to TskAdgCmp Component 
        this.setState({
            tickingLoading:true
        })
        const taskObt = {...this.state.responseData};
        console.log(checkboxTicked);
        const keys = Object.keys(taskObt)
        const deletingTaskKey = keys[checkboxTicked]
        console.log(deletingTaskKey);
        const authToken = localStorage.getItem('authToken')

        axios.delete(`https://p1-to-do.firebaseio.com/to-do/${deletingTaskKey}.json?auth=${authToken}`)
        .then(resp => {
            console.log(resp);
            this.deletionUpdation(deletingTaskKey)
        })

        
    }

    displayerHandler = (res) => {
        this.props.userNameDsp(res)
    }

    userDetailsRetriveHandler = (authToken, signedMailid) => {
        axios.get(`https://p1-to-do.firebaseio.com/users.json?auth=${authToken}&orderBy="userMail"&equalTo="${signedMailid}"`)
        .then( res => {
            console.log(res)
            this. displayerHandler(res)
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
        }).catch((response)=> {
            console.log(response)
        })
    }

    taskAddInHandler = () => { // this is the state handler for task-adding input
        this.setState({
            DisplyTskAddingInput:!this.state.DisplyTskAddingInput
        })
    }

    dateHandler =(state) => {
        
        let datevl = state.dateValue
        console.log(datevl);
        let day = datevl.split("-")[2],
        month = datevl.split("-")[1],
        year = datevl.split("-")[0]
         var d = new Date ( year, month, day);
         return d.toDateString()
    }

    taskSending = (state) => { //Here the task is sending to firebase
        this.setState({
            tskAdgLoading:true, //mini loading state, For setting loading while adding a task
        })
        const value = state.inValue;
        const Due_date = this.dateHandler(state);
        const signedEmail = localStorage.getItem('signedMail');
        const authToken = localStorage.getItem('authToken');
        const sendObject = {
            Date:Due_date,
            Task:value,
            email:signedEmail
        }

        axios.post(`https://p1-to-do.firebaseio.com/to-do.json?auth=${authToken}`,sendObject )
        .then(response => {
        console.log(response);
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

    render() {
        return (
            <div>
                <DateViewCmp dateData = {this.props.dateData} /> 
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



export default  withRouter(UserpageCmp);