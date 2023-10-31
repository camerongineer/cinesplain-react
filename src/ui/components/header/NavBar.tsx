import { Box, Grid, IconButton, styled, useTheme } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const SlidingLogo = styled("img")`
  height: 30px;
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
    const theme = useTheme();
    const handleTabClick = (_event: React.SyntheticEvent, value: number) => onSelectedTabChanged(value);
    
    return (
        <Grid container spacing={1}>
            <Grid item xs={4} sm={4} lg={2}>
                <Box component={"a"} display={"flex"} alignItems={"center"} href={"/"}>
                    <SlidingLogo
                        sx={{
                            animation: `${animateLogo ? "slideIn 2s forwards" : "none"}`
                        }}
                        src={require("../../images/cs_logo_text.png")}></SlidingLogo>
                    <SlidingLogo
                        sx={{
                            animation: `${animateLogo ? "slideIn 2s forwards" : "none"}`,
                            height: "40px"
                        }}
                        src={require("../../images/cs_logo_up.png")}></SlidingLogo>
                </Box>
            </Grid>
            {/*<Grid item xs={4} sm={4} sx={{ display: "flex" }}>*/}
            {/*    <Tabs indicatorColor={"secondary"} textColor={"inherit"}*/}
            {/*          value={selectedTab}*/}
            {/*          onChange={handleTabClick}>*/}
            {/*        {Object.values(HeaderLink).*/}
            {/*            map((link, index) => <Tab key={index}*/}
            {/*                                      label={<StandardTypography>{link}</StandardTypography>}/>)}*/}
            {/*    </Tabs>*/}
            {/*</Grid>*/}
            <Grid item xs={4} sm={4}/>
            <Grid item xs={3} sm={3} lg={5}/>
            <Grid item xs={1} display={"flex"} justifyContent={"end"}>
                <IconButton sx={{ marginLeft: "auto" }} onClick={onSearchButtonClicked} title={"search"}>
                    <SearchIcon sx={{ color: theme.palette.text.primary }}/>
                </IconButton>
            </Grid>
        </Grid>
    );
};

export default NavBar;