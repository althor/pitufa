
import React from "react";

import Header from "./Header.jsx";
import Item from "./Item.jsx";

import "./App.css";

function App() {
  return (
    <div>
      <Header />

      <ol>
        <Item done={false} text={"First Todo"} />
      </ol>
    </div>
  );
}

export default App;