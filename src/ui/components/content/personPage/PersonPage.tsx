import {
    Stack,
    styled,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {
    QueryClient,
    useQuery
} from "@tanstack/react-query";
import React, { useEffect } from "react";
import {
    Params,
    useLoaderData,
    useParams
} from "react-router-dom";
import { retrievePerson } from "../../../../api/moviesApi.ts";
import CastMember from "../../../../types/castMember.ts";
import Person from "../../../../types/person.ts";
import { getNumericId } from "../../../../utils/formatUtils.ts";
import CreditsList from "./CreditsList.tsx";
import PersonSideBar from "./PersonSideBar.tsx";
import ProfileCard from "./ProfileCard.tsx";

const StyledStack = styled(Stack)`
    padding: 1em;
`;

const personPageQuery = (personId: string | undefined) => ({
    queryKey: ["personPage", personId],
    queryFn: async (): Promise<LoaderData | null> => {
        const person = await retrievePerson(getNumericId(personId ?? ""));
        if (!person) return null;
        const movieCredits = person.movieCredits.cast?.filter(movie => movie.releaseDate) ?? [];
        const sortedMovieCredits: CastMember[] = movieCredits.sort((a, b) => {
            if (a.releaseDate && b.releaseDate) {
                return a.releaseDate < b.releaseDate ? 1 : -1;
            }
            return 0;
        });
        return { person, sortedMovieCredits };
    }
});

const personPageLoader = (queryClient: QueryClient) => async ({ params }: { params: Params }) => {
    const personId = params.personId;
    return queryClient.getQueryData(personPageQuery(personId).queryKey) ??
        await queryClient.fetchQuery(personPageQuery(personId));
};

interface LoaderData {
    person: Person,
    sortedMovieCredits: CastMember[]
}

const PersonPage: React.FC = () => {
    const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof personPageLoader>>>;
    const params = useParams();
    const { data } = useQuery({ ...personPageQuery(params.personId), initialData });
    const { person, sortedMovieCredits } = data as LoaderData;
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    
    useEffect(() => {
        document.title = `${person.name} - CineSplain - The Movie Info App`;
        
        return () => {
            document.title = "CineSplain - The Movie Info App";
        };
    }, []);
    
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