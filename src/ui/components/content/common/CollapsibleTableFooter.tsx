import {
    ArrowDropDown,
    ArrowDropUp
} from "@mui/icons-material";
import {
    Button,
    styled,
    TableCell,
    TableRow
} from "@mui/material";
import React from "react";

const StyledTableRow = styled(TableRow)`
    &td, &th {
        border-top: 10px;
    }
`;

interface TableCollapseFooterProps {
    onClick: () => void,
    expanded: boolean
}

const CollapsibleTableFooter: React.FC<TableCollapseFooterProps> = ({
    onClick,
    expanded
}) => (
    <StyledTableRow>
        <TableCell colSpan={10} align="center">
            <Button
                onClick={onClick}
                startIcon={expanded ? <ArrowDropUp/> : <ArrowDropDown/>}
                color="inherit"
                fullWidth
            >
                Show&nbsp;{expanded ? "Less" : "All"}
            </Button>
        </TableCell>
    </StyledTableRow>
);

export default CollapsibleTableFooter;