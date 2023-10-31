import { createTheme } from "@mui/material";

const defaultTheme = createTheme({
    
    palette: {
        mode: "light"
    },
    
    typography: {
        "fontFamily": "Quicksand, Roboto"
    },
    
    transitions: {
        duration: {
            complex: 1000
        }
    }
})

export default defaultTheme