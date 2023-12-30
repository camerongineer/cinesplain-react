import {
    Box,
    Paper,
    Stack,
    styled
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Movie from "../../../../models/movie";
import { getImdbPath } from "../../../../utils/retrievalUtils";
import imdb from "../../../images/imdb_logo.svg";
import CurrencyDisplay from "../common/CurrencyDisplay";
import ReleaseDateDisplay from "../common/ReleaseDateDisplay";
import RuntimeDisplay from "../common/RuntimeDisplay";
import SplainationDisplay from "../common/SplainationDisplay";
import TaglineDisplay from "../common/TaglineDisplay";

const StyledPaper = styled(Paper)`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: ${props => `opacity ${props.theme.transitions.duration.short}ms ease-in-out`};
    background: linear-gradient(270deg, ${props => props.theme.palette.primary.main}60, ${props => props.theme.palette.background.paper});
    padding: 20px;
`;

interface MovieSideBarProps {
    movie: Movie;
}

const MovieSideBar: React.FC<MovieSideBarProps> = ({ movie }) => (
    <Stack
        flex={{
            md: 1,
            lg: 1
        }}
        justifyContent="center"
        padding={1}
        marginX={1}
    >
        <StyledPaper elevation={5}>
            <TaglineDisplay tagline={movie.tagline}/>
            <SplainationDisplay overview={movie.overview}/>
            <Stack
                alignItems="center"
                spacing={1}
            >
                <RuntimeDisplay
                    runtime={movie.runtime}
                    includeLabel={true}
                />
                <ReleaseDateDisplay
                    releaseDate={movie.releaseDate}
                    includeLabel={true}
                />
                <CurrencyDisplay
                    labelText="Budget"
                    currencyAmount={movie.budget}
                />
                <CurrencyDisplay
                    labelText="Revenue"
                    currencyAmount={movie.revenue}
                />
                <Stack flexDirection="row">
                    {movie.imdbId &&
                        <Link to={getImdbPath(movie.imdbId)}>
                            <Box
                                component="img"
                                height="25px"
                                src={imdb as unknown as string}
                                alt="Link to IMDB"
                            />
                        </Link>}
                </Stack>
            </Stack>
        </StyledPaper>
    </Stack>
);

export default MovieSideBar;