import React from "react";
import Movie from "../../../../models/movie";
import useRandomMovie from "../../../../hooks/UseRandomMovie";
import {
    Stack,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography, useMediaQuery, useTheme
} from "@mui/material";
import useMovieBackdrop from "../../../../hooks/UseMovieBackdrop";
import ListLabel from "./ListLabel";
import { SxProps } from "@mui/system";
import { Link } from "react-router-dom";
import OverlaidImageBox from "../../common/OverlaidImageBox";
import { BACKDROP_SIZE } from "../../../../constants/ImageSizes";

const StyledStack = styled(Stack)`
  border-radius: 10px;
  gap: 20px;
  transition: opacity ${props => props.theme.transitions.duration.short}ms ease-in-out;
`;

interface RatingListProps {
    movies: Movie[],
    backgroundOverlayColor: string
    labelText: string,
    backdropInterval: number,
    outerSx?: SxProps,
    innerSx?: SxProps
}

const RatingList: React.FC<RatingListProps> = ({
    movies,
    backgroundOverlayColor,
    labelText,
    backdropInterval,
    outerSx,
    innerSx
}) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
    const { backgroundImage, backgroundImageLoaded } = useMovieBackdrop(useRandomMovie(movies, backdropInterval, true),
        BACKDROP_SIZE.LG_W1280);
    
    return (
        <>
            <StyledStack sx={{ ...outerSx, opacity: backgroundImageLoaded ? 1 : 0 }}>
                {!isSmallScreen &&
                    <ListLabel labelText={labelText} fontColor={"#00000090"} sx={{ paddingTop: "1em" }}/>}
                <OverlaidImageBox sx={innerSx}
                                  backgroundImageUrl={backgroundImage ?? ""}
                                  imageAlt={`${labelText} backdrop`}
                                  overlayColor={backgroundOverlayColor}
                                  borderRadius={"10px"}>
                    <TableContainer className={"center"} component={Stack} margin={"2em 0"}>
                        {isSmallScreen && <ListLabel labelText={labelText}
                                                     fontColor={theme.palette.getContrastText(backgroundOverlayColor)}
                                                     sx={{ zIndex: 2 }}/>}
                        <Table size={"small"} sx={{ width: "80%", height: "80%", zIndex: 2 }}>
                            <TableBody>
                                {movies.map(movie =>
                                    <TableRow key={movie.movieId} sx={{ margin: "0 20px" }}>
                                        <TableCell align={"left"} sx={{ borderBottom: "none" }}>
                                            <Link to={`/movies/${movie.movieId}`}>
                                                <Typography variant={"h6"}
                                                            color={theme.palette.getContrastText(
                                                                backgroundOverlayColor)}>
                                                    {movie.movieTitle}
                                                </Typography>
                                            </Link>
                                        </TableCell>
                                        <TableCell align={"right"} sx={{ borderBottom: "none" }}>
                                            {movie.voteCount >= 20 && <Typography variant={"h6"}
                                                                                  color={theme.palette.getContrastText(
                                                                                      backgroundOverlayColor)}>
                                                {movie.voteAverage}
                                            </Typography>}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </OverlaidImageBox>
            </StyledStack>
        </>
    );
};

export default RatingList;