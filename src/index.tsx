import { DevSupport } from "@react-buddy/ide-toolbox";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./ui/styles/index.css";
import {
    ComponentPreviews,
    useInitial
} from "./dev";
import App from "./ui/components/App.tsx";

const root: ReactDOM.Root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <DevSupport
        ComponentPreviews={ComponentPreviews}
        useInitialHook={useInitial}
    >
        <StrictMode>
            <App/>
        </StrictMode>
    </DevSupport>);