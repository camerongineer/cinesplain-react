import React from "react";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
import { getFormattedRuntime } from "../../../../utils/formatUtils";
import { Typography } from "@mui/material";

interface RuntimeDisplayProps {
    runtime: number;
    includeLabel?: boolean;
    sx?: SxProps<Theme>;
}

const RuntimeDisplay: React.FC<RuntimeDisplayProps> = ({ runtime, includeLabel, sx }) => (
    <>
        <Typography sx={sx}
                    variant={"body1"}>
            {includeLabel && <b>Runtime:&nbsp;</b>}
            {runtime > 0 ? getFormattedRuntime(runtime) : "Unknown"}
        </Typography>
    </>
);

export default RuntimeDisplay;