import React, {Component} from 'react';



class TaskAddingInputCmp extends Component {
    constructor() {
        super();
    this.state = {
        inValue:"",
        dateValue:new Date().getFullYear()+"-"+
        ("0"+(new Date().getMonth()+1)).slice(-2)+
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
        ("0"+(new Date().getMonth()+1)).slice(-2)+
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

export default TaskAddingInputCmp;
