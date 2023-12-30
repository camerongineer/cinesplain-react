import {
    alpha,
    createTheme
} from "@mui/material";

const defaultTheme = createTheme(
    {
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
        
        components: {
            MuiCssBaseline: {
                styleOverrides: themeParam => ({
                    body: {
                        background: `linear-gradient(100deg,
                            ${themeParam.palette.secondary.main}80,
                            ${themeParam.palette.secondary.main}25,
                            ${themeParam.palette.secondary.main}80),
                            ${themeParam.palette.background.default}`
                    },
                    "&::-webkit-scrollbar": {
                        width: "10px"
                    },
                    "&::-webkit-scrollbar-track": {
                        background: alpha(themeParam.palette.secondary[themeParam.palette.mode], 0.6)
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: alpha(themeParam.palette.secondary[themeParam.palette.mode], 0.5),
                        borderRadius: "10px",
                        outline: `1px solid ${alpha(themeParam.palette.secondary[themeParam.palette.mode], 0.3)}`
                    },
                    "a": {
                        textDecoration: "none"
                    }
                })
            }
        }
    });

export default defaultTheme;