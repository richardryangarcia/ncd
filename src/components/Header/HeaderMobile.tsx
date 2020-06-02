import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Header } from "./Header";
import { Flyout } from "./Flyout";
// import { LoginModal } from "../Authentication/LoginRegisterModal";
// import { logout } from "../../store/_authActions";
import Logo from "../../images/logo.svg";
import { text } from "@fortawesome/fontawesome-svg-core";

type HeaderMobileProps = {
  user: any;
  logout: () => void;
};

export const HeaderMobile: React.FC<HeaderMobileProps> = ({ user, logout }) => {
  const userLogin = user ? (
    <NavDropdown
      title={<FontAwesomeIcon icon={faUserCircle} />}
      id='basic-nav-dropdown'
    >
      <NavDropdown.Item href='#'>{user.email}</NavDropdown.Item>
      <NavDropdown.Item href='#'>Edit Profile</NavDropdown.Item>
      <NavDropdown.Item
        href='#'
        onClick={() => {
          logout();
        }}
      >
        Logout
      </NavDropdown.Item>
    </NavDropdown>
  ) : (
    // <LoginModal />
    <div />
  );
  return (
    <Navbar
      id='navbar'
      fixed='top'
      collapseOnSelect
      expand='lg'
      bg='white'
      variant='light'
      className='main-header'
    >
      <Flyout />
      <Nav className='mobile'>{userLogin}</Nav>
      <Header userLogin={userLogin} />
    </Navbar>
  );
};
