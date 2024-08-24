import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import store from "./store/store.ts";
import { Provider } from "react-redux";
import { ErrorBoundary } from "./components/index.ts";
import { Suspense } from "react";
import { BiLoaderCircle } from "react-icons/bi";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Suspense
    fallback={
      <div className="w-screen h-screen flex justify-center items-center">
        <BiLoaderCircle className="size-10 md:size-20 animate-spin text-[#EA580C] duration-75 ease-in" />
      </div>
    }
  >
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </Suspense>
);
