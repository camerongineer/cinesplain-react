import "../../images/c_marr_icon.png";
import { Box, Grid, IconButton, styled, Tab, Tabs } from "@mui/material";
import React from "react";
import { HeaderLink } from "./Header";
import { StandardTypography } from "../../styles/Typography";
import SearchIcon from "@mui/icons-material/Search";

const SlidingLogo = styled("img")`
  width: 150px;
  position: relative;

  @keyframes slideIn {
    0% {
      left: -1000%;
    }

    25% {
      left: -1000%;
    }

    100% {
      left: 0;
    }
  }
`;

interface NavBarProps {
    selectedTab: number,
    onSelectedTabChanged: (newSelectedTab: number) => void,
    onSearchButtonClicked: () => void,
    animateLogo: boolean
}

const NavBar: React.FC<NavBarProps> = ({
    selectedTab,
    onSelectedTabChanged,
    onSearchButtonClicked,
    animateLogo
}) => {
    const handleTabClick = (_event: React.SyntheticEvent, value: number) => onSelectedTabChanged(value);
    
    return (
        <Grid container spacing={1}>
            <Grid item xs={4} sm={4} lg={2}>
                <Box>
                    <a href={"/"}>
                        <SlidingLogo
                            sx={{
                                animation: `${animateLogo ? "slideIn 2s forwards" : "none"}`
                            }}
                            src={require("../../images/c_marr_icon.png")}
                        />
                    </a>
                
                </Box>
            </Grid>
            <Grid item xs={4} sm={4} lg={3} sx={{ display: "flex" }}>
                <Tabs indicatorColor={"secondary"} textColor={"inherit"}
                      value={selectedTab}
                      onChange={handleTabClick}>
                    {Object.values(HeaderLink).
                        map((link, index) => <Tab key={index}
                                                  label={<StandardTypography>{link}</StandardTypography>}/>)}
                </Tabs>
            </Grid>
            <Grid item xs={3} sm={3} lg={5}/>
            <Grid item xs={1} display={"flex"} justifyContent={"end"}>
                <IconButton sx={{ marginLeft: "auto" }} onClick={onSearchButtonClicked}>
                    <SearchIcon/>
                </IconButton>
            </Grid>
        </Grid>
    );
};

export default NavBar;