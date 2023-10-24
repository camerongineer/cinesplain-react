import "../images/c_marr_icon.png";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./header/Header";
import MoviePage from "./content/MoviePage";
import { Box, styled, ThemeProvider, useTheme } from "@mui/material";
import defaultTheme from "../themes/defaultTheme";

const StyledApp = styled(Box)(({ theme }) => ({
    background: theme.palette.background.default,
    fontSize: "calc(10px + 2vmin)",
    height: "100%"
}));

const StyledMain = styled(Box)`
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  transition-delay: .5s;
  color: white;
`;

const App: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<number>(0);
    
    return (
        <ThemeProvider theme={defaultTheme}>
            <BrowserRouter>
                <StyledApp flexDirection={"column"}>
                    <Header selectedTab={selectedTab}
                            onSelectedTabChanged={setSelectedTab}
                    />
                    <StyledMain style={{}} height={"100%"} width={"100%"}>
                        <Routes>
                            <Route path="/movies/:movieId"
                                   element={<MoviePage loadedMovie={null}/>}
                            
                            />
                        </Routes>
                    </StyledMain>
                </StyledApp>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;