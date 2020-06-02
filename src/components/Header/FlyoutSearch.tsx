import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FlyoutSearchContents } from "./FlyoutSearchContents";
// import { useDispatch, useSelector } from "react-redux";
// import { InitialStateType as SearchInitialStateType } from "../../store/_searchReducers";
// import { InitialStateType } from "../../store/index";
// import { searchByTerm, clearSearch } from "../../store/_searchActions";
import { Nav } from "react-bootstrap";

export const FlyoutSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const dispatch = useDispatch();
  // const search = useSelector<InitialStateType, SearchInitialStateType>(
  //   (state) => state.search
  // );
  const search = { results: {}, error: undefined };
  const show = () => setIsOpen(true);
  const hide = () => setIsOpen(false);
  const dispatchSubmitSearch = (searchTerm: string) => {
    // dispatch(searchByTerm(searchTerm.toUpperCase()));
  };

  const dispatchClearSearch = () => {
    // dispatch(clearSearch());
  };

  const display = isOpen ? "open" : "";
  return (
    <div>
      <Nav.Link>
        <button onClick={show}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </Nav.Link>
      <div className={`search-modal-background ${display}`}>
        <button onClick={hide} className='close-menu-btn'>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className='modal-container'>
          <div className='exit-modal' role='button' onClick={hide} />

          {isOpen && (
            <FlyoutSearchContents
              dispatchSubmitSearch={dispatchSubmitSearch}
              results={search.results}
              error={search.error}
              hide={hide}
              dispatchClearSearch={dispatchClearSearch}
            />
          )}
        </div>
      </div>
    </div>
  );
};
