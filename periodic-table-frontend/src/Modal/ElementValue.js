import React from "react";

const ElementValue = (props) => {
    return(
        <aside className="ele-det-info-box">
            <label>{props.label}</label>
            <div className="ele-det-info-value">
                {props.value}
            </div>
        </aside>
    )
}

export default ElementValue;