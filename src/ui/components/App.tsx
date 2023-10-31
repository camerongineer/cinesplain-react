import "../images/c_marr_icon.png";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./header/Header";
import MoviePage from "./content/moviePage/MoviePage";
import { Stack, styled, ThemeProvider } from "@mui/material";
import defaultTheme from "../themes/defaultTheme";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import HomePage from "./content/homePage/HomePage";

const StyledApp = styled(Stack)`
  background: ${props => props.theme.palette.primary[props.theme.palette.mode]};
  font-size: calc(10px + 2vmin);
  min-width: 280px;
`;

const StyledMain = styled(Stack)`
  max-width: ${props => props.theme.breakpoints.values.xl}px;
  text-align: center;
  flex-direction: row;
  justify-content: space-evenly;
  transition-delay: .5s;
  color: ${props => props.theme.palette.text.primary};
`;

const App: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<number>(0);
    
    return (
        <ThemeProvider theme={defaultTheme}>
            <BrowserRouter>
                <DndProvider backend={HTML5Backend}>
                    <StyledApp className={"full center"}>
                        <Header selectedTab={selectedTab}
                                onSelectedTabChanged={setSelectedTab}
                        />
                        <StyledMain className={"full center"}>
                            <Routes>
                                <Route path="/"
                                       element={<HomePage/>}/>
                                <Route path="/movies/:movieId"
                                       element={<MoviePage/>}
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