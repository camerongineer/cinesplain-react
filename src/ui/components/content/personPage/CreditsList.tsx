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
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { POSTER_SIZE } from "../../../../constants/ImageSizes.ts";
import Movie from "../../../../types/movie.ts";
import Person from "../../../../types/person.ts";
import { getFormattedMovieLinkId } from "../../../../utils/formatUtils.ts";
import { getImagePath } from "../../../../utils/retrievalUtils.ts";

interface CreditsListProps {
    person: Person;
}

const CreditsList: React.FC<CreditsListProps> = ({
    person
}) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const sortedMovieCredits = person.movieCredits.cast
        ? person.movieCredits.cast.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
        : [];
    
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
                    {sortedMovieCredits.map((castMemberCredit, index) => (
                        <TableRow
                            key={castMemberCredit.id}
                            component={Link}
                            to={`/movies/${getFormattedMovieLinkId(
                                {
                                    title: castMemberCredit.originalTitle,
                                    id: castMemberCredit.id
                                } as unknown as Movie)}`
                            }
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            sx={{
                                backgroundColor: hoveredIndex === index ? "#f0f0f0" : "transparent",
                                "&:last-child td, &:last-child th": { border: 0 }
                            }}
                        >
                            <TableCell
                                component="th"
                                scope="row"
                            >
                                {castMemberCredit.releaseDate && <Typography
                                    variant="subtitle2"
                                    fontWeight="bold"
                                >
                                    {new Date(castMemberCredit.releaseDate).getFullYear()}
                                </Typography>}
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