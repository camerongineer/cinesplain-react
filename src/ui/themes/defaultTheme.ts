import { createTheme } from "@mui/material";

const defaultTheme = createTheme({
    
    palette: {
        mode: "light",
        primary: {
            main: "#7925c2"
        },
        secondary: {
            main: "#f7006b"
        }
    },
    
    typography: {
        "fontFamily": "Quicksand, Roboto"
    },
    
    transitions: {
        duration: {
            complex: 1000
        }
    },
});

export default defaultTheme;