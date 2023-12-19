import React from "react";
import { Box, Stack, TableCell, TableRow, Typography } from "@mui/material";
import { getImagePath } from "../../../../utils/retrievalUtils";
import { LOGO_SIZE } from "../../../../constants/ImageSizes";
import PopcornRating from "../../common/PopcornRating";
import Movie from "../../../../models/movie";

interface RatingListRowProps {
    movie: Movie;
}

const RatingListRow: React.FC<RatingListRowProps> = ({
    movie
}) => (
    <TableRow
        key={movie.movieId}
        sx={{ width: "100%" }}>
        <TableCell
            align="left"
            sx={{ borderBottom: "none" }}>
            <Stack
                direction="row"
                flex={1}
                justifyContent="left"
                alignItems="center"
                spacing={.5}>
                {movie.images.logos.length > 0
                    && <Box component="img"
                            maxHeight={20}
                            maxWidth={30}
                            src={getImagePath(
                                movie.images.logos[0].filePath,
                                LOGO_SIZE.SM_W185)}></Box>}
            </Stack>
        </TableCell>
        <TableCell align={"right"} sx={{ borderBottom: "none" }}>
            <Stack direction="row" spacing={.5} alignContent="center">
                <Typography variant="overline"
                            component="p"
                            fontWeight={600}
                            fontStyle={"italic"}
                            color="white">
                    {movie.movieTitle}
                </Typography>
                {movie.voteCount >= 20 &&
                    <PopcornRating voteAverage={movie.voteAverage}/>}
            </Stack>
        </TableCell>
    </TableRow>
);

export default RatingListRow;