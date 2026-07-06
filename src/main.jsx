import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";
import TenantApp from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/w/:slug/*" element={<TenantApp />} />
        <Route
          path="*"
          element={
            <div className="screen">
              <h1>Weinfinder</h1>
              <p>Kein Shop angegeben. Bitte über den Link deines Weinshops aufrufen.</p>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
