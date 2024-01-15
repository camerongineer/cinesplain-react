import {
    Box,
    Stack,
    TableCell,
    TableRow,
    Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getImagePath } from "../../../../api/moviesApi.ts";
import { POSTER_SIZE } from "../../../../constants/ImageSizes.ts";
import CastMember from "../../../../types/castMember.ts";
import Movie from "../../../../types/movie.ts";
import { getFormattedMovieLinkId } from "../../../../utils/formatUtils.ts";

const CreditsListCastRow = ({
    castMemberCredit
}: {
    castMemberCredit: CastMember
}) => {
    const navigate = useNavigate();
    const onRowClick = () => navigate(`/movies/${getFormattedMovieLinkId({
                                                                             title: castMemberCredit.originalTitle,
                                                                             id: castMemberCredit.id
                                                                         } as unknown as Movie)}`);
    
    return (
        <TableRow
            sx={{
                cursor: "pointer",
                "&:hover": {
                    backgroundColor: "#f0f0f0"
                },
                "&:last-child td, &:last-child th": { border: 0 }
            }}
            onClick={onRowClick}
        >
            <TableCell
                component="th"
                scope="row"
            >
                <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                >
                    {castMemberCredit.releaseDate
                        ? new Date(castMemberCredit.releaseDate).getFullYear()
                        : "Upcoming"}
                </Typography>
            </TableCell>
            <TableCell align="right">
                <Stack
                    direction="row"
                    justifyContent="end"
                    alignItems="center"
                    spacing={2}
                >
                    <Stack>
                        <Typography
                            variant="subtitle2"
                            fontWeight="bold"
                        >
                            {castMemberCredit.title}
                        </Typography>
                        {castMemberCredit.character && <Typography
                            variant="subtitle2"
                            fontSize="small"
                        >
                            as {castMemberCredit.character}
                        </Typography>}
                    </Stack>
                    {castMemberCredit.posterPath && <Box
                        component="img"
                        src={getImagePath(castMemberCredit.posterPath, POSTER_SIZE.XXXS_W92)}
                        width={45}
                    />}
                </Stack>
            </TableCell>
        </TableRow>
    );
};

export default CreditsListCastRow;