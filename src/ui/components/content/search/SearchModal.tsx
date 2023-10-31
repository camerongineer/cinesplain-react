import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Modal, Stack } from "@mui/material";
import Movie from "../../../../models/movie";
import SearchField from "./SearchField";
import { getMoviesSearchPath, retrieveMovies } from "../../../../utils/retrievalUtils";
import MovieSearchRow from "./MovieSearchRow";

interface SearchModalProps {
    isModalOpen: boolean;
    onModalEvent: () => void;
    autoCompleteList: string[];
}

const SearchModal: React.FC<SearchModalProps> = ({ isModalOpen, onModalEvent, autoCompleteList }) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [movies, setMovies] = useState<Movie[]>([]);
    const [invalidQueryPrompt, setInvalidQueryPrompt] = useState<boolean>(false);
    const [searchTimer, setSearchTimer] = useState<NodeJS.Timeout | null>(null);
    
    const handleMovieSubmit = (query: string) => {
        console.log(searchQuery);
        setSearchQuery(query);
        setInvalidQueryPrompt(false);
    };
    
    const handleQueryChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        event.preventDefault();
        setSearchQuery(event.target.value);
        setInvalidQueryPrompt(false);
    };
    
    useEffect(() => {
        if (searchTimer) {
            clearTimeout(searchTimer);
        }
        
        setSearchTimer(setTimeout(() => {
            if (!searchQuery) {
                setMovies([]);
            } else {
                retrieveMovies(getMoviesSearchPath(searchQuery, 1)).then(newMovies => {
                    setMovies(newMovies ? newMovies : []);
                    if (newMovies?.length === 0) setInvalidQueryPrompt(true);
                }).catch(error => {
                    console.error(error);
                    setMovies([]);
                });
            }
        }, 300));
        
        return () => {
            if (searchTimer) {
                clearTimeout(searchTimer);
            }
        };
    }, [searchQuery]);
    
    return (
        <>
            <Modal open={isModalOpen}
                   onClose={onModalEvent}
            >
                <Stack className={"full center"}>
                    <Box minWidth={"260px"}
                         width={"25%"}
                         marginTop={11}
                    >
                        <SearchField formId={"modalSearch"}
                                     searchQuery={searchQuery}
                                     autoCompleteList={autoCompleteList}
                                     onQueryChange={handleQueryChange}
                                     onQuerySubmit={handleMovieSubmit}
                                     labelText={"Enter a Movie title"}
                        />
                    </Box>
                    <MovieSearchRow movies={movies}
                                    onModalEvent={onModalEvent}
                                    invalidQueryPrompt={invalidQueryPrompt}/>
                </Stack>
            </Modal>
        </>
    );
    
};

export default SearchModal;