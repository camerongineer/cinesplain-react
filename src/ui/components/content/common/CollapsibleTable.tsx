import {
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
import React, { ReactNode } from "react";
import CollapsibleTableFooter from "./CollapsibleTableFooter.tsx";

interface CollapsibleTableProps {
    label: String;
    tableHeaderRow: ReactNode;
    isCollapsed: boolean;
    onShowMore: () => void;
    persistentElements: Iterable<ReactNode> | null;
    collapsedElements: Iterable<ReactNode> | null;
}

const CollapsibleTable: React.FC<CollapsibleTableProps> = ({
    label,
    isCollapsed,
    onShowMore,
    tableHeaderRow,
    persistentElements,
    collapsedElements
}) => {
    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell
                            colSpan={2}
                            align="right"
                            style={{ border: 0 }}
                        >
                            <Typography
                                variant="overline"
                                fontSize="large"
                                fontWeight="bold"
                                style={{ userSelect: "none" }}
                            >
                                {label}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    {tableHeaderRow}
                </TableHead>
                <TableBody>
                    {persistentElements}
                    {collapsedElements && !isCollapsed && <CollapsibleTableFooter
                        onClick={onShowMore}
                        expanded={isCollapsed}
                    />}
                </TableBody>
            </Table>
            {collapsedElements && <Collapse in={isCollapsed}>
                <Table size="small">
                    <TableBody>
                        {collapsedElements}
                        {isCollapsed && <CollapsibleTableFooter
                            onClick={onShowMore}
                            expanded={isCollapsed}
                        />}
                    </TableBody>
                </Table>
            </Collapse>}
        </TableContainer>
    );
};

export default CollapsibleTable;