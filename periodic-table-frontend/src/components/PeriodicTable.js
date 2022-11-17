import React, {useState} from "react";
import data from "../PeriodicTableJSON.json";
import Element from "../Modal/Element";
import Legend from "./Legend";
import { useDataLayerValue } from "./context-api/DataLayer";
import "../App.css";

const colorMap = {
    "noble gas": "#FFBC42",
    "alkaline earth metal": "#808000",
    "diatomic nonmetal": "#D81159",
    "polyatomic nonmetal": "#FF4500",
    "alkali metal": "#8F2D56",
    "transition metal": "#191970",
    "post-transition metal": "#218380",
    "lanthanide": "#9400D3",
    "actinide": "#EE82EE",
    "metalloid": "#73D2DE",
    "unknown, probably transition metal": "#191970",
    "unknown, probably post-transition metal": "#218380",
    "unknown, probably metalloid": "#73D2DE",
    "unknown, but predicted to be an alkali metal": "#8F2D56",
    "unknown, predicted to be noble gas": "#FFBC42"
};  

const PeriodicTable = () => {

    const [showElementModal, setShowElementModal] = useState(false);
    const [elementData, setElementData] = useState(null);
    const [{elementsOpacity}] = useDataLayerValue();

    const handleElementClick = (atomicNo) => {
        const selectedElement = data.elements.filter(
			(element) => element.number === atomicNo
		)[0];
        setElementData(selectedElement);
        setShowElementModal(true);
    }

    const handleCloseElementModal = () => {
        setShowElementModal(false);
        setElementData(null);
    }

    return(
        <div className="periodic-table">

        {showElementModal && (
            <Element 
                isOpen={showElementModal}
                element={elementData}
                handleClose={handleCloseElementModal}
                colorMap={colorMap}
            />
        )}
        <Legend colorMap={colorMap} />
        {
            data.elements.map(element => 
                <div
                    onClick={() => handleElementClick(element.number)}
                    className="element"
                    key={element.name}
                    data-name={element.name}
					data-category={element.category}
                    style={{
                        opacity: elementsOpacity,
                        gridColumn: element.xpos,
                        gridRow: element.ypos,
                        borderColor: colorMap[element.category],
                    }}
                >
                    <strong>{element.symbol}</strong>
                    <small className="number">{element.number}</small>
                    <small className="name">{element.name}</small>
                </div>
            )
        }
            <div className="Lanthanide-series"
                data-category= "lanthanide" 
                style={{
                    opacity: elementsOpacity,
                    gridColumn: 3,
                    gridRow: 6,
                }}>
                <p>57-71</p>
                <p>La-Lu</p>
            </div>
            <div className="Actinide-series"
                data-category= "actinide"
                style={{
                    opacity: elementsOpacity,
                    gridColumn: 3,
                    gridRow: 7,
                }}>
                <p>89-103</p>
                <p>Ac-Lr</p>
            </div>
        </div>
    )
}

export default PeriodicTable;