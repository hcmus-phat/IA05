import { createRoot } from "react-dom/client";
import { PhotoProvider } from "./context/PhotoContext.jsx";
import "./index.css";
import App from "./App.jsx";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PhotoProvider>
        <App />
      </PhotoProvider>
    </BrowserRouter>
  </StrictMode>
);
