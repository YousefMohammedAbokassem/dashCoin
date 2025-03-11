import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./scss/index.scss";
import "./i18.js";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";

// import { ThemeProvider, createTheme } from "@mui/material/styles";
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#1d4c6a",
//     },
//   },
// });

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <HelmetProvider>
      {/* <ThemeProvider theme={theme}> */}
      <App />
    </HelmetProvider>
    {/* <Notification /> */}
    {/* </ThemeProvider> */}
  </Provider>
);
