import {
    TableCell,
    TableRow,
    Typography
} from "@mui/material";
import React, { useState } from "react";
import listDisplayMovieCastCredit from "../../../../types/listDisplayMovieCastCredit.ts";
import CollapsibleTable from "../common/CollapsibleTable.tsx";
import MovieCastCreditsListRow from "./MovieCastCreditsListRow.tsx";

interface MovieCastCreditsListProps {
    castCredits: listDisplayMovieCastCredit[],
    truncatedCreditsSize?: number
}

const MovieCastCreditsList: React.FC<MovieCastCreditsListProps> = ({
    castCredits,
    truncatedCreditsSize = 5
}) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    
    const handleShowMore = () => setIsCollapsed(prevState => !prevState);
    
    const truncatedCastCredits = castCredits.slice(0, truncatedCreditsSize);
    const remainingCastCredits = castCredits.slice(truncatedCreditsSize);
    
    return (
        <CollapsibleTable
            isCollapsed={isCollapsed}
            onShowMore={handleShowMore}
            tableHeaderRow={
                <TableRow sx={{ "& td, & th": { border: 0 } }}>
                    <TableCell align="center">
                        <Typography
                            variant="overline"
                            fontSize="large"
                        >
                            Cast
                        </Typography>
                    </TableCell>
                </TableRow>}
            persistentElements={!!truncatedCastCredits.length ? truncatedCastCredits.map(castCredit => (
                <MovieCastCreditsListRow
                    key={castCredit.creditId}
                    castCredit={castCredit}
                />
            )) : null}
            collapsedElements={!!remainingCastCredits.length ? remainingCastCredits.map(castCredit => (
                <MovieCastCreditsListRow
                    key={castCredit.creditId}
                    castCredit={castCredit}
                />
            )) : null}
            sx={{
                maxWidth: "clamp(280px, 80%, 360px)",
                height: "fit-content"
            }}
        />
    );
};

export default MovieCastCreditsList;