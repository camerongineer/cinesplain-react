import ReactDOM from "react-dom/client";
import "./ui/styles/index.css";
import App from "./ui/components/App.tsx";

const root: ReactDOM.Root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<App/>);