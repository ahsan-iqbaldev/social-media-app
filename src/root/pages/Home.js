import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const Home = () => {
  return (
    <>
     <Link to='/signup'> <Button className="shad-button_primary">SignUp</Button> </Link>
     <Link to='/signin'>  <Button className="shad-button_primary">SignIp</Button></Link>
    </>
  );
};

export default Home;
