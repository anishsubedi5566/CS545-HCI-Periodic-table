import React from "react";

const ElementLable = (props) => {
    return(
        <div className="ele-det-group-label flex-row">
            <div className="ele-det-group-name">
                {props.label}
            </div>
        </div>
    )
}

export default ElementLable;