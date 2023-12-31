import {
    ImageList,
    styled
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Movie from "../../../../models/movie";
import OuterCarousel from "../../common/OuterCarousel";
import BackdropImageListItem from "./BackdropImageListItem";

const StyledImageList = styled(ImageList)`
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    margin: 10px;
    background-size: cover;
    background-position: center;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
`;

interface BackdropImageListRowProps {
    movies: Movie[];
}

const BackdropImageListRow: React.FC<BackdropImageListRowProps> = ({
    movies
}) => (
    <OuterCarousel paddingY={1}>
        <StyledImageList gap={20}>
            {movies.map(movie => (
                <Link
                    to={`/movies/${movie.movieId}`}
                    key={movie.movieId}
                >
                    <BackdropImageListItem movie={movie}/>
                </Link>
            ))}
        </StyledImageList>
    </OuterCarousel>
);

export default BackdropImageListRow;