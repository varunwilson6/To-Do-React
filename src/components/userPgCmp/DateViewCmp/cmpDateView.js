import React, {Component} from 'react';



// Today's Date Viewing Div- R1 - for user page
class DateViewCmp extends Component {
    constructor(props) {
        super(props);
        this.state = {
        dateSession: {
            date: new Date(),
            days:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
            months:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Nov','Dec']
            },
        }
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
                <span className="inBoxspan" id="to">{this.state.dateSession.days[this.state.dateSession.date.getDay()]}</span>
                <span className="inBoxspan" id="toDate">{this.state.dateSession.date.getDate()}</span>
                <span className="inBoxspan" id="toMonth">{this.state.dateSession.months[this.state.dateSession.date.getMonth()]}</span>
            </div>
        </div>
    )
}
}

export default DateViewCmp;