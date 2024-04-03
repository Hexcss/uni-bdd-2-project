import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./context/Auth/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
