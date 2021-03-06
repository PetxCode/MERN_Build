import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../Global/AuthProvider";
import axios from "axios";
import pizza from "./pizza.jpg";
import { useNavigate } from "react-router-dom";

const CreateStore = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);

  const [avatar, setAvatar] = useState(pizza);
  const [imageUpload, setImageUpload] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const onChangeImage = (e) => {
    const file = e.target.files[0];
    const save = URL.createObjectURL(file);
    setAvatar(save);
    setImageUpload(file);
  };

  const onSubmitImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("image", imageUpload);
    formData.append("name", name);
    formData.append("price", price);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    await axios.post("http://localhost:5599/upload", formData, config);

    navigate("/");
    // window.location.reload();
  };

  return (
    <div>
      <Container>
        <Wrapper>
          <Name>Welcome back {userData?.name}</Name>

          <Holder onSubmit={onSubmitImage} type="multipart/form-data">
            <Image src={avatar} />
            <Lebal htmlFor="pix">Upload your choice Image</Lebal>
            <ImageInput
              placeholder="Item Name"
              id="pix"
              onChange={onChangeImage}
              type="file"
            />

            <Input
              placeholder="Item Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Input
              placeholder="Item Price"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />

            <Button
              type="submit
            "
            >
              Add to Store
            </Button>
          </Holder>
        </Wrapper>
      </Container>
    </div>
  );
};

export default CreateStore;

const Button = styled.button`
  width: 100%;
  height: 40px;
  background: red;
  color: white;
  margin-top: 20px;
  border: 0;
  outline: none;
  transform: scale(1);
  transition: all 350ms;
  font-size: 20px;
  text-transform: uppercase;
  :hover {
    cursor: pointer;

    transform: scale(0.97);
  }
`;

const Input = styled.input`
  width: 100%;
  height: 35px;
  border: 1px solid gray;
  outline: none;
  border-radius: 3px;
  margin: 5px 0;
  padding-left: 10px;
`;

const ImageInput = styled.input`
  display: none;
`;

const Lebal = styled.label`
  margin-bottom: 20px;
  padding: 15px 30px;
  background: red;
  color: white;
  border-radius: 3px;
  transform: scale(1);
  transition: all 350ms;

  :hover {
    cursor: pointer;
    transform: scale(0.97);
  }
`;

const Image = styled.img`
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  width: 300px;
  height: 200px;
  border-radius: 5px;
  background: white;
  object-fit: cover;
  margin: 20px 0;
`;

const Holder = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Name = styled.div`
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 50px;
`;

const Wrapper = styled.div`
  padding: 40px 0;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 100px);
  height: 100%;
  background: lightgray;
`;
