import "../images/c_marr_icon.png";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./header/Header";
import MoviePage from "./content/moviePage/MoviePage";
import { Box, Stack, styled, ThemeProvider } from "@mui/material";
import defaultTheme from "../themes/defaultTheme";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import HomePage from "./content/homePage/HomePage";

const StyledApp = styled(Stack)(({ theme }) => ({
    background: theme.palette.background.default,
    justifyContent: "center",
    alignItems: "center",
    fontSize: "calc(10px + 2vmin)",
    height: "100%",
    width: "100%",
    minWidth: "280px"
}));

const StyledMain = styled(Box)`
  max-width: ${props => props.theme.breakpoints.values.xl}px;
  width: 100%;
  text-align: center;
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
                <DndProvider backend={HTML5Backend}>
                    <StyledApp flexDirection={"column"}>
                        <Header selectedTab={selectedTab}
                                onSelectedTabChanged={setSelectedTab}
                        />
                        <StyledMain style={{}} height={"100%"} width={"100%"}>
                            <Routes>
                                <Route path="/"
                                       element={<HomePage />}/>
                                <Route path="/movies/:movieId"
                                       element={<MoviePage loadedMovie={null}/>}
                                />
                            </Routes>
                        </StyledMain>
                    </StyledApp>
                </DndProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;