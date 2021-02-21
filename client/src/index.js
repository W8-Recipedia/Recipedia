import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import * as serviceworker from "src/serviceworker";
import App from "src/app";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

serviceworker.unregister();
