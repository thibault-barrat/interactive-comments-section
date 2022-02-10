import React from "react";
import ReactDOM from "react-dom";
import { AppStateProvider } from "./utils/context";
import '../src/styles/style.scss';
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <AppStateProvider>
      <App />
    </AppStateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
