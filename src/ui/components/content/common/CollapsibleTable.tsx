import {
    Collapse,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableContainerProps,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import React, { ReactNode } from "react";
import CollapsibleTableFooter from "./CollapsibleTableFooter.tsx";

interface CollapsibleTableProps extends TableContainerProps {
    label?: String;
    tableHeaderRow: ReactNode;
    isCollapsed: boolean;
    onShowMore: () => void;
    persistentElements: Iterable<ReactNode> | null;
    collapsedElements: Iterable<ReactNode> | null;
}

const CollapsibleTable: React.FC<CollapsibleTableProps> = (props) => {
    const {
        label,
        isCollapsed,
        onShowMore,
        tableHeaderRow,
        persistentElements,
        collapsedElements,
        ...rest
    } = props;
    return (
        <TableContainer {...rest}>
            <Table size="small">
                <TableHead>
                    {label && <TableRow sx={{ "& td, & th": { border: 0 } }}>
                        <TableCell
                            colSpan={2}
                            align="right"
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
                    </TableRow>}
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