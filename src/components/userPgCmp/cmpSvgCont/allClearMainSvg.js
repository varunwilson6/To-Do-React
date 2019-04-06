import React from 'react';
import allClearBig from './allClearBig.svg';



// all clear SVG  component - for User page
const SvgContCmp = (props) => {
    return (
        <div className = 'svgContDiv'>
            <img src = {allClearBig} alt= 'allClearSvg'/>
        </div>
    )
}

export default SvgContCmp;