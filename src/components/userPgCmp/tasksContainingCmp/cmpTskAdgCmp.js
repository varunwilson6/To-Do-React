import React, {Component} from 'react';

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

export default TskAdgCmp;