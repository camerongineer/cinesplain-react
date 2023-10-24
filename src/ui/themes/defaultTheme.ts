import { createTheme } from "@mui/material";

const defaultTheme = createTheme({
    
    palette: {
        background: {
            default: "#4895EF"
        }
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