import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./header/Header";
import { Stack, styled, ThemeProvider } from "@mui/material";
import defaultTheme from "../themes/defaultTheme";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import MainContent from "./content/MainContent";

const StyledApp = styled(Stack)`
  background: linear-gradient(100deg,
  ${props => props.theme.palette.primary[props.theme.palette.mode]}90,
  ${props => props.theme.palette.primary[props.theme.palette.mode]}05,
  ${props => props.theme.palette.primary[props.theme.palette.mode]}90);
  font-size: calc(10px + 2vmin);
  min-width: 280px;
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
                        <MainContent/>
                    </StyledApp>
                </DndProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;