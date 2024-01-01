import {
    Box,
    Modal,
    styled
} from "@mui/material";
import React, {
    ChangeEvent,
    useEffect,
    useState
} from "react";
import Movie from "../../../../models/movie";
import {
    getMoviesSearchPath,
    retrieveMovies
} from "../../../../utils/retrievalUtils";
import MovieSearchRow from "./MovieSearchRow";
import SearchField from "./SearchField";

const StyledSearchBox = styled(Box)`
    min-width: 260px;
    width: 25%;
    margin-top: 2em;
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

interface SearchModalProps {
    modalOpen: boolean;
    onModalEvent: () => void;
    autoCompleteList: string[];
}

const SearchModal: React.FC<SearchModalProps> = ({
    modalOpen,
    onModalEvent,
    autoCompleteList
}) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [movies, setMovies] = useState<Movie[]>([]);
    const [invalidQueryPrompt, setInvalidQueryPrompt] = useState<boolean>(false);
    const [searchTimer, setSearchTimer] = useState<NodeJS.Timeout | null>(null);
    
    const handleMovieSubmit = (query: string) => {
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
    }, [searchQuery, searchTimer]);
    
    return (
        <>
            <Modal
                open={modalOpen}
                onClose={onModalEvent}
            >
                <>
                    <StyledSearchBox>
                        <SearchField
                            formId="modalSearch"
                            searchQuery={searchQuery}
                            autoCompleteList={autoCompleteList}
                            onQueryChange={handleQueryChange}
                            onQuerySubmit={handleMovieSubmit}
                            labelText="Enter a Movie title"
                        />
                    </StyledSearchBox>
                    <Box onClick={onModalEvent}>
                        <MovieSearchRow
                            movies={movies}
                            invalidQueryPrompt={invalidQueryPrompt}
                        />
                    </Box>
                </>
            </Modal>
        </>
    );
    
};

export default SearchModal;