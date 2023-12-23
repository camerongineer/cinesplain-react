import React from "react";
import { Stack, styled, TableCell, TableRow, Typography } from "@mui/material";
import PopcornRating from "../../common/PopcornRating";
import Movie from "../../../../models/movie";
import { Link } from "react-router-dom";
import { grey } from "@mui/material/colors";

const StyledTableRow = styled(TableRow)`
    width: 10px;
`;

interface RatingListRowProps {
    movie: Movie,
    link: string
}

const RatingListRow: React.FC<RatingListRowProps> = ({
    movie,
    link
}) => (
    <StyledTableRow>
        <TableCell sx={{ borderBottom: "none" }}>
            <Link to={link}>
                <Stack
                    direction="row"
                    spacing={.5}
                    alignContent="center">
                    <Typography
                        component="p"
                        variant="overline"
                        fontWeight="bolder"
                        fontStyle="italic"
                        fontSize="medium"
                        color={grey[100]}>
                        {movie.movieTitle}
                    </Typography>
                </Stack>
            </Link>
        </TableCell>
        {movie.voteCount >= 20 && <TableCell
            width={30}
            sx={{ borderBottom: "none" }}>
            <Link to={link}>
                <PopcornRating voteAverage={movie.voteAverage}/>
            </Link>
        </TableCell>
        }
    </StyledTableRow>
);

export default RatingListRow;