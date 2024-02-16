import {
    ArrowDropDown,
    ArrowDropUp
} from "@mui/icons-material";
import {
    Button,
    Collapse,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import TableFooter from "@mui/material/TableFooter";
import React, { useState } from "react";
import CastMember from "../../../../types/castMember.ts";
import CastCreditsListRow from "./CastCreditsListRow.tsx";

interface CreditsListProps {
    sortedMovieCredits: CastMember[];
}

const CastCreditsList: React.FC<CreditsListProps> = ({
    sortedMovieCredits
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const handleShowMore = () => setIsExpanded(prevState => !prevState);
    
    const truncatedMovieCredits = sortedMovieCredits.slice(0, 10);
    const remainingMovieCredits = sortedMovieCredits.slice(10);
    
    return (
        <TableContainer
            component={Paper}
        >
            <Table size="small">
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
                    {truncatedMovieCredits.map(castMemberCredit => (
                        <CastCreditsListRow
                            key={castMemberCredit.creditId}
                            castMemberCredit={castMemberCredit}
                            hideLastBottomBorder={!isExpanded}
                        />
                    ))}
                </TableBody>
            </Table>
            {!!remainingMovieCredits.length && <>
                <Collapse in={isExpanded}>
                    <Table size="small">
                        <TableBody>
                            {remainingMovieCredits.map(castMemberCredit => (
                                <CastCreditsListRow
                                    key={castMemberCredit.creditId}
                                    castMemberCredit={castMemberCredit}
                                    hideLastBottomBorder={isExpanded}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </Collapse>
                <TableFooter>
                    <Button
                        onClick={handleShowMore}
                        startIcon={isExpanded ? <ArrowDropUp/> : <ArrowDropDown/>}
                        color="inherit"
                    >
                        Show&nbsp;{isExpanded ? "Less" : "All"}
                    </Button>
                </TableFooter>
            </>}
        </TableContainer>
    );
};

export default CastCreditsList;