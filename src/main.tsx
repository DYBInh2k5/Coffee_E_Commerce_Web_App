import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { registerServiceWorker } from "./utils/serviceWorker";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

// Register service worker for PWA
registerServiceWorker();
