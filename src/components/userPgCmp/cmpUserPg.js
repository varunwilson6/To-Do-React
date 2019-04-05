import React, {Component} from 'react';
import './UserPgCmp.css';
import axios from 'axios';
import plusAdd from './plusAdd.svg';
import allClearBig from './allClearBig.svg';
import loadingPic from './loadingPic.gif';
import miniLoading from './miniLoading.gif'
// import Img from 'react-image';
// import questionAllClear from './questionAllClear.svg';


// Today's Date Viewing Div- R1 - for user page
class DateViewCmp extends Component {
    constructor(props) {
        super(props);
    }
    render() {
    return (
        <div className = 'rightR1'>
            <div className = 'inBox'>
                <a>
                    <div className = 'todayDate'>Today</div>
                </a>
                {/* The login below is - an Object is with Array of Weekly Days, Mondays and a new Date object
                is passed throught the props and retrived it with UTC appiled to the New Date object of the props  */}
                <span className="inBoxspan" id="to">{this.props.dateData.days[this.props.dateData.date.getDay()]}</span>
                <span className="inBoxspan" id="toDate">{this.props.dateData.date.getDate()}</span>
                <span className="inBoxspan" id="toMonth">{this.props.dateData.months[this.props.dateData.date.getMonth()]}</span>
            </div>
        </div>
    )
}
}

// Top Add Task link Component - Its Row 2 - for user page
const TopAddCmp = (props) => {
    return (
        <div className = 'row2'>
            <div className = 'addTask'>
                <a href='#' onClick = {props.inputCr}>
                    <span className = 'plusSvgSpan'>
                        <img src={plusAdd} alt='plusSvg' />
                    </span>
                    <span className = 'spanAdd'>Add Task</span>
                </a>
            </div>
        </div>
    )
}


// all clear SVG  component - for User page
const SvgContCmp = (props) => {
    return (
        <div className = 'svgContDiv'>
            <img src = {allClearBig} alt= 'allClearSvg'/>
        </div>
    )
}


// base component of all clear - for User page
const AllClrBaseCmp = (props) => {
    return (
        <div className = 'viwPadCenBase'>
            <div className = 'allClr'>All Clear</div>
            <div className = 'lookDiv'>Looks like everything's organized in the right place.</div>
            <div className = 'addTaskBtCont'><button>Add Task</button></div>
            <div className = 'viwPaBaACont'>
                <a>
                    <span className = 'svgspan2'>
                    {/* Svg having some issue here, That's why its inserted directly */}
                    <svg width="17" height="17">
                    <path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm0-1A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm-.1-2.5c-.46 0-.8-.35-.8-.85s.34-.86.8-.86c.48 0 .8.36.8.86s-.32.85-.8.85zM5.5 5.87c.06-1.32.9-2.37 2.53-2.37 1.47 0 2.47.95 2.47 2.21 0 .96-.47 1.64-1.22 2.11-.73.46-.94.8-.94 1.45v.4H7.32V9.1c0-.8.37-1.36 1.16-1.86.68-.43.94-.82.94-1.47 0-.76-.56-1.32-1.43-1.32-.87 0-1.43.55-1.5 1.42H5.5z" id="tick-a"/>
                    </svg>
                    </span>
                    <span className = 'linkSpan'>How to plan your day</span>
                </a>
            </div>

        </div>
    )
}

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

class TaskAddingInputCmp extends Component {
    constructor() {
        super();
    this.state = {
        inValue:"",
        dateValue:new Date().getFullYear()+"-"+
        ("0"+(new Date().getMonth())).slice(-2)+
        "-"+("0"+(new Date().getDate())).slice(-2),
    }
    }

    enterCheck = (event) => {
        event.persist()
        if(event.key === 'Enter' && this.state.inValue.trim()) {
            this.dataTrasfer();
        }
    }

    valueStore = (event) => {
        let value = event.target.value;
        this.setState({
            inValue:value
        })
    }

    dateValueHandler = (event) => {
        console.log(event.target.value)
        this.setState({
            dateValue:event.target.value,
        })
    }

    dataTrasfer = () => {
        this.props.taskSending({...this.state});
        this.setState({
            inValue:"",
            dateValue:new Date().getFullYear()+"-"+
        ("0"+(new Date().getMonth())).slice(-2)+
        "-"+("0"+(new Date().getDate())).slice(-2),
        })
    }

    render(){
    return(
        <div className = "totalInAddCont">
            <div className = "inputCont">
            <input id = "addTskInput" placeholder = 'e.g. Buy gift tomorrow at 6pm p1 #Errands' onKeyPress = {this.enterCheck}  onChange = {this.valueStore} value = {this.state.inValue}></input>
            <span><input id = "DateAdder" value = {this.state.dateValue} onChange = {this.dateValueHandler} type="date" name="Due_Date"/></span>
            </div>
            <button onClick = {this.state.inValue.trim()?this.dataTrasfer:null} className = "normalBut" >Add Task</button><button className = "normalBut" onClick = {this.props.inputCrDeletion}>Cancel</button>
        </div>
    )
}
}

//taskAdding Div Component - // here all the tasks are dumbing - for User Page
class TskAdgCmp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskaddingInput:false,
            valueId:"",
            checkboxArray:""
          //  taskKeys:{...this.props.data}
        }
    }

    ValueStore = (event) => {
        let values = event.target.value
        this.setState({
            valueId:values
        })
    }

    // tickerChecking = () => {
    //     console.log(this.state.event)
    //     console.log(this.state.propsData)
    //     // const keys = Object.keys(propsData)
    //     // console.log(keys)
    // }

    ticker = (event) => {
        console.log(event.target.value)
        let checkboxTicked = event.target.id
        this.props.tickerChecking(checkboxTicked)
    }


    //console.log(props)
    dataDecode = (props) => {
            if(props){
            console.log(props)
            let keys = Object.keys(props)
            const RetrivedTasks =  keys.map((keys, indx)=>{
            return <div className = 'TaskCont' key = {indx}>
                <input checked = {false} onChange = {this.ticker} id = {indx} type = 'checkbox'/>
                <span id = {"input" + indx}>{props[keys].Task} </span>
                <span className = 'taskDate'>Due Date - {props[keys].Date} </span>
                <div className = 'clear'></div>
                </div>
            })

            return RetrivedTasks
        }
        }
    
    render() {
    return (
        <div className = 'taskAdding'>
            <div className = 'allTasksCOnt'>
            {
                this.dataDecode(this.props.data)
            }
            </div>
        </div>
    )
}
}

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

    dataRetrivingHandler =()=> {
        
        let authToken = localStorage.getItem('authToken');
        let signedMailid = localStorage.getItem('signedMail');
        axios.get(`https://p1-to-do.firebaseio.com/to-do.json?auth=${authToken}&'orderBy'=email&'equalTo'=${signedMailid}`)
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
        this.dataRetrivingHandler()
        this.setState({ // now the loading element will run 
            loading:true,
        })
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
                    inputCr = {this.taskAddInHandler}/>}
                {this.state.loading||this.state.tickingLoading?<LoadingCmp/>:(this.state.responseData?null:<SvgContCmp />)}
                {this.state.loading?null:(this.state.responseData?null:<AllClrBaseCmp />)}
                </div>
        )
    }
}




export {UserpageCmp};