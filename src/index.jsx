import "./index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";
import "react-circular-progressbar/dist/styles.css";
import "react-toastify/dist/ReactToastify.css";

import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./store/store";
import { Provider } from "react-redux";

import reportWebVitals from "./reportWebVitals";
import { hydrateRoot } from "react-dom/client";
import { StrictMode } from "react";
import { HelmetProvider } from "react-helmet-async";
import registerIcons from "./config/fa.config";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import themeConfig from "./config/theme.config";
import { ThemeProvider } from "@mui/material/styles";

const queryClient = new QueryClient();

registerIcons();

const appElement = (
  <BrowserRouter>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <StrictMode>
            <ThemeProvider theme={themeConfig}>
              <App />
            </ThemeProvider>
          </StrictMode>
        </Provider>
      </QueryClientProvider>
    </HelmetProvider>
  </BrowserRouter>
);

const container = document.getElementById("root");
const hasChildNodes = container?.hasChildNodes() ?? false;
hasChildNodes ? hydrateRoot(container, appElement) : ReactDOM.createRoot(container).render(appElement);
serviceWorkerRegistration.unregister();
reportWebVitals();
