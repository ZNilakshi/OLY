import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // Import Redux Provider
import store from "./redux/store"; // Ensure the path is correct
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Wrap App with Provider */}
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
