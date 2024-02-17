import {
    TableCell,
    TableRow,
    Typography
} from "@mui/material";
import React, { useState } from "react";
import listDisplayMovieCrewCredit from "../../../../types/listDisplayMovieCrewCredit.ts";
import CollapsibleTable from "../common/CollapsibleTable.tsx";
import MovieCrewCreditsListRow from "./MovieCrewCreditsListRow.tsx";

interface MovieCrewCreditsListProps {
    crewCredits: listDisplayMovieCrewCredit[],
    truncatedCreditsSize?: number
}

const MovieCrewCreditsList: React.FC<MovieCrewCreditsListProps> = ({
    crewCredits,
    truncatedCreditsSize = 5
}) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    
    const handleShowMore = () => setIsCollapsed(prevState => !prevState);
    
    const truncatedCrewCredits = crewCredits.slice(0, truncatedCreditsSize);
    const remainingCrewCredits = crewCredits.slice(truncatedCreditsSize);
    
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
                            Crew
                        </Typography>
                    </TableCell>
                </TableRow>}
            persistentElements={!!truncatedCrewCredits.length ? truncatedCrewCredits.map(crewCredit => (
                <MovieCrewCreditsListRow
                    key={crewCredit.creditId}
                    crewCredit={crewCredit}
                />
            )) : null}
            collapsedElements={!!remainingCrewCredits.length ? remainingCrewCredits.map(crewCredit => (
                <MovieCrewCreditsListRow
                    key={crewCredit.creditId}
                    crewCredit={crewCredit}
                />
            )) : null}
            sx={{
                maxWidth: "clamp(280px, 80%, 360px)",
                height: "fit-content"
            }}
        />
    );
};

export default MovieCrewCreditsList;