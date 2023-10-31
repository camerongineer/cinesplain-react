import React from "react";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
import Genre from "../../../../models/genre";
import { Button, Typography } from "@mui/material";

interface GenreDisplayProps {
    genres: Genre[];
    sx?: SxProps<Theme>;
}

const GenreDisplay: React.FC<GenreDisplayProps> = ({ genres, sx }) => (
    <>
        {genres.length > 0 && <Typography sx={sx}>
            {genres.map((genre) => {
                return <Button variant={"contained"}
                               size={"small"}
                               sx={{ m: 1 }}
                               key={genre.name}>{genre.name}
                </Button>;
            })}
        </Typography>}
    </>
);

export default GenreDisplay;