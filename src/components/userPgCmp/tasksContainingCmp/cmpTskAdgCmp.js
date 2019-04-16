import React, {Component} from 'react';
import InputTxtCmp from './inputTextCmp'



class InputCmp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:false
        }
    }
    valueChanger = (event) => {
        console.log(event.target.value)
        this.setState({
            value:!this.state.value
        })
    }

    render() {
        return (
            <input type = 'radio' checked = {this.state.value} onChange = {this.valueChanger} data_id = {this.props.data_id} onClick = {this.props.ticker}/>
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

    ticker = (event) => {
        console.log(event.target.value)
        let checkboxTicked = event.target.getAttribute('data_Id')
        this.props.tickerChecking(checkboxTicked)
    }


    //console.log(props)
    dataDecode = (props) => {
            if(props){
            console.log(props)
            let keys = Object.keys(props)
            const RetrivedTasks =  keys.map((keys, indx)=>{
            return <li id = 'MyUl' className = 'TaskCont' key = {new Date()+Math.random()}>
                <InputCmp data_id = {indx} ticker = {this.ticker}/>
                <InputTxtCmp id = {"input" + indx} value = {props[keys].Task} />
                <span className = 'taskDate'>Due Date - {props[keys].Date} </span>
                <div className = 'clear'></div>
                </li>
            })

            return RetrivedTasks
        }
        }
    
    render() {
    return (
        <div className = 'taskAdding'>
            <div className = 'allTasksCOnt'>
            <ul style={{listStyleType:'none'}}>
            {   
                this.dataDecode(this.props.data)
            }
            </ul>
            </div>
        </div>
    )
}
}

export default TskAdgCmp;
