import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

if (!clientId) {
  console.error("REACT_APP_GOOGLE_CLIENT_ID não foi configurado corretamente!");
  throw new Error("Google Client ID não está disponível.");
}

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);