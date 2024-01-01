import {
    Stack,
    styled
} from "@mui/material";
import React from "react";
import CastMember from "../../../../models/castMember";
import OuterCarousel from "../../common/OuterCarousel";
import CastMemberCard from "./CastMemberCard";

const StyledStack = styled(Stack)`
    flex-direction: row;
    align-items: center;
    padding: 5px 5px 0 5px;
    width: auto;
    max-width: 100%;
    gap: 5px;
    justify-content: start;
    flex-wrap: nowrap;
`;

interface CastMemberRowProps {
    castMembers: CastMember[];
}

const CastMemberRow: React.FC<CastMemberRowProps> = ({
    castMembers
}) => {
    return (
        <>
            {castMembers.length > 0 &&
                <OuterCarousel
                    paddingY={1}
                    style={{ overflow: "auto" }}
                >
                    <StyledStack>
                        {castMembers.map(
                            castMember =>
                                <CastMemberCard
                                    key={castMember.castMemberId}
                                    sx={{
                                        minWidth: {
                                            xs: "40vw",
                                            sm: "28vw",
                                            md: "156px"
                                        }
                                    }}
                                    castMember={castMember}
                                />)}
                    </StyledStack>
                </OuterCarousel>}
        </>
    );
};

export default CastMemberRow;