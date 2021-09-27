import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/userActions';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <header>
      <Navbar
        className="py-3"
        bg="dark"
        expand="lg"
        variant="dark"
        collapseOnSelect
      >
        <Container className="d-flex justify-content-between">
          <LinkContainer to="/">
            <Navbar.Brand>
              <h4 className="text-info">
                BOOK<span className="text-light">SLOT</span>
              </h4>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/">
                <Nav.Link>
                  <i className="fas fa-home text-info">
                    <strong className="text-light"> HOME</strong>
                  </i>
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown
                  title={
                    <i className="fas fa-user text-info">
                      <strong className="text-light">
                        {' '}
                        {userInfo.user.firstname.toUpperCase()}
                        {'  '}
                      </strong>
                    </i>
                  }
                  id="username"
                >
                  <NavDropdown.Item
                    className="text-info font-weight-bold"
                    onClick={logoutHandler}
                  >
                    LOGOUT
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user text-info">
                      <strong className="text-light"> LOGIN</strong>
                    </i>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
