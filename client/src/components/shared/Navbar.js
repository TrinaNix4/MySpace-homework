// import { Link, Outlet } from "react-router-dom"
 import NavDropdown from 'react-bootstrap/NavDropdown'
 import Nav from 'react-bootstrap/Nav'
 import Navbar from 'react-bootstrap/Navbar'
 import Container from 'react-bootstrap/Container'

import { Button } from "bootstrap";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const MyNavbar = () => {
  const auth = useContext(AuthContext);
  //   const {user} = useContext(AuthContext);
  //    if(user) => logout
  //    if(!user) => login/register
  const renderRightNav = () => {
    if (auth.user) {
      return <button onClick={auth.handleLogout}>Logout</button>;
    }
    return (
      <>
        <Link className="Nav-link" to="/login">Login</Link>
        <Link className="Nav-link" to="/register">Register</Link>
      </>
    );
  };

  const renderLeft = () => {
    //if we have a user, return the links we want to show(if logged in)
    if (auth.user) {
      return (
        <>
          <Link className="Nav-link" to="/home">Home Protected</Link>
        </>
      );
    }
  };
  
  return (

    <div style={{ display: "flex", justifyContent: "space-between" }}>
  

       <div>
     
        <Link className="Nav-link" to="/">Home</Link>
        <Link className="Nav-link" to="/about">About</Link>
        {renderLeft()}

      </div>
      <div>{renderRightNav()}</div> 
    
    
    
    </div>
  );
};









// const NavbarComp  = () => {
//   return (

// <div>
// <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
//   <Container>
//     <Navbar.Brand href="#home">My Starter Project</Navbar.Brand>
//     <Navbar.Toggle aria-controls="basic-navbar-nav" />
//     <Navbar.Collapse id="basic-navbar-nav">
//       <Nav className="me-auto">
//         <Nav.Link href="/home">Home</Nav.Link>
//         {/* TODO add path for login  */}
//         <Nav.Link href="/login">Login</Nav.Link>  
//         <Nav.Link href="/register">Register</Nav.Link>
//         <NavDropdown title="More" id="basic-nav-dropdown">
//           <NavDropdown.Item href="/">Home</NavDropdown.Item>
//           <NavDropdown.Item href="/login">Login</NavDropdown.Item>
//           <NavDropdown.Item href="/register">Register</NavDropdown.Item>
//           <NavDropdown.Divider />
//           <NavDropdown.Item href="TODO:add about page">About</NavDropdown.Item>
//         </NavDropdown>
//       </Nav>
//     </Navbar.Collapse>
//   </Container>
// </Navbar>


// </div>
//   )
// }





  export default MyNavbar