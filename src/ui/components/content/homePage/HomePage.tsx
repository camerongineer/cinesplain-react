import React from "react";
import { Grid, Stack, styled } from "@mui/material";
import RecentMoviesRow from "./RecentMoviesRow";
import RatingList from "./RatingList";
import Loading from "../../common/Loading";
import Movie from "../../../../models/movie";

const StyledStack = styled(Stack)`
    font-size: calc(10px + 2vmin);
    min-height: 100%;
    color: ${props => props.theme.palette.text.primary};
`;

interface HomePageProps {
    loading: boolean,
    recentMovies: Movie[],
    popularMovies: Movie[],
    lovedMovies: Movie[],
    hatedMovies: Movie[],
    classicMovies: Movie[],
    upcomingMovies: Movie[],
}

const HomePage: React.FC<HomePageProps> = ({
    loading,
    recentMovies,
    popularMovies,
    lovedMovies,
    hatedMovies,
    classicMovies,
    upcomingMovies
}) => {
    
    if (loading) {
        return <Loading/>;
    }
    
    return (
        <StyledStack className={"full center"}>
            <RecentMoviesRow movies={recentMovies.filter(movie => movie.backdropPath)}/>
            <Grid container direction={"row"} className={"full center"} width={"98%"} gap={3}>
                
                <Grid item display={"flex"} flexDirection={"column"} xs={6}>
                    <RatingList movies={upcomingMovies.slice(0, 10)}
                                backgroundOverlayColor={"#B5179E"}
                                backdropInterval={25000}
                                labelText={"Upcoming"}
                    />
                    <RatingList movies={lovedMovies.slice(0, 10)}
                                backgroundOverlayColor={"#F72585"}
                                backdropInterval={27500}
                                labelText={"Most Loved"}
                    />
                </Grid>
                <Grid item display={"flex"} flexDirection={"column"} xs={5} pt={"5%"}>
                    <RatingList movies={hatedMovies.slice(0, 10)}
                                backgroundOverlayColor={"#3F37C9"}
                                backdropInterval={40000}
                                labelText={"Most Hated"}
                    />
                </Grid>
                
                <Grid item xs={12} gap={2}>
                    <RatingList movies={classicMovies.slice(0, 10)}
                                backgroundOverlayColor={"#4CC9F0"}
                                backdropInterval={22000}
                                labelText={"Classics"}
                    />
                </Grid>
            </Grid>
        
        </StyledStack>
    );
};

export default HomePage;
