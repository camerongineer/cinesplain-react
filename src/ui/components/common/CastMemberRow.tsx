import React from "react";
import CastMember from "../../../models/castMember";
import { Stack, styled } from "@mui/material";
import CastMemberCard from "./CastMemberCard";
import OuterCarousel from "./OuterCarousel";

const StyledStack = styled(Stack)`
  flex: 1;
  float: left;
  flex-direction: row;
  align-items: center;
  padding: 5px 5px 0 5px;
  max-width: 100%;
  gap: 5px;
  justify-content: start;
  flex-wrap: nowrap;
`;

interface CastMemberRowProps {
    castMembers: CastMember[];
    movieId: string | undefined;
}

const CastMemberRow: React.FC<CastMemberRowProps> = ({ castMembers, movieId }) => {
    return (
        <>
            {castMembers.length > 0 && <OuterCarousel>
                <StyledStack key={movieId}>
                    {castMembers.slice(0, 20).map(
                        castMember => <CastMemberCard sx={{ minWidth: 150 }} key={castMember.castMemberId}
                                                      castMember={castMember}/>)}
                </StyledStack>
            </OuterCarousel>}
        </>
    );
};

export default CastMemberRow;