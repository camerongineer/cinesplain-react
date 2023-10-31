import React from "react";
import Movie from "../../../../models/movie";
import TaglineDisplay from "../common/TaglineDisplay";
import { StandardTypography } from "../../../styles/Typography";
import { Paper, Stack, styled } from "@mui/material";
import ReleaseDateDisplay from "../common/ReleaseDateDisplay";
import CurrencyDisplay from "../common/CurrencyDisplay";
import RuntimeDisplay from "../common/RuntimeDisplay";

const StyledPaper = styled(Paper)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: ${props => `opacity ${props.theme.transitions.duration.short}ms ease-in-out`};
  background: linear-gradient(270deg, ${props => props.theme.palette.grey[500]}, ${props => props.theme.palette.grey[200]});
  padding: 20px;
  color: ${props => props.theme.palette.getContrastText(props.theme.palette.grey[300])};
`;

interface MovieSideBarProps {
    movie: Movie;
}

const MovieSideBar: React.FC<MovieSideBarProps> = ({ movie }) => (
    <StyledPaper elevation={5}>
        <TaglineDisplay tagline={movie.tagline}/>
        <StandardTypography variant={"h5"}
                            pt={2}
                            pb={1}>
            Overview
        </StandardTypography>
        <StandardTypography variant={"body1"}
                            pb={5}>
            {movie.overview}
        </StandardTypography>
        <Stack alignItems={"center"}
               spacing={1}>
            <RuntimeDisplay runtime={movie.runtime} includeLabel={true}/>
            <ReleaseDateDisplay releaseDate={movie.releaseDate} includeLabel={true}/>
            <CurrencyDisplay labelText={"Budget"} currencyAmount={movie.budget}/>
            <CurrencyDisplay labelText={"Revenue"} currencyAmount={movie.revenue}/>
        </Stack>
    </StyledPaper>
);

export default MovieSideBar;