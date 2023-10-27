import "../images/c_marr_icon.png";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./header/Header";
import MoviePage from "./content/moviePage/MoviePage";
import { Box, styled, ThemeProvider } from "@mui/material";
import defaultTheme from "../themes/defaultTheme";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

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
                <DndProvider backend={HTML5Backend}>
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
                </DndProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;