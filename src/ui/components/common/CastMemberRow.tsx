import React from "react";
import CastMember from "../../../models/castMember";
import { Stack, styled } from "@mui/material";
import CastMemberCard from "./CastMemberCard";

const StyledStack = styled(Stack)`
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;

`;

interface CastMemberRowProps {
    castMembers: CastMember[];
    movieId: string | undefined;
}

const CastMemberRow: React.FC<CastMemberRowProps> = ({ castMembers, movieId }) => {
    return (
        <>
            {castMembers.length > 0 && <StyledStack overflow={"scroll"}
                                                    sx={{
                                                        scrollbarWidth: "none",
                                                        "&::-webkit-scrollbar": { display: "none" } }}>
                <Stack flex={1}
                       flexDirection={"row"}
                       alignItems={"center"}
                       key={movieId}
                       padding={"5px 5px 0 5px"}
                       gap={2}
                       maxWidth={"100%"}>
                    {castMembers.slice(0, 8).map(
                        castMember => <CastMemberCard sx={{ minWidth: 150 }} key={castMember.castMemberId}
                                                      castMember={castMember}/>)}
                </Stack>
            </StyledStack>}
        </>
    );
};

export default CastMemberRow;