import femaleSilhouette from "@assets/female_silhouette.png";
import maleSilhouette from "@assets/male_silhouette.png";
import {
    Card,
    CardMedia
} from "@mui/material";
import React from "react";
import { PROFILE_SIZE } from "../../../../constants/ImageSizes.ts";
import Person from "../../../../types/person.ts";
import { getImagePath } from "../../../../utils/retrievalUtils.ts";

interface ProfileCardProps {
    person: Person;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
    person
}) => {
    const altSilhouette = person.gender === 1 ? femaleSilhouette : maleSilhouette;
    return (
        <Card sx={{
            width: 280,
            maxHeight: 632
        }}>
            <CardMedia
                component="img"
                loading="lazy"
                image={
                    person.profilePath
                        ? getImagePath(person.profilePath, PROFILE_SIZE.LG_H632)
                        : altSilhouette
                }
                alt={person.name}
            />
        </Card>
    );
};

export default ProfileCard;