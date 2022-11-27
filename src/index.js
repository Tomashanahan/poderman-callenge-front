/* eslint-disable sort-keys */
import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import {ChakraProvider} from "@chakra-ui/react";
import {BrowserRouter} from "react-router-dom";
import {extendTheme} from "@chakra-ui/react";

import reportWebVitals from "./reportWebVitals";
import App from "./App";

const breakpoints = {
  sm: "375px",
  md: "400px",
  lg: "600px",
  xl: "1000px",
  "2xl": "1440px",
};
const theme = extendTheme({breakpoints});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
