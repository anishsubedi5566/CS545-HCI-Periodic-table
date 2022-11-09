import React, {useState} from "react";
import ReactModal from 'react-modal';
import '../App.css';

ReactModal.setAppElement('#root');

const colorMap = {
    "noble gas": "#FFBC42",
    "alkaline earth metal": "#EC674E",
    "diatomic nonmetal": "#D81159",
    "polyatomic nonmetal": "#FF4500",
    "alkali metal": "#8F2D56",
    "transition metal": "#191970",
    "post-transition metal": "#218380",
    "lanthanide": "#4AABAF",
    "actinide": "#DC143C",
    "metalloid": "#73D2DE",
    "unknown, probably transition metal": "#191970",
    "unknown, probably post-transition metal": "#218380",
    "unknown, probably metalloid": "#73D2DE",
    "unknown, but predicted to be an alkali metal": "#8F2D56",
    "unknown, predicted to be noble gas": "#FFBC42"
};  

function Element(props){
    const [showElementModal, setShowElementModal] = useState(props.isOpen);
    const [elementData, setElementData] = useState(props.element);
    
    const handleCloseModal = () => {
        setShowElementModal(false);
        setElementData(null);
        props.handleClose();
    }

    return(
        <div>
            <ReactModal 
                overlayClassName="ele-detail-container"
                className='ele-det-holder'
                name={elementData.name}
                isOpen={showElementModal}
                onRequestClose={handleCloseModal}
                contentLabel={elementData.name}
                shouldCloseOnOverlayClick={true}
            >
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
                                <div className="ele-det-header-element-tag" style={{ background: colorMap[elementData.category] }}>
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
                                <div className="ele-det-header-symbol">{elementData.symbol}</div>
                                <div className="ele-det-header-element-name-box">
                                    <div className="ele-det-header-name">{elementData.name}</div>
                                    <div className="ele-det-header-weight">{elementData.atomic_mass}(g/mol)</div>
                                </div>
                            </div>
                        </header>
                    </div>
                </header>
            </ReactModal>
        </div>
    )
}

export default Element;