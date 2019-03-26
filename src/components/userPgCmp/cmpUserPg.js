import React, {Component} from 'react';
import './UserPgCmp.css';
import plusAdd from './plusAdd.svg';
import allClearBig from './allClearBig.svg';
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
                <a href='#'>
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

//taskAdding Div Component - // here all the tasks are dumbing - for User Page
const TskAdgCmp = (props) => {
    return (
        <div className = 'taskAdding'>
            <div className = 'allTasksCOnt'></div>
        </div>
    )
}




export { TopAddCmp, SvgContCmp, AllClrBaseCmp, TskAdgCmp, DateViewCmp};