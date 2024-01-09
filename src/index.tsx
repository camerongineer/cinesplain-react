import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./ui/styles/index.css";
import App from "./ui/components/App.tsx";

const root: ReactDOM.Root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
        <StrictMode>
            <App/>
        </StrictMode>);