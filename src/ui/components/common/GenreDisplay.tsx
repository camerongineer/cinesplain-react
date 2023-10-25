import React from "react";
import { StandardTypography } from "../../styles/Typography";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
import Genre from "../../../models/genre";
import { Button } from "@mui/material";

interface GenreDisplayProps {
    genres: Genre[];
    sx?: SxProps<Theme>;
}

const GenreDisplay: React.FC<GenreDisplayProps> = ({ genres, sx }) => (
    <>
        {genres.length > 0 && <StandardTypography sx={sx}>
            {genres.map((genre) => {
                return <Button variant={"contained"}
                               size={"small"}
                               sx={{ m: 1 }}
                               key={genre.name}>{genre.name}
                </Button>;
            })}
        </StandardTypography>}
    </>
);

export default GenreDisplay;