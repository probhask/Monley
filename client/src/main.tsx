import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import store from "./store/store.ts";
import { Provider } from "react-redux";
import { ErrornBoundary } from "./components/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ErrornBoundary>
    <Provider store={store}>
      <App />
    </Provider>
  </ErrornBoundary>
);
