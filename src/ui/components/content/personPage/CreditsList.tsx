import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import React from "react";
import CastMember from "../../../../types/castMember.ts";
import CreditsListCastRow from "./CreditsListCastRow.tsx";

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
                        <CreditsListCastRow
                            key={castMemberCredit.creditId}
                            castMemberCredit={castMemberCredit}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CreditsList;