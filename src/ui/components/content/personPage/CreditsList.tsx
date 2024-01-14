import {
    Box,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { getImagePath } from "../../../../api/moviesApi.ts";
import { POSTER_SIZE } from "../../../../constants/ImageSizes.ts";
import CastMember from "../../../../types/castMember.ts";
import Movie from "../../../../types/movie.ts";
import { getFormattedMovieLinkId } from "../../../../utils/formatUtils.ts";

interface CreditsListProps {
    sortedMovieCredits: CastMember[];
}

const CreditsList: React.FC<CreditsListProps> = ({
    sortedMovieCredits
}) => {
    
    return (
        <TableContainer
            component={Paper}
        >
            <Table
                size="small"
            >
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="overline">
                                Release Date
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="overline">
                                Title/Role
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedMovieCredits.map(castMemberCredit => (
                        <TableRow
                            key={castMemberCredit.id}
                            component={Link}
                            to={`/movies/${getFormattedMovieLinkId(
                                {
                                    title: castMemberCredit.originalTitle,
                                    id: castMemberCredit.id
                                } as unknown as Movie)}`
                            }
                            sx={{
                                "&:hover": {
                                    backgroundColor: "#f0f0f0"
                                },
                                "&:last-child td, &:last-child th": { border: 0 }
                            }}
                        >
                            <TableCell
                                component="th"
                                scope="row"
                            >
                                <Typography
                                    variant="subtitle2"
                                    fontWeight="bold"
                                >
                                    {castMemberCredit.releaseDate
                                        ? new Date(castMemberCredit.releaseDate).getFullYear()
                                        : "Upcoming"}
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Stack
                                    direction="row"
                                    justifyContent="end"
                                    alignItems="center"
                                    spacing={2}
                                >
                                    <Stack>
                                        <Typography
                                            variant="subtitle2"
                                            fontWeight="bold"
                                        >
                                            {castMemberCredit.title}
                                        </Typography>
                                        {castMemberCredit.character && <Typography
                                            variant="subtitle2"
                                            fontSize="small"
                                        >
                                            as {castMemberCredit.character}
                                        </Typography>}
                                    </Stack>
                                    {castMemberCredit.posterPath && <Box
                                        component="img"
                                        src={getImagePath(castMemberCredit.posterPath, POSTER_SIZE.XXXS_W92)}
                                        width={45}
                                    />}
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CreditsList;