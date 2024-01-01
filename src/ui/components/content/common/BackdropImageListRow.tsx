import {
    Stack,
    styled
} from "@mui/material";
import { SxProps } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import Movie from "../../../../models/movie";
import OuterCarousel from "../../common/OuterCarousel";
import BackdropImageListItem from "./BackdropImageListItem";

const StyledStack = styled(Stack)`
    flex-direction: row;
    align-items: center;
    max-width: 100%;
    gap: 1em;
`;

interface BackdropImageListRowProps {
    movies: Movie[];
    cardStyle?: SxProps;
}

const BackdropImageListRow: React.FC<BackdropImageListRowProps> = ({
    movies,
    cardStyle
}) => (
    <OuterCarousel
        padding={2}
        sx={{
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
            overflow: "auto",
            width: "99%"
        }}
    >
        <StyledStack>
            {movies.map(movie => (
                <Link
                    to={`/movies/${movie.movieId}`}
                    key={movie.movieId}
                >
                    <BackdropImageListItem
                        movie={movie}
                        cardStyle={cardStyle}
                    />
                </Link>
            ))}
        </StyledStack>
    </OuterCarousel>
);

export default BackdropImageListRow;