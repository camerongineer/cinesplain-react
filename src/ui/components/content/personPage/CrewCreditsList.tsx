import {
    TableCell,
    TableRow,
    Typography
} from "@mui/material";
import React, { useState } from "react";
import CrewMember from "../../../../types/crewMember.ts";
import CollapsibleTable from "../common/CollapsibleTable.tsx";
import CrewCreditsListRow from "./CrewCreditsListRow.tsx";

interface CrewCreditsListProps {
    crewCredits: CrewMember[];
    truncatedCreditsSize?: number;
}

const CrewCreditsList: React.FC<CrewCreditsListProps> = ({
    crewCredits,
    truncatedCreditsSize = 8
}) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    
    const handleShowMore = () => setIsCollapsed(prevState => !prevState);
    
    const truncatedCrewCredits = crewCredits.slice(0, truncatedCreditsSize);
    const remainingCrewCredits = crewCredits.slice(truncatedCreditsSize);
    
    return (
        <CollapsibleTable
            label="Crew"
            isCollapsed={isCollapsed}
            onShowMore={handleShowMore}
            tableHeaderRow={
                <TableRow>
                    <TableCell>
                        <Typography variant="overline">
                            Job
                        </Typography>
                    </TableCell>
                    <TableCell align="right">
                        <Typography variant="overline">
                            Release Date
                        </Typography>
                    </TableCell>
                </TableRow>}
            persistentElements={truncatedCrewCredits.length ? truncatedCrewCredits.map(crewMemberCredit => (
                <CrewCreditsListRow
                    key={crewMemberCredit.creditId}
                    crewMemberCredit={crewMemberCredit}
                    hideLastBottomBorder={!isCollapsed}
                />
            )) : null}
            collapsedElements={remainingCrewCredits.length ? remainingCrewCredits.map(crewMemberCredit => (
                <CrewCreditsListRow
                    key={crewMemberCredit.creditId}
                    crewMemberCredit={crewMemberCredit}
                    hideLastBottomBorder={!isCollapsed}
                />
            )) : null}
        />
    );
};

export default CrewCreditsList;