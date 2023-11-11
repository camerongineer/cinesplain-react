import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardMedia, styled, Typography } from "@mui/material";
import CastMember from "../../../../models/castMember";
import { getSmallHeadShotPath } from "../../../../utils/retrievalUtils";
import femaleSilhouette from "../../../images/female_silhouette.png";
import maleSilhouette from "../../../images/male_silhouette.png";
import { SxProps } from "@mui/system";

const StyledCard = styled(Card)`
  overflow: visible;
  height: fit-content;
  min-width: 200px;
  margin: 5px;
  font-size: calc(10px + 2vmin);
  color: ${props => props.theme.palette.text.primary};
  transition: opacity ${props => props.theme.transitions.duration.complex}ms ease-in-out;
`;

interface CastMemberCardProps {
    castMember: CastMember;
    sx?: SxProps;
}

const CastMemberCard: React.FC<CastMemberCardProps> = ({ castMember, sx }) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    
    const altSilhouette = castMember.gender === 1 ? femaleSilhouette : maleSilhouette;
    
    return (
        <StyledCard elevation={5}
                    sx={sx}
                    style={{ opacity: loading ? "0" : "1" }}
                    key={castMember.castMemberId}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
            {<CardContent sx={{ position: "relative" }}>
                <Typography variant={"body2"}>{castMember.castMemberName}</Typography>
            </CardContent>}
            <CardMedia
                component="img"
                image={castMember.profilePath ? getSmallHeadShotPath(castMember.profilePath) : altSilhouette}
                alt={castMember.castMemberName}
                onLoad={() => setLoading(false)}
            />
            {castMember.character && <CardHeader
                title={<Typography variant={"body2"}>"<strong>{castMember.character}</strong>"</Typography>}/>}
        </StyledCard>
    );
};

export default CastMemberCard;
