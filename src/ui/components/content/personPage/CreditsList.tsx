import {
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
import Movie from "../../../../types/movie.ts";
import Person from "../../../../types/person.ts";
import { getFormattedMovieLinkId } from "../../../../utils/formatUtils.ts";

interface CreditsListProps {
    person: Person;
}

const CreditsList: React.FC<CreditsListProps> = ({
    person
}) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
                    {person.movieCredits.cast && person.movieCredits.cast.map((castMemberCredit, index) => (
                        <TableRow
                            component={Link}
                            to={`/movies/${getFormattedMovieLinkId(
                                {
                                    title: castMemberCredit.originalTitle,
                                    id: castMemberCredit.id
                                } as unknown as Movie)}`
                            }
                            key={castMemberCredit.id}
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
                                <Typography
                                    variant="subtitle2"
                                    fontWeight="bold"
                                >
                                    {castMemberCredit.releaseDate}
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
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
                            </TableCell>
                        
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CreditsList;