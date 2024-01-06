import {
    Stack,
    styled,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CastMember from "../../../../types/castMember.ts";
import Person from "../../../../types/person.ts";
import { retrievePerson } from "../../../../utils/retrievalUtils.ts";
import CreditsList from "./CreditsList.tsx";
import PersonSideBar from "./PersonSideBar.tsx";
import ProfileCard from "./ProfileCard.tsx";

const StyledStack = styled(Stack)`
    padding: 1em;
`;

interface LoaderData {
    person: Person,
    sortedMovieCredits: CastMember[]
}

const personPageLoader = async (personId: string): Promise<LoaderData | null> => {
    const person = await retrievePerson(personId);
    if (!person) return null;
    const movieCredits = person.movieCredits.cast?.filter(movie => movie.releaseDate) ?? [];
    const sortedMovieCredits: CastMember[] = movieCredits.sort((a, b) => {
        if (a.releaseDate && b.releaseDate) {
            return a.releaseDate < b.releaseDate ? 1 : -1;
        }
        return 0;
    });
    return { person, sortedMovieCredits } as LoaderData;
};

const PersonPage: React.FC = () => {
    const { person, sortedMovieCredits } = useLoaderData() as LoaderData;
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
                    {person.alsoKnownAs.length > 0 &&
                        <Stack>
                            <Typography
                                variant="h5"
                            >
                                Also known as
                            </Typography>
                            {person.alsoKnownAs.map((name, index) => {
                                return <Typography
                                    key={`${name}${index}`}
                                    variant="subtitle1"
                                >
                                    {name}
                                </Typography>;
                            })}
                        </Stack>}
                    {isSmallScreen && <PersonSideBar person={person}/>}
                    <Typography
                        component="p"
                        variant="body1"
                        maxWidth="clamp(30em, 40em, 50em)"
                    >
                        {person.biography}
                    </Typography>
                    <CreditsList sortedMovieCredits={sortedMovieCredits}/>
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