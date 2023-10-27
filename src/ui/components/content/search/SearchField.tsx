import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, styled, TextField } from "@mui/material";
import React, { ChangeEvent, SyntheticEvent } from "react";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";

const StyledTextField = styled(TextField)(({ theme }) => ({
    fieldset: {
        background: "rgb(255, 255, 255, 0.5)"
    },
    input: {
        color: theme.palette.getContrastText(theme.palette.background.default)
    }
}));

interface SearchFieldProps {
    formId: string,
    searchQuery: string,
    autoCompleteList: string[],
    onQueryChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    onQuerySubmit: (query: string) => void,
    labelText: string
    sx?: SxProps<Theme>
}

const SearchField: React.FC<SearchFieldProps> = ({
    formId,
    searchQuery,
    autoCompleteList,
    onQueryChange,
    onQuerySubmit,
    labelText,
    sx
}) => {
    const handleQuerySubmit = (
        event: SyntheticEvent<Element, Event>,
        value: string | null,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<string> | undefined) => {
        event.preventDefault();
        onQuerySubmit(value || "");
    };
    
    return (
        <Autocomplete
            id={formId + "-autoComplete"}
            freeSolo
            options={autoCompleteList}
            onChange={handleQuerySubmit}
            renderInput={(params) => <StyledTextField value={searchQuery}
                                                      {...params}
                                                      id={formId}
                                                      component={"form"}
                                                      onChange={onQueryChange}
                                                      onSubmit={event => event.preventDefault()}
                                                      placeholder={labelText}
                                                      sx={sx}
                                                      variant={"outlined"}
                                                      color={"secondary"}
                                                      fullWidth
                                                      autoFocus
            />}
        />
    
    );
};

export default SearchField;