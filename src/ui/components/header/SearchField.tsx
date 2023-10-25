import { Grid, styled, TextField } from "@mui/material";
import React, { ChangeEvent, FormEvent } from "react";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";

const StyledTextField = styled(TextField)(({ theme }) => ({
    fieldset: {
        background: "rgb(255, 255, 255, 0.5)",
    },
    input: {
        color: theme.palette.getContrastText(theme.palette.background.default),
    }
}));

interface SearchFieldProps {
    searchQuery: string,
    onQueryChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    onQuerySubmit: (event: FormEvent<HTMLDivElement>) => void,
    labelText: string
    sx?: SxProps<Theme>
}

const SearchField: React.FC<SearchFieldProps> = ({ searchQuery, onQueryChange, onQuerySubmit, labelText , sx}) => (
    <StyledTextField value={searchQuery}
                     component={"form"}
                     onChange={onQueryChange}
                     onSubmit={onQuerySubmit}
                     placeholder={labelText}
                     sx={sx}
                     variant={"outlined"}
                     color={"secondary"}
                     fullWidth
                     autoFocus
    />
);

export default SearchField;