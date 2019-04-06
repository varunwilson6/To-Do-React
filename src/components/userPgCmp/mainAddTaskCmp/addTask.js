import React from 'react';
import plusAdd from './plusAdd.svg';



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

export default TopAddCmp;