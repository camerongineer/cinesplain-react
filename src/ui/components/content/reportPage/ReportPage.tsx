import {
    Box,
    styled
} from "@mui/material";
import React from "react";
import { useLoaderData } from "react-router-dom";
import UserInfo from "../../../../types/userInfo.ts";
import Login from "./Login.tsx";
import ReportForm from "./ReportForm.tsx";

const StyledBox = styled(Box)`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    align-items: center;
    gap: 1em;
`;

const reportPageLoader = async (): Promise<UserInfo | null> => {
    try {
        const response = await fetch("/.auth/me");
        const payload = await response.json();
        const { clientPrincipal } = payload;
        if (clientPrincipal.identityProvider === "aad") {
            clientPrincipal.identityDetails = "Microsoft";
        } else if (clientPrincipal.identityProvider === "github") {
            clientPrincipal.identityDetails = "Github";
        } else {
            clientPrincipal.identityDetails = null;
        }
        return clientPrincipal;
    } catch (error) {
        return null;
    }
};

const ReportPage: React.FC = () => {
    const userInfo = useLoaderData() as UserInfo;
    
    return (
        <StyledBox>
            {userInfo ? (
                <ReportForm userInfo={userInfo}/>
            ) : (
                <Login/>
            )}
        </StyledBox>
    );
};

export { reportPageLoader };
export default ReportPage;