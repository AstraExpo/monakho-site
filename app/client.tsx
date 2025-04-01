import { hydrateRoot } from "react-dom/client";
import { StartClient } from "@tanstack/start";
import { createRouter } from "./router";
import { ThemeProvider } from "./context/theme";

const router = createRouter();

hydrateRoot(
  document,
  <ThemeProvider>
    <StartClient router={router} />
  </ThemeProvider>
);