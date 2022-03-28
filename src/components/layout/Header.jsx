import React, { Fragment, useRef } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { MdComputer } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormControl } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { authActions } from "../../store/auth-slice";

function Header() {
  const cartQuantity = useSelector((state) => state.cart.cartQuantity);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.auth.userId);

  const searchRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const searchHandler = (event) => {
    event.preventDefault();

    const query = searchRef.current.value;
    navigate({
      pathname: "/search",
      search: createSearchParams({ q: query }).toString(),
    });

    searchRef.current.value = "";
  };

  const logoutHandler = () => {
    dispatch(authActions.logout())
    navigate("/", {replace: true})
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
      <Container>
        <Link to="/" className="navbar-brand">
          <MdComputer className="fs-3 me-1" />
          React Products
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-4 mx-lg-auto my-4 my-lg-0">
            <Form
              className="d-flex align-items-center"
              onSubmit={searchHandler}
            >
              <FormControl
                type="search"
                placeholder="Search Product"
                aria-label="Search"
                ref={searchRef}
              />
              <Button
                type="submit"
                className="btn-warning"
                style={{ marginLeft: "-1rem" }}
              >
                <BsSearch size="1.25rem" />
              </Button>
            </Form>
          </Nav>
          <Nav className="ms-auto gap-3 fs-6 align-items-center">
            <Link
              to="/"
              className="text-decoration-none text-light text-center"
            >
              Home
            </Link>
            {!isLoggedIn && (
              <Link
                to="/login"
                className="text-decoration-none text-light text-center"
              >
                Login
              </Link>
            )}
            {isLoggedIn && (
              <Fragment>
                <Link
                  to={`/user/${userId}`}
                  className="text-decoration-none text-light text-center"
                >
                  My Account
                </Link>
                <button className="btn btn-dark fs-6 p-0" onClick={logoutHandler}>
                  Logout
                </button>
              </Fragment>
            )}
            <Link className="btn btn-success" to="/cart">
              <TiShoppingCart size="1.25rem" />
              <span className="ms-2">Cart</span>
              <span className="badge bg-danger rounded-circle ms-2">
                {cartQuantity}
              </span>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
