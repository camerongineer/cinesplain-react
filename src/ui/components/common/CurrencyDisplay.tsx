import React from "react";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
import { getFormattedCurrencyAmount } from "../../../utils/formatUtils";
import { Typography } from "@mui/material";

interface CurrencyDisplayProps {
    labelText: string;
    currencyAmount: number;
    sx?: SxProps<Theme>;
}

const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({ labelText, currencyAmount, sx }) => (
    <>
        <Typography variant={"body1"}
                            sx={sx}>
            <b>{labelText}:</b>&nbsp;{
            currencyAmount > 0 ? getFormattedCurrencyAmount(currencyAmount) : "Unknown"}
        </Typography>
    </>
);

export default CurrencyDisplay;