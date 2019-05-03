import React, {useState} from 'react';
import InputTxtCmp from './inputTextCmp';



const InputCmp =(props)=> {
       const [value, valueCh] = useState(false) 
        return (
            <input type = 'radio' checked = {value} onChange = {()=>{valueCh(true)}} data_id = {props.data_id} onClick = {props.ticker}/>
        )
}


//taskAdding Div Component - // here all the tasks are dumbing - for User Page
const TskAdgCmp =(props) => {

            const [taskaddingInput, taskaddingIpChngr] = useState(false);
            const [valueId, valueIdChngr] = useState("");
            const [checkboxArray, checkboxArrayChngr ] = useState("");
          //  taskKeys:{...this.props.data}
        
    

   const ValueStore = (event) => {
        let values = event.target.value
        valueIdChngr(values)
    }

    const  ticker = (event) => {
        let checkboxTicked = event.target.getAttribute('data_Id')
        props.tickerChecking(checkboxTicked)
    }


    //console.log(props)
    const dataDecode = (props) => {
            if(props){
            // console.log(props)
            let keys = Object.keys(props)
            const RetrivedTasks =  keys.map((keys, indx)=>{
            return <li id = 'MyUl' className = 'TaskCont' key = {new Date()+Math.random()}>
                <InputCmp data_id = {indx} ticker = {ticker}/>
                <InputTxtCmp id = {"input" + indx} value = {props[keys].Task} />
                <span className = 'taskDate'>Due Date - {props[keys].Date} </span>
                <div className = 'clear'></div>
                </li>
            })

            return RetrivedTasks
        }
        }
    
    return (
        <div className = 'taskAdding'>
            <div className = 'allTasksCOnt'>
            <ul style={{listStyleType:'none'}}>
            {   
                dataDecode(props.data)
            }
            </ul>
            </div>
        </div>
    )
}

export default TskAdgCmp;
