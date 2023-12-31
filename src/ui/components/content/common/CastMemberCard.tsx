import {
    Card,
    CardMedia,
    ImageListItem,
    ImageListItemBar,
    styled,
    Typography
} from "@mui/material";
import { SxProps } from "@mui/system";
import React, { useState } from "react";
import { PROFILE_SIZE } from "../../../../constants/ImageSizes";
import CastMember from "../../../../models/castMember";
import { getImagePath } from "../../../../utils/retrievalUtils";
import femaleSilhouette from "../../../images/female_silhouette.png";
import maleSilhouette from "../../../images/male_silhouette.png";

const StyledCard = styled(Card)`
    height: fit-content;
    min-width: 200px;
    margin: 5px;
    transition: opacity ${props => props.theme.transitions.duration.complex}ms ease-in-out;
    cursor: pointer;
    user-select: none;
`;

interface CastMemberCardProps {
    castMember: CastMember;
    sx?: SxProps;
}

const CastMemberCard: React.FC<CastMemberCardProps> = ({ castMember, sx }) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    
    const altSilhouette = castMember.gender === 1 ? femaleSilhouette : maleSilhouette;
    
    const handleViewDetails = () => setIsHovered(true);
    const handleCloseDetails = () => setIsHovered(false);
    
    return (
        <StyledCard
            elevation={5}
            sx={sx}
            style={{ opacity: loading ? "0" : "1" }}
            onMouseEnter={handleViewDetails}
            onMouseLeave={handleCloseDetails}
            onTouchStart={handleViewDetails}
            onTouchEnd={handleCloseDetails}
        >
            <ImageListItem>
                <CardMedia
                    component="img"
                    loading="lazy"
                    image={castMember.profilePath
                        ? getImagePath(castMember.profilePath, PROFILE_SIZE.MD_W185)
                        : altSilhouette}
                    alt={castMember.castMemberName}
                    height={210}
                    style={{ objectPosition: "50% 15%" }}
                    onLoad={() => setLoading(false)}
                />
                {isHovered &&
                    <ImageListItemBar
                        title={castMember.character &&
                            <Typography
                                variant="body2"
                                whiteSpace="pre-wrap"
                            >
                                "<strong>{castMember.character}</strong>"
                            </Typography>}
                        subtitle={castMember.castMemberName &&
                            <Typography
                                variant="body2"
                                whiteSpace="pre-wrap"
                            >
                                {castMember.castMemberName}
                            </Typography>}
                    />}
            </ImageListItem>
        </StyledCard>
    );
};

export default CastMemberCard;
