import React from "react";
import '../App.css';

function Legend (props) {
    
    const colorMap = Object.fromEntries(Object.entries(props.colorMap).slice(0,10));

    return (
        <div className="legend">
            {Object.keys(colorMap).map((category, keyId) => (
                <div 
                    key={keyId}
                    data-category={category}
                    className="legend-item"
                >
                    <div
						className="legend-color"
						style={{ background: colorMap[category] }}
					></div>
					<div className="legend-name">{category}</div>
                </div>
            ))}
        </div>
    )
}

export default Legend;