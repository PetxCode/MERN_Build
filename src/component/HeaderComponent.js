import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../Global/AuthProvider";

const HeaderComponent = () => {
  const { userData } = useContext(AuthContext);
  return (
    <Container>
      <Wrapper>
        <Navigation>
          <Logo to="/">CodeLab Wilmer</Logo>
          {userData ? <Button to="/create">Create Store</Button> : null}
        </Navigation>

        <Navigation>
          <Button to="/register">Register</Button>
          <Button to="/sign">Log In</Button>
          <Button1
            onClick={() => {
              localStorage.removeItem("user");
              window.location.reload();
            }}
          >
            Log Out
          </Button1>
        </Navigation>
      </Wrapper>
    </Container>
  );
};

export default HeaderComponent;
// const Navigation = styled.div``
const Navigation = styled.div`
  display: flex;
  padding: 0 30px;
`;
const Button = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 15px 30px;
  background: ${({ bg }) => bg};
  font-size: 20px;
  transition: all 350ms;
  transform: scale(1);
  background: #f8003f;
  border-radius: 3px;
  margin: 0 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;

  :hover {
    cursor: pointer;
    transform: scale(0.97);
  }
`;
const Button1 = styled.div`
  padding: 15px 30px;
  background: ${({ bg }) => bg};
  font-size: 20px;
  transition: all 350ms;
  transform: scale(1);
  background: #f8003f;
  border-radius: 3px;
  margin: 0 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;

  :hover {
    cursor: pointer;
    transform: scale(0.97);
  }
`;

const Logo = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: white;
  font-size: 30px;
  font-style: italic;
  font-weight: bold;
  margin-right: 30px;
  margin-top: 5px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100px;
  justify-content: space-between;
`;
const Container = styled.div`
  width: 100%;
  height: 100px;
  background: #110841;
  color: white;
`;
