import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
// import { LoginModal } from "../Authentication/LoginRegisterModal";
import { LinkContainer } from "react-router-bootstrap";
import menuOptions from "./menuOption";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FlyoutSearch } from "./FlyoutSearch";

type HeaderProps = {
  userLogin: any;
};
export const Header: React.FC<HeaderProps> = ({ userLogin }) => {
  const handleRender = (options: any) => {
    return options.map((option: any, i: number) => {
      if (option.title === "Search") {
        return <div />;
      } else if (option.subMenuOptions.length) {
        return (
          <NavDropdown title={option.title} id='collasible-nav-dropdown'>
            {option.subMenuOptions.map((subOption: any, i: number) => {
              return (
                <NavDropdown.Item key={i} href={subOption.href}>
                  {subOption.title}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
        );
      } else {
        return (
          <LinkContainer key={i} to={option.href}>
            <Nav.Link>{option.title}</Nav.Link>
          </LinkContainer>
        );
      }
    });
  };
  return (
    <Navbar.Collapse id='responsive-navbar-nav'>
      <Nav className='mr-auto'>{handleRender(menuOptions.left)}</Nav>
      <Nav>
        {handleRender(menuOptions.right)}
        {userLogin}
      </Nav>
    </Navbar.Collapse>
  );
};
