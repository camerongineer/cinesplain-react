import React from "react";
import CastMember from "../../../models/castMember";
import { Stack, styled } from "@mui/material";
import CastMemberCard from "./CastMemberCard";

const StyledStack = styled(Stack)`
  background-color: ${props => props.theme.palette.background.paper};
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 5px;
  overflow: clip;
  height: fit-content;
  font-size: calc(10px + 2vmin);
`;

interface CastMemberRowProps {
    castMembers: CastMember[];
    movieId: string | undefined;
}

const CastMemberRow: React.FC<CastMemberRowProps> = ({ castMembers, movieId }) => {
    return (
        <>
            {castMembers.length > 0 && <StyledStack flex={1} key={movieId} gap={2}>
                {castMembers.slice(0, 7).map(
                    castMember => <CastMemberCard key={castMember.castMemberId} castMember={castMember}/>)}
            </StyledStack>}
        </>
    );
};

export default CastMemberRow;