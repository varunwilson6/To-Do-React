import React, {Component} from 'react';
import {connect} from 'react-redux';


class InputTxtCmp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            EditingTask: this.props.value
        }
    }
    inPutHandler =(event) => {
        event.persist()
        let value = event.target.value;
        let deleId = event.target.previousSibling.getAttribute('data_id');
       // console.log(deleId)
        this.setState({
            EditingTask:value,
            TaskDeletId:deleId,
        })

    }

    eventChecking = (event) => {
        event.persist()
      //  console.log(event)
        let EditingTask = this.state.EditingTask;
        let TaskDeletId = this.state.TaskDeletId
        if(event.which==13) {
            this.props.editing(EditingTask,TaskDeletId)
        }
    }

    eventChecking2 = () => {
        let EditingTask = this.state.EditingTask;
        let TaskDeletId = this.state.TaskDeletId
        this.props.editing(EditingTask,TaskDeletId)
    }

        render() {
            return(
                <input style = {{
                    border:'none', 
                    outline:'none',
                    width: '56%',
                    verticalAlign: 'text-top',
                }} value = {this.state.EditingTask} onBlur={this.eventChecking2} onKeyUp = {this.eventChecking} onChange = {this.inPutHandler}></input>
            )
        }
    
}

const mapDispatchToProps = dispatch => {
    return {
        editing: (EditingTask,TaskDeletId) => dispatch({
            type: 'TAKING_EDITING',
            payload: {
                updatedTask:EditingTask,
                deletingId:TaskDeletId
            }
        }),
    }
}

export default connect(null,mapDispatchToProps)(InputTxtCmp)