import {
    TableCell,
    TableRow,
    Typography
} from "@mui/material";
import React, { useState } from "react";
import CastMember from "../../../../types/castMember.ts";
import CollapsibleTable from "../common/CollapsibleTable.tsx";
import CastCreditsListRow from "./CastCreditsListRow.tsx";

interface CrewCreditsListProps {
    castCredits: CastMember[];
    truncatedCreditsSize?: number;
}

const CastCreditsList: React.FC<CrewCreditsListProps> = ({
    castCredits,
    truncatedCreditsSize = 8
}) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    
    const handleShowMore = () => setIsCollapsed(prevState => !prevState);
    
    const truncatedCastCredits = castCredits.slice(0, truncatedCreditsSize);
    const remainingCastCredits = castCredits.slice(truncatedCreditsSize);
    
    return (
        <CollapsibleTable
            label="Cast"
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
            persistentElements={!!truncatedCastCredits.length ? truncatedCastCredits.map(castMemberCredit => (
                <CastCreditsListRow
                    key={castMemberCredit.creditId}
                    castMemberCredit={castMemberCredit}
                    hideLastBottomBorder={!isCollapsed}
                />
            )) : null}
            collapsedElements={!!remainingCastCredits.length ? remainingCastCredits.map(castMemberCredit => (
                <CastCreditsListRow
                    key={castMemberCredit.creditId}
                    castMemberCredit={castMemberCredit}
                    hideLastBottomBorder={!isCollapsed}
                />
            )) : null}
        />
    );
};

export default CastCreditsList;