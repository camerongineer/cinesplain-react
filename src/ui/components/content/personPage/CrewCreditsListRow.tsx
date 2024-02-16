import {
    Box,
    Stack,
    TableCell,
    TableRow,
    Typography
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getImagePath } from "../../../../api/moviesApi.ts";
import { POSTER_SIZE } from "../../../../constants/ImageSizes.ts";
import CrewMember from "../../../../types/crewMember.ts";
import Movie from "../../../../types/movie.ts";
import { getFormattedMovieLinkId } from "../../../../utils/formatUtils.ts";

interface CrewCreditsListRowProps {
    crewMemberCredit: CrewMember;
    hideLastBottomBorder: boolean;
}

const CrewCreditsListRow: React.FC<CrewCreditsListRowProps> = ({
    crewMemberCredit,
    hideLastBottomBorder: hideLastBottomBorder = true
}) => {
    const navigate = useNavigate();
    const onRowClick = () => navigate(`/movies/${getFormattedMovieLinkId({
                                                                             title: crewMemberCredit.originalTitle,
                                                                             id: crewMemberCredit.id
                                                                         } as unknown as Movie)}`);
    return (
        <TableRow
            sx={{
                cursor: "pointer",
                "&:hover": {
                    backgroundColor: "#00000060"
                },
                "&:last-child td, &:last-child th": { border: hideLastBottomBorder ? 0 : "auto" }
            }}
            onClick={onRowClick}
        >
            <TableCell>
                <Stack
                    direction="row"
                    justifyContent="start"
                    alignItems="center"
                    spacing={2}
                >
                    {crewMemberCredit.posterPath && <Box
                        component="img"
                        src={getImagePath(crewMemberCredit.posterPath, POSTER_SIZE.XXXS_W92)}
                        width={45}
                        minHeight={crewMemberCredit.posterPath ? 67.5 : "auto"}
                    />}
                    <Stack>
                        <Typography
                            variant="subtitle2"
                            fontWeight="bold"
                        >
                            {crewMemberCredit.title}
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            fontSize="small"
                        >
                            {crewMemberCredit.job}
                        </Typography>
                    </Stack>
                </Stack>
            </TableCell>
            <TableCell
                component="th"
                scope="row"
                align="right"
            >
                <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                >
                    {crewMemberCredit.releaseDate
                        ? new Date(crewMemberCredit.releaseDate).getFullYear()
                        : "Upcoming"}
                </Typography>
            </TableCell>
        </TableRow>
    );
};

export default CrewCreditsListRow;