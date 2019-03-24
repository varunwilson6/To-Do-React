import React, { Component } from 'react';
import './Appcont.css'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faIgloo } from '@fortawesome/free-solid-svg-icons'

// library.add(faIgloo)

class AppHolderCmp extends Component {
    constructor(props) {
        super(props);
    }

render() {
    return (
        <div className = 'appHolder'>
            <div className='viewPad'>
                <div className='viewPadcenter'>
                    {this.props.children}
                </div>
            </div>
        </div>
    )
}

}

export default AppHolderCmp;