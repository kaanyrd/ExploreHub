import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { AuthenticationProvider } from "./context/Authentication";
import { BookmarksContextProvider } from "./context/Bookmarks";
import { SearchingContextProvider } from "./context/Searching";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AuthenticationProvider>
      <BookmarksContextProvider>
        <SearchingContextProvider>
          <App />
        </SearchingContextProvider>
      </BookmarksContextProvider>
    </AuthenticationProvider>
  </Provider>
);
