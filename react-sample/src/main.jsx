import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import GroceryApp from "./grocery/App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <br></br>
    <h1>----------------------------</h1>
    <GroceryApp />
  </StrictMode>
);
