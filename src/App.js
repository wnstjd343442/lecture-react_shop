import React, { useState } from "react";
import { Navbar, Container, Nav, NavDropdown, Card } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import "./App.css";
import Data from "./data.js";
import Product from "./Product.js";
import Detail from "./Detail";
import { Link, Route, Switch } from "react-router-dom";
import axios from "axios";
import Cart from "./Cart";
function App() {
  let [shoes, shoes변경] = useState(Data);
  let [재고, 재고변경] = useState([11, 12, 13]);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/detail">
                Detail
              </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>
        <Route exact path="/">
          <div class="jumbotron">
            <h1 class="display-4">20% Season Off</h1>
            <p class="lead">
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.
            </p>
            <hr class="my-4" />
            <p>
              It uses utility classes for typography and spacing to space
              content out within the larger container.
            </p>
            <p class="lead">
              <a class="btn btn-primary btn-lg" href="#" role="button">
                Learn more
              </a>
            </p>
          </div>
          <div className="container">
            <div className="row">
              {shoes.map(function (a, i) {
                return <Product shoes={shoes[i]} i={i}></Product>;
              })}
            </div>

            <button
              className="btn btn-primary"
              onClick={() => {
                // axios.post("서버URL", { id: "codingapple", pw: 1234 });

                axios
                  .get("https://codingapple1.github.io/shop/data2.json")
                  .then((result) => {
                    shoes변경([...shoes, ...result.data]);
                  });
              }}
            >
              더보기
            </button>
          </div>
        </Route>

        <Route path="/detail/:id">
          <Detail shoes={shoes} 재고={재고} 재고변경={재고변경}></Detail>
        </Route>

        <Route>
          <Cart path="/cart"></Cart>
        </Route>

        <Route path="/:id">
          <div>아무것</div>
        </Route>
      </Switch>

      {/* <Route path="/어쩌구" component={modal}></Route>*/}
    </div>
  );
}

export default App;
