import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardMedia, styled, Typography } from "@mui/material";
import CastMember from "../../../models/castMember";
import { getSmallHeadShotPath } from "../../../utils/retrievalUtils";
import femaleSilhouette from "../../images/female_silhouette.png";
import maleSilhouette from "../../images/male_silhouette.png";
import { SxProps } from "@mui/system";

const StyledCard = styled(Card)`
  overflow: hidden;
  height: fit-content;
  margin: 5px;
  font-size: calc(10px + 2vmin);
  color: ${props => props.theme.palette.text.primary};
`;

interface CastMemberCardProps {
    castMember: CastMember;
    sx?: SxProps;
}

const CastMemberCard: React.FC<CastMemberCardProps> = ({ castMember, sx }) => {
    const [isHovered, setIsHovered] = useState(false);
    const headshotPath = castMember.gender === 1 ? femaleSilhouette : maleSilhouette;

    return (
        <StyledCard elevation={5}
                    sx={sx}
                    key={castMember.castMemberId}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
            {<CardContent sx={{position: "relative"}}>
                <Typography variant={"body2"}>{castMember.castMemberName}</Typography>
            </CardContent>}
            <CardMedia
                component="img"
                image={castMember.profilePath ? getSmallHeadShotPath(castMember.profilePath) : headshotPath}
                alt={castMember.castMemberName}
            />
            {castMember.character && <CardHeader title={<Typography variant={"body2"}>"<strong>{castMember.character}</strong>"</Typography>}/>}
        </StyledCard>
    );
};

export default CastMemberCard;
