import React, { useState } from "react";
import "../App.css";
import { useCart } from "../context/CartContext";
import { BsCart3, BsTrash } from "react-icons/bs";
import { Button, Offcanvas, Card } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import "../globals.css";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { RiComputerLine } from "react-icons/ri";

function Navbar() {
  const navigate = useNavigate();

  const { authUser, setAuthUser } = useAuthContext();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleAdminClick = () => {
    navigate("/admin");
  };

  const handleSellerClick = () => {
    navigate("/seller");
  };
  const handleCustomerClick = () => {
    navigate("/customer");
  };

  const handleLogout = () => {
    localStorage.removeItem("userinfo");
    setAuthUser(null);
    navigate("/");
  };

  const { cartItems, cartCount, removeFromCart } = useCart();
  const [showCart, setShowCart] = useState(false);

  const handleCloseCart = () => setShowCart(false);
  const handleToggleCart = () => setShowCart((prev) => !prev);

  const handleRemove = (product) => {
    removeFromCart(product);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <header className="p-3 text-bg-dark sticky">
      <div className="container pe-0">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link
            to="/"
            className="d-flex align-items-center  mb-lg-0 text-white text-decoration-none me-3"
          >
            <RiComputerLine size={36} />
            <p className="ps-3 fs-3 fw-semibold mb-0">Computer Dokan</p>
          </Link>

          <ul className="nav col-12 col-lg-auto me-lg-auto mt-2 justify-content-center mb-md-0">
            <li>
              <Link to="/" className="nav-link px-2 text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/pc-builder" className="nav-link px-2 text-white">
                PC Builder
              </Link>
            </li>

            <li>
              <Link to={`/compare`} className="nav-link px-2 text-white">
                Compare
              </Link>
            </li>
            <li>
              <div
                style={{ width: "3rem", height: "3rem", position: "relative" }}
              >
                <Button
                  variant=""
                  onClick={handleToggleCart}
                  className="nav-link px-2 text-white"
                >
                  <BsCart3 size={30} />
                </Button>
                <div
                  className="rounded-circle bg-danger d-flex justify-content-center aligh-items-center"
                  style={{
                    color: "white",
                    width: "1.5rem",
                    height: "1.5rem",
                    position: "absolute",
                    top: 0,
                    right: 0,
                    transform: "translate(50%,-25%)",
                  }}
                >
                  {cartCount}
                </div>
              </div>
            </li>
          </ul>

          <form
            onSubmit={handleSearch}
            className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
            role="search"
          >
            <input
              type="search"
              className="form-control form-control-dark text-bg-dark"
              placeholder="Search..."
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <div className="text-end d-flex">
            <div>
              {authUser ? (
                <div className="py-2">
                  <Link to="/chat" className="btn btn-primary mr-2">
                    Chat
                  </Link>
                  {authUser.userType === "admin" && (
                    <button
                      type="button"
                      className="btn btn-primary mr-2 ms-3"
                      onClick={handleAdminClick}
                    >
                      Admin Panel
                    </button>
                  )}
                  {authUser.userType === "customer" && (
                    <button
                      type="button"
                      className="btn btn-primary mr-2 ms-3"
                      onClick={handleCustomerClick}
                    >
                      DiscussionForum
                    </button>
                  )}
                  {authUser.userType === "seller" && (
                    <button
                      type="button"
                      className="btn btn-primary mr-2 ms-3"
                      onClick={handleSellerClick}
                    >
                      Seller Panel
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-danger ms-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    type="button"
                    className="btn btn-primary me-3"
                    onClick={handleLoginClick}
                  >
                    Login
                  </button>
                  <Link to={"/signup"}>
                    <button type="button" className="btn btn-light">
                      Sign Up
                    </button>
                  </Link>
                </div>
              )}
            </div>
            {authUser ? (
              <button type="button" className="btn text-white ">
                <Link to="/profile" style={{ textDecoration: "none" }}>
                  <FaUserCircle size={36} color="white" />
                </Link>
              </button>
            ) : null}
            {/* <button type="button" className="btn btn-warning">
              Ipsum
            </button> */}
          </div>
        </div>
      </div>
      <Offcanvas
        show={showCart}
        onHide={handleCloseCart}
        placement="end"
        scroll={true}
        backdrop={false}
      >
        <Offcanvas.Header
          style={{
            backgroundColor: "rgb(50,50,50)",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Offcanvas.Title style={{ color: "white" }}>
            Your Cart
          </Offcanvas.Title>
          <Button
            variant=""
            onClick={handleCloseCart}
            style={{ color: "white" }}
          >
            <AiOutlineClose size={25} />
          </Button>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ backgroundColor: "rgb(252, 252, 252)" }}>
          <div
            className="d-flex flex-column flex-wrap"
            style={{ paddingBottom: "120px", width: "100%" }}
          >
            {/* Map through cartItems to render cart content */}
            {cartItems.map((item, index) => (
              <div>
                <Card
                  key={index}
                  className="mb-3 position-relative"
                  style={{
                    width: "100%",
                    transition: "box-shadow 0.3s ease",
                    overflow: "hidden",
                    border: "none",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0px 0px 15px 5px rgba(0,0,0,0.1)";
                    e.currentTarget.querySelector(
                      ".card-img-top"
                    ).style.transform = "scale(1.1)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.boxShadow = "";
                    e.currentTarget.querySelector(
                      ".card-img-top"
                    ).style.transform = "scale(1)";
                  }}
                >
                  <Card.Header
                    className="position-relative p-2"
                    style={{ backgroundColor: "transparent", border: "none" }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0%",
                        right: "0%",
                        transform: "translateY(0%)",
                      }}
                    >
                      <div
                        onClick={() => handleRemove(item)}
                        onMouseOver={(e) => {
                          e.target.style.color = "red";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.color = "";
                        }}
                      >
                        <AiOutlineClose
                          size={15}
                          style={{
                            cursor: "pointer",
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                        />
                      </div>
                    </div>
                  </Card.Header>

                  <Link
                    to={`/product/${item.id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div className="d-flex">
                      <Card.Img
                        className="card-img-top"
                        src={`http://localhost:5000/uploads/${item.image}`}
                        style={{ width: "100px", height: "100px" }}
                      />
                      <Card.Body>
                        <Card.Title style={{ fontSize: "12px" }}>
                          {item.product}
                        </Card.Title>
                        <Card.Text style={{ fontSize: "12px" }}>
                          TK {item.price} x {item.quantity}
                        </Card.Text>
                      </Card.Body>
                    </div>
                  </Link>
                </Card>
                <hr style={{ width: "100%", margin: "5px 0" }} />
              </div>
            ))}
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "50px",
              left: "0",
              right: "0",
              backgroundColor: "rgb(242,242,242)",
              color: "black",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p></p>
            <p></p>
            <hr style={{ width: "100%", margin: "5px 0" }} />
            <div>
              <strong>
                Total: TK{" "}
                {cartItems.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )}
              </strong>{" "}
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "0",
              left: "0",
              right: "0",
              backgroundColor: "rgb(242,242,242)",
              color: "black",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link to="/cart" style={{ width: "100%" }}>
              <Button variant="dark" style={{ width: "100%" }}>
                Checkout
              </Button>
            </Link>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
}

export default Navbar;
