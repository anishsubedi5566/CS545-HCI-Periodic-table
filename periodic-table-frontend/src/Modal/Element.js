import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import ElementValue from "../Modal/ElementValue";
import ElementLable from "./ElementLable";
import data from "../PeriodicTableJSON.json";
import "../App.css";
import { Button } from "@mui/material";
import { AppUserFavourites, AppUserGetDb } from "../components/Firebase";
import { style } from "@mui/system";
import { toast } from "react-toastify";

ReactModal.setAppElement("#root");

function Element(props) {
  const [showElementModal, setShowElementModal] = useState(props.isOpen);
  const [elementData, setElementData] = useState(props.element);
  const [favHover, setFavHover] = useState(false);
  const [fav, setFav] = useState([]);

  const handleCloseModal = () => {
    setShowElementModal(false);
    setElementData(null);
    props.handleClose();
  };

  let prevElementName, nextElementName, prevAtomicNo, nextAtomicNo;

  function findElement(atomicNumber) {
    return data.elements.filter(
      (element) => element.number === atomicNumber
    )[0];
  }

  //prev element
  if (elementData.number - 1 > 0) {
    prevAtomicNo = parseInt(elementData.number - 1);
    // const prevElement = findElement(prevAtomicNo);
    prevElementName = findElement(prevAtomicNo).name;
  }

  // next element
  if (elementData.number + 1 < 120) {
    nextAtomicNo = parseInt(elementData.number + 1);
    const nextElement = findElement(nextAtomicNo);
    nextElementName = nextElement.name;
  }

  const handleChangeElement = (atomicNum) => {
    if (atomicNum > 0 && atomicNum < 120) {
      const clickedElement = findElement(atomicNum);
      setElementData(clickedElement);
    }
  };

  const calculateTempEquivs = (value) => {
    let kelvin = value;
    let temp = value;
    if (kelvin != null) {
      // 1K − 273.15 = -272.1°C
      kelvin = kelvin.toFixed(2);
      const celsius = (kelvin - 273.15).toFixed(2);
      const fahrenheit = ((celsius * 9) / 5 + 32).toFixed(2);
      temp = `${kelvin}K = ${celsius}°C = ${fahrenheit}°F`;
    }
    return temp;
  };

  useEffect(() => {
    AppUserGetDb().then((data) => {
      setFav(data["favourites"]);
    });
  }, []);

  const handleAdd = (elementData) => {
    console.log("add element", elementData);
    console.log("favourites in element", fav);
    if (fav.some((element) => element.number === elementData.number)) {
      toast.error(`${elementData.name} already in favourites`);
    } else {
      AppUserFavourites(elementData).then((res) => {
        if (res === true) {
          toast.success(`${elementData.name} added in favourites`);
          fav.push(elementData);
        } else {
          toast.error("Element already exists in favourites");
        }
      });
    }
  };

  return (
    <ReactModal
      overlayClassName="ele-detail-container"
      className="ele-det-holder"
      name={elementData.name}
      isOpen={showElementModal}
      onRequestClose={handleCloseModal}
      contentLabel={elementData.name}
      shouldCloseOnOverlayClick={true}
    >
      <section className="ele-det-holder">
        <header className="ele-det-header">
          <img
            className="ele-det-header-img"
            src={elementData.image.url}
            alt={elementData.name}
          />
          <div className="ele-det-header-inner">
            <header className="ele-det-header-top-box">
              <div className="ele-det-header-controls">
                <div
                  className="ele-det-ctrl-top ele-det-back-btn"
                  onClick={handleCloseModal}
                ></div>
                <a href={elementData.source} rel="noreferrer" target="_blank">
                  <div className="ele-det-ctrl-top ele-det-wiki-btn"></div>
                </a>
              </div>

              <div className="ele-det-header-top">
                <div
                  className="ele-det-header-element-tag"
                  style={{ background: props.colorMap[elementData.category] }}
                >
                  <div className="flex-row">
                    <div className="ele-det-header-atomic-no">
                      {elementData.number}
                    </div>
                    <div className="ele-det-header-categoy-name">
                      {elementData.category}
                    </div>
                  </div>
                </div>
              </div>

              <div className="ele-det-header-element flex-row">
                <div className="ele-det-header-symbol">
                  {elementData.symbol}
                </div>
                <div className="ele-det-header-element-name-box">
                  <div className="ele-det-header-name">{elementData.name}</div>
                  <div className="ele-det-header-weight">
                    {elementData.atomic_mass}(g/mol)
                  </div>
                </div>
                <button
                  className="add-fav-btn"
                  style={
                    favHover === true
                      ? {
                          transitionDuration: "0.3s",
                          background: props.colorMap[elementData.category],
                        }
                      : {
                          transitionDuration: "0.3s",
                        }
                  }
                  onClick={() => handleAdd(elementData)}
                  onMouseEnter={() => setFavHover(true)}
                  onMouseLeave={() => setFavHover(false)}
                >
                  Mark as favourite
                </button>
              </div>
            </header>
            <footer className="ele-det-header-footer flex-row">
              <div
                onClick={() => handleChangeElement(prevAtomicNo)}
                className="ele-det-nav-btn ele-prev-btn"
              >
                {prevAtomicNo} &#x2022; {prevElementName}
              </div>
              <div
                onClick={() => handleChangeElement(nextAtomicNo)}
                className="ele-det-nav-btn ele-next-btn"
              >
                {nextAtomicNo} &#x2022; {nextElementName}
              </div>
            </footer>
          </div>
        </header>
        <footer className="ele-det-footer-box">
          <ElementLable label="Overview" />
          <ElementValue label="Name" value={elementData.name} />

          <ElementValue label="Summary: " value={elementData.summary} />
          <ElementValue
            label="Discovered by: "
            value={elementData.discovered_by ? elementData.discovered_by : "--"}
          />
          <ElementValue
            label="Named by: "
            value={elementData.named_by ? elementData.named_by : "--"}
          />
          <ElementValue
            label="Appearance"
            value={elementData.appearance ? elementData.appearance : "--"}
          />
          <ElementValue
            label="Electron Shells"
            value={elementData.shells ? elementData.shells : "--"}
          />

          <ElementLable label="Properties" />
          <ElementValue label="Atomic Number: " value={elementData.number} />
          <ElementValue
            label="Atomic Mass: "
            value={`${elementData.atomic_mass} (g/mol)`}
          />
          <ElementValue
            label="Density: "
            value={`${elementData.density} (g/cm³)`}
          />
          <ElementValue label="Phase: " value={elementData.phase} />
          <ElementValue
            label="Molar Heat: "
            value={`${elementData.molar_heat} J/(mol·K)`}
          />
          <ElementValue
            label="Melting Point: "
            value={calculateTempEquivs(elementData.melt)}
          />
          <ElementValue
            label="Boiling Point: "
            value={calculateTempEquivs(elementData.boil)}
          />
          <ElementValue label="Group: " value={elementData.xpos} />
          <ElementValue label="Period: " value={elementData.ypos} />
          <ElementValue
            label="Emmision spectrum: "
            value={elementData.spectral_img ? elementData.spectral_img : "N/A"}
          />

          <ElementLable label="Atomic Properties" />
          <ElementValue
            label="Electron Configuration: "
            value={elementData.electron_configuration}
          />

          <ElementLable label="Reactivity" />
          <ElementValue
            label="Electronegativity Pauling: "
            value={elementData.electronegativity_pauling}
          />
          <ElementValue
            label="Electron Affinity: "
            value={`${elementData.electron_affinity} kJ/mol`}
          />
        </footer>
      </section>
      <div className="bottom-space"></div>
    </ReactModal>
  );
}

export default Element;
