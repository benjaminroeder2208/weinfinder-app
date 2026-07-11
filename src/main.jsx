import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";
import TenantApp from "./App.jsx";
import ConfirmPage from "./pages/ConfirmPage.jsx";
import UnsubscribePage from "./pages/UnsubscribePage.jsx";
import PrivacyPage from "./pages/PrivacyPage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/w/:slug/datenschutz" element={<PrivacyPage />} />
        <Route path="/w/:slug/*" element={<TenantApp />} />
        <Route path="/confirm/:token" element={<ConfirmPage />} />
        <Route path="/unsubscribe/:token" element={<UnsubscribePage />} />
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
