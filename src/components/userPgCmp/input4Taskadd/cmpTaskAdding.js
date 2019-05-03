import React, {useState} from 'react';



const TaskAddingInputCmp =(props)=>  {
    
    const [inValue, inValueChr] = useState("");
    const [dateValue, dateValueChr] = useState(new Date().getFullYear()+"-"+
    ("0"+(new Date().getMonth()+1)).slice(-2)+
    "-"+("0"+(new Date().getDate())).slice(-2));

    const enterCheck = (event) => {
        event.persist()
        if(event.key === 'Enter' && inValue.trim()) {
            dataTrasfer();
        }
    }

    const valueStore = (event) => {
        let value = event.target.value;
        inValueChr(value);
    }

    const dateValueHandler = (event) => {
            dateValueChr(event.target.value);
    }

    const dataTrasfer = () => {
        props.taskSending(inValue, dateValue);
        inValueChr("")
        dateValueChr(new Date().getFullYear()+"-"+
        ("0"+(new Date().getMonth()+1)).slice(-2)+
        "-"+("0"+(new Date().getDate())).slice(-2))
    }

    return(
        <div className = "totalInAddCont">
            <div className = "inputCont">
            <input id = "addTskInput" placeholder = 'e.g. Buy gift tomorrow at 6pm p1 #Errands' onKeyPress = {enterCheck}  onChange = {valueStore} value = {inValue}></input>
            <span><input id = "DateAdder" value = {dateValue} onChange = {dateValueHandler} type="date" name="Due_Date"/></span>
            </div>
            <button onClick = {inValue.trim()?dataTrasfer:null} className = "normalBut" >Add Task</button><button className = "normalBut" onClick = {props.inputCrDeletion}>Cancel</button>
        </div>
    )
}

export default TaskAddingInputCmp;
