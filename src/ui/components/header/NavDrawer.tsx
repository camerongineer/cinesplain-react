import { Drawer, IconButton, List, ListItemButton, ListItemText, Tab, Tabs } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { HeaderLink } from "./Header";
import SearchField from "./SearchField";
import { StandardTypography } from "../../styles/Typography";

interface NavDrawerProps {
    searchQuery: string,
    selectedTab: number,
    onSearchQueryChanged: (newQuery: string) => void,
    onSearchQuerySubmit: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    onSelectedTabChanged: (newSelectedTab: number) => void
}

const NavDrawer: React.FC<NavDrawerProps> = ({
    searchQuery,
    selectedTab,
    onSearchQueryChanged,
    onSearchQuerySubmit,
    onSelectedTabChanged
}) => {
    const [open, setOpen] = useState<boolean>();
    const handleTabClick = (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement>) => console.log(
        event);
    return (
        <>

            <Drawer open={open} onClose={() => setOpen(false)}>
                <List>
                    {Object.values(HeaderLink).
                        map((link, index) =>
                            <ListItemButton key={index}
                                            onClick={handleTabClick}>
                                <ListItemText>
                                    <StandardTypography>{link}</StandardTypography>
                                </ListItemText>
                            </ListItemButton>)}
                </List>
            </Drawer>
            <IconButton sx={{ marginLeft: "auto" }} onClick={() => setOpen(!open)}>
                <MenuIcon/>
            </IconButton>
        </>
    );
};

export default NavDrawer;