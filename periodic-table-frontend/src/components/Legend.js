import React, {useState} from "react";
import { useDataLayerValue } from "./context-api/DataLayer";
import { actionTypes } from "./context-api/reducer";
import '../App.css';

function Legend (props) {
    
    const [{}, dispatch] = useDataLayerValue();
    const colorMap = Object.fromEntries(Object.entries(props.colorMap).slice(0,10));
    const [cateStyles, setCateStyles] = useState("");

    const unHighlightCategory = () => {
		const remover = document.querySelectorAll(".legend-item");
		Object.entries(remover).map((ptItem) => {
			return ptItem[1].classList.remove("legend-item-selected");
		});
	};
    
    const handleClick = function(e, value){
        dispatch({
			type: actionTypes.SET_ELEMENT_OPACITY,
			elementsOpacity: 0.1,
		});

        const pop = `.legend-item[data-category="${value}"]`;
        unHighlightCategory();
        document.querySelector(pop).classList.add("legend-item-selected");
        setCateStyles(value);
        document.querySelector(".btn-legend-clear").classList.add("btn-legend-show");
    }

    const cancelHighlight = () => {
        dispatch({
			type: actionTypes.SET_ELEMENT_OPACITY,
			elementsOpacity: 1,
		});
		unHighlightCategory();
		document.querySelector(".btn-legend-clear").classList.remove("btn-legend-show");
	};

    return (
        <div className="legend">
            <style
                dangerouslySetInnerHTML={{
                __html: `div[data-category="${cateStyles}"]{opacity: 1 !important}`,
                }}
            />
            <button onClick={cancelHighlight} className="btn-legend-clear">
                Clear Filter
            </button>
            {Object.keys(colorMap).map((category, keyId) => (
                <div 
                    onClick={(e) => handleClick(e, category)}
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