import {
    Stack,
    styled,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import React from "react";
import { useLoaderData } from "react-router-dom";
import Person from "../../../../types/person.ts";
import { retrievePerson } from "../../../../utils/retrievalUtils.ts";
import CreditsList from "./CreditsList.tsx";
import PersonSideBar from "./PersonSideBar.tsx";
import ProfileCard from "./ProfileCard.tsx";

const StyledStack = styled(Stack)`
    padding: 1em;
`;

const personPageLoader = async (personId: string): Promise<Person | null> => {
    return await retrievePerson(personId);
};

const PersonPage: React.FC = () => {
    const person = useLoaderData() as Person;
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    
    return (
        <StyledStack className="full center">
            {person && <Stack
                direction={{
                    xs: "column",
                    sm: "row"
                }}
                justifyContent="space-evenly"
            >
                <Stack
                    minHeight="100%"
                    alignItems={{
                        xs: "center",
                        sm: "end"
                    }}
                    textAlign={{
                        xs: "center",
                        sm: "right"
                    }}
                    padding={2}
                    spacing={2}
                >
                    <Typography
                        component="h1"
                        variant="h3"
                        fontWeight="bolder"
                    >
                        {person.name}
                    </Typography>
                    {person.alsoKnownAs.length > 0 && <Typography
                        variant="h5"
                    >
                        Also known as {person.alsoKnownAs.map((name, index) => {
                        return <Typography
                            key={`${name}${index}`}
                            variant="subtitle1"
                        >
                            {name}
                        </Typography>;
                    })}
                    </Typography>}
                    {isSmallScreen && <PersonSideBar person={person}/>}
                    <Typography
                        component="p"
                        variant="body1"
                        maxWidth="clamp(30em, 40em, 50em)"
                    >
                        {person.biography}
                    </Typography>
                    <CreditsList person={person}/>
                </Stack>
                <Stack
                    alignItems={{
                        xs: "center",
                        sm: "right"
                    }}
                    spacing={2}
                    padding={1}
                    order={{
                        xs: -1, sm: 0
                    }}
                >
                    <ProfileCard person={person}/>
                    {!isSmallScreen && <PersonSideBar person={person}/>}
                </Stack>
            </Stack>}
        </StyledStack>);
};

export { personPageLoader };
export default PersonPage;