import { styled, TextField } from "@mui/material";
import React, { ChangeEvent, FormEvent } from "react";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";

const StyledTextField = styled(TextField)`
  display: flex;
  width: 100%;
`;

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
                     label={labelText}
                     sx={sx}
                     variant={"outlined"}
                     color={"primary"}
    />
);

export default SearchField;