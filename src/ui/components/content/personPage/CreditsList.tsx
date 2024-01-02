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
import Person from "../../../../types/person.ts";

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
                    {person.movie_credits.cast.map((castMemberCredit, index) => (
                        <TableRow
                            component={Link}
                            to={`/movies/${castMemberCredit.id}`}
                            key={castMemberCredit.credit_id}
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
                                    {castMemberCredit.release_date}
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