import React, {useState} from "react";
import DisplaySearchElement from "./DisplaySearchElement";
import { useDataLayerValue } from "../context-api/DataLayer";
import { actionTypes } from "../context-api/reducer";
import '../../App.css';
import Modal from 'react-modal';
import Element from "../../Modal/Element";

const SearchElements = (props) => {
    const [{ elements, colorMap }] = useDataLayerValue();
    const [{ searchList, periodicSearch}, dispatch] = useDataLayerValue();
    const [byAtomicNumber, setByAtomicNumber] = useState('navbar-sort-type navbar-sort-selected');
	const [byName, setByName] = useState('navbar-sort-type');
	const [bySymbol, setBySymbol] = useState('navbar-sort-type');
    const [byAtomicMass, setByAtomicMass] = useState('navbar-sort-type');
    const [showElementModal, setShowElementModal] = useState(false);
    const [elementsData, setElementsData] = useState(null);
    let elementData = searchList;

    //search elements
    const handleSearch = (value) => {
        const result = elements.filter((element) => element.name.toLowerCase().includes(value.toLowerCase()));

        dispatch({
            type: actionTypes.SEARCH_LIST,
            searchList: result
        })
    }

    // OPEN CLOSE MENU ANIMATION
	const searchModalState = (value) => {
		switch (value) {
			case "hidebx":
				props.searchModalFunc(false)
				props.func('menu-tapped')
				break
				
			default:
				props.searchModalFunc(true)
				props.func('')
			break
		}
	}

	// CLOSE MODAL
	const closeDetailsModal = (value) => {
		props.searchModalFunc(false)
		searchModalState(value)
		dispatch({
			type: actionTypes.SEARCH_UI_TOGGLE,
			periodicSearch: "hidebx"
		})
	}

    //Sorting logic
    
	const sortByValue = (value) => {
        //atomic number
        if(value === 'atomic-number'){
            let sortByAtomicNumber = elements;
            sortByAtomicNumber = sortByAtomicNumber.sort((a, b) => a.number - b.number)
                dispatch({
                    type: actionTypes.SEARCH_LIST,
                    searchList: sortByAtomicNumber
                })
                setByName('navbar-sort-type')
                setBySymbol('navbar-sort-type')
                setByAtomicMass('navbar-sort-type')
                setByAtomicNumber('navbar-sort-type navbar-sort-selected')
        }
        // By Name
		if (value === 'name'){
			const sortByName = elementData.sort((a, b) => a.name.localeCompare(b.name));
			dispatch({
				type: actionTypes.SEARCH_LIST,
				searchList: sortByName
			})
			setByAtomicNumber('navbar-sort-type')
			setBySymbol('navbar-sort-type')
            setByAtomicMass('navbar-sort-type')
			setByName('navbar-sort-type navbar-sort-selected')
		}
        // By Symbol
		if (value === 'symbol'){
			const sortBySymbol = elements;
			sortBySymbol.sort((a, b) => a.symbol.localeCompare(b.symbol))
			dispatch({
				type: actionTypes.SEARCH_LIST,
				searchList: sortBySymbol
			})
			setByAtomicNumber('navbar-sort-type')
			setByName('navbar-sort-type')
            setByAtomicMass('navbar-sort-type')
			setBySymbol('navbar-sort-type navbar-sort-selected')
		}
        //By Mass
        if (value === 'atomic-mass'){
            const sortByAtomicMass = elements;
            sortByAtomicMass.sort((a, b) => a.atomic_mass - b.atomic_mass)
            dispatch({
                type: actionTypes.SEARCH_LIST,
                searchList: sortByAtomicMass
            })
            setByAtomicNumber('navbar-sort-type')
			setByName('navbar-sort-type')
			setBySymbol('navbar-sort-type')
            setByAtomicMass('navbar-sort-type navbar-sort-selected')
        }
    }

    // NAV BAR TABS
	const handleNavBarElementTab = (atomicNo) => {
		// closeDetailsModal(periodicSearch) // close search modal
		const selectedElement = searchList.filter((element) => element.number === atomicNo)[0]
		setShowElementModal(true);
        setElementsData(selectedElement);
	}

    const handleCloseElementModal = () => {
        setShowElementModal(false);
        setElementsData(null);
        // props.searchModalVal = true
    }

    return(
        <>
        {showElementModal && (
            <Element
              isOpen={showElementModal}
              element={elementsData}
              handleClose={handleCloseElementModal}
              colorMap={colorMap}
            />
        )}
        <Modal overlayClassName={`navbar-search-container ${periodicSearch}`}
            className="navbar-search-inner flex-row"
            isOpen={props.searchModalVal}
            shouldCloseOnOverlayClick={true}
            onRequestClose={() => {
                closeDetailsModal(periodicSearch)
            }}
            shouldFocusAfterRender={false}
        >
            <input type="text"
                onChange={(e) => handleSearch(e.target.value)}
                onKeyPress={(e) => handleSearch(e.target.value)}
                className={`navbar-search-txtbox navbar-item`} 
                placeholder="Search elements by name..."
            />
            <div className="navbar-search-sort-box flex-row">
                <div onClick={() => sortByValue('atomic-number')} className={byAtomicNumber}>Atomic Number</div>
                <div onClick={() => sortByValue('name')} className={byName}>Name</div>
                <div onClick={() => sortByValue('symbol')} className={bySymbol}>Symbol</div>
                <div onClick={() => sortByValue('atomic-mass')} className={byAtomicMass}>Atomic Mass</div>
            </div>
            <aside className="navbar-search-tab-container">
                <section className="navbar-search-tab-box flex-row">
                    {elementData.map((element, keyId) => {
                        return <DisplaySearchElement key={keyId} bomb={element.number} func={handleNavBarElementTab} element={element} />
                    })}
                </section>
            </aside>
        </Modal>
        </>
    )
}

export default SearchElements;