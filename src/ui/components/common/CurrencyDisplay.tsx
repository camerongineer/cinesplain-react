import React from "react";
import { StandardTypography } from "../../styles/Typography";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
import { getFormattedDollarAmount } from "../../../utils/formatUtils";

interface CurrencyDisplayProps {
    labelText: string;
    currencyAmount: number;
    sx?: SxProps<Theme>;
}

const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({ labelText, currencyAmount, sx }) => (
    <>
        <StandardTypography variant={"h3"}
                            sx={sx}><b>{labelText}:&nbsp;{getFormattedDollarAmount(currencyAmount)}</b>
        </StandardTypography>
    </>
);

export default CurrencyDisplay;