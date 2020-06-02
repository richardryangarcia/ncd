import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Nav } from "react-bootstrap";
import mobileLogo from "./logoMobile.svg";
import fullLogo from "./logoFull.svg";
import { FlyoutContents } from "./FlyoutContents";

export const Flyout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleShow = () => setIsOpen(!isOpen);
  const display = isOpen ? "open" : "";

  return (
    <div className='new-flyout-menu'>
      <Navbar.Brand href='/home' id='brand-link' className='full'>
        <img src={fullLogo} alt='' height='25em' width='30em' />
      </Navbar.Brand>
      <Navbar.Brand
        href='#'
        onClick={toggleShow}
        id='brand-link-mobile'
        className='mobile'
      >
        <img src={mobileLogo} alt='' height='25em' width='30em' />
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`chevron ${display}`}
        />
      </Navbar.Brand>

      <div className={`modal-background ${display}`}>
        <div className='modal-container'>
          <FlyoutContents />
        </div>
      </div>
    </div>
  );
};
