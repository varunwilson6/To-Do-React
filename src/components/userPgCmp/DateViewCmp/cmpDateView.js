import React, {useState} from 'react';


// Today's Date Viewing Div- R1 - for user page
const DateViewCmp =()=> {
        const [date, dateCh] = useState (new Date());
        const[dateSession, dateSessionCh] = useState({
            days:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
            months:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Nov','Dec']
            })
    
    return (
        <div className = 'rightR1'>
            <div className = 'inBox'>
                <a>
                    <div className = 'todayDate'>Today</div>
                </a>
                {/* The login below is - an Object is with Array of Weekly Days, Mondays and a new Date object
                is passed throught the props and retrived it with UTC appiled to the New Date object of the props  */}
                <span className="inBoxspan" id="to">{dateSession.days[date.getDay()]}</span>
                <span className="inBoxspan" id="toDate">{date.getDate()}</span>
                <span className="inBoxspan" id="toMonth">{dateSession.months[date.getMonth()]}</span>
            </div>
        </div>
    )

}

export default DateViewCmp;