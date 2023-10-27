import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Modal, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import MovieCard from "../moviePage/MovieCard";
import { StandardTypography } from "../../../styles/Typography";
import Movie from "../../../../models/movie";
import SearchField from "./SearchField";
import { getMoviesSearchPath, retrieveMovies } from "../../../../utils/retrievalUtils";

interface SearchModalProps {
    isModalOpen: boolean;
    onModalEvent: () => void;
    autoCompleteList: string[];
}

const SearchModal: React.FC<SearchModalProps> = ({ isModalOpen, onModalEvent, autoCompleteList }) => {
    const theme = useTheme();
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
                   style={{ color: "white" }}
            >
                <Box width={"100%"}
                     height={"100%"}
                     display={"flex"}
                     flexDirection={"column"}
                     alignItems={"center"}
                     justifyContent={"center"}
                >
                    <Box minWidth={"250px"}
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
                    <Box display={"flex"}
                         alignItems={"center"}
                         justifyContent={"center"}
                         width={"100%"}
                         height={"100%"}
                         flexDirection={"row"}
                         gap={2}
                         overflow={"hidden"}
                         maxWidth={theme.breakpoints.values.xl}
                    >
                        {movies.length > 0 && movies.slice(0, 6).map(movie => {
                            return (
                                <Link key={movie.movieId} to={`/movies/${movie.movieId}`} onClick={onModalEvent}>
                                    <MovieCard key={movie.movieId} movie={movie} style={{ width: 225, minWidth: 100 }}
                                               onHover={() => {}} isExpandable={true}/>
                                </Link>);
                        })}
                        {invalidQueryPrompt && movies.length === 0 &&
                            <StandardTypography variant={"h2"}>No movie data available.</StandardTypography>}
                    </Box>
                </Box>
            </Modal>
        </>
    );
    
};

export default SearchModal;