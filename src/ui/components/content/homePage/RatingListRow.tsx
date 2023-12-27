import {
    styled,
    TableCell,
    TableRow,
    Typography,
    useTheme
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { Link } from "react-router-dom";
import Movie from "../../../../models/movie";
import PopcornRating from "../../common/PopcornRating";

const StyledTableRow = styled(TableRow)`
    &:hover > img {
        filter: saturate(150%);
    }
`;

interface RatingListRowProps {
    movie: Movie,
    link: string
}

const RatingListRow: React.FC<RatingListRowProps> = ({
    movie,
    link
}) => {
    const theme = useTheme();
    return (
        <StyledTableRow>
            <Link to={link}>
                <TableCell sx={{ borderBottom: "none" }}>
                    <Typography
                        component="p"
                        variant="overline"
                        fontWeight="bolder"
                        fontStyle="italic"
                        fontSize="medium"
                        color={grey[100]}
                        sx={{
                            "&:hover": {
                                color: theme.palette.text.primary,
                                fontStyle: "normal"
                            }
                        }}
                    >
                        {movie.movieTitle}
                    </Typography>
                </TableCell>
            </Link>
            {movie.voteCount >= 20 &&
                <TableCell
                    width={30}
                    sx={{ borderBottom: "none" }}
                >
                    <Link to={link}>
                        <PopcornRating voteAverage={movie.voteAverage}/>
                    </Link>
                </TableCell>}
        </StyledTableRow>
    );
};

export default RatingListRow;