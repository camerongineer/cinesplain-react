import {
    Stack,
    styled
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Credit from "../../../../types/credit.ts";
import Person from "../../../../types/person.ts";
import { getFormattedPersonLinkId } from "../../../../utils/formatUtils.ts";

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
    castMembers: Credit[];
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
                                <Link
                                    to={`/person/${getFormattedPersonLinkId(castMember as unknown as Person)}`}
                                    key={castMember.id}
                                >
                                    <CastMemberCard
                                        sx={{
                                            minWidth: {
                                                xs: "40vw",
                                                sm: "28vw",
                                                md: "156px"
                                            }
                                        }}
                                        castMember={castMember}
                                    />
                                </Link>)}
                    </StyledStack>
                </OuterCarousel>}
        </>
    );
};

export default CastMemberRow;