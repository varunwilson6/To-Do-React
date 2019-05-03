import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';


const InputTxtCmp = (props) =>  {

    const [EditingTask, EditingTaskCh] = useState(props.value);
    const [TaskDeletId, setTaskDeletId] = useState("");
    const [intialValue, intialVChange] = useState(props.value);
    

    const inPutHandler =(event) => {
        event.persist()
        let value = event.target.value;
        let deleId = event.target.previousSibling.getAttribute('data_id');
       // console.log(deleId)
       EditingTaskCh(value);
       setTaskDeletId(deleId);
    }

    const eventChecking = (event) => {
        event.persist()
        if(intialValue !== EditingTask && event.type === "blur" || event.which==13){
       // console.log(intialValue, EditingTask)
            props.editing(EditingTask,TaskDeletId)
    }
    }

            return(
                <input style = {{
                    border:'none', 
                    outline:'none',
                    width: '56%',
                    verticalAlign: 'text-top',
                }} value = {EditingTask} onBlur={eventChecking} onKeyDown = {eventChecking} onChange = {inPutHandler}></input>
            )
    
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