import React, { useState } from "react";
import styled from "styled-components";
import Router from "./Router";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;
const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

function Root() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
export default Root;
