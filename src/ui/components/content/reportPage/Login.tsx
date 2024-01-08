import Github from "@assets/github.svg";
import Microsoft from "@assets/microsoft.svg";
import {
    Box,
    Button,
    Paper,
    styled,
    Typography
} from "@mui/material";
import React from "react";
import CSLoadingIcon from "../../common/CSLoadingIcon.tsx";

const StyledPaper = styled(Paper)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 4em;
    gap: 2em;
    background: linear-gradient(45deg,
    ${props => props.theme.palette.primary.main}35,
    ${props => props.theme.palette.primary.main}15,
    ${props => props.theme.palette.primary.main}35);
`;

const Login: React.FC = () => {
    const redirect = window.location.pathname;
    
    return (
        <StyledPaper>
            <CSLoadingIcon height={125}/>
            <Typography
                variant="overline"
                fontWeight="bold"
                fontSize="large"
                pb={4}
            >
                You must log in to report a bug.
            </Typography>
            <Box
                component="a"
                href={`/.auth/login/aad?post_login_redirect_uri=${redirect}`}
            >
                <Button
                    variant="contained"
                    startIcon={
                        <Box
                            component="img"
                            src={Microsoft}
                            alt="Microsoft Logo"
                        />}
                >
                    Log in with Microsoft
                </Button>
            </Box>
            <Box
                component="a"
                href={`/.auth/login/github?post_login_redirect_uri=${redirect}`}
            >
                <Button
                    variant="contained"
                    startIcon={
                        <Box
                            component="img"
                            src={Github}
                            alt="GitHub Logo"
                        />}
                >
                    Log in with Github
                </Button>
            </Box>
        </StyledPaper>
    );
};

export default Login;