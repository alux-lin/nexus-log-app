import React from "react";
import ReactDOM from "react-dom/client";
// 🎯 CHANGE HERE: Remove the .jsx extension
import App from "./NexusLogApp"; 
import "./index.css"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);