import {
    ComponentPreview,
    Previews
} from "@react-buddy/ide-toolbox";
import CastMemberCard from "../ui/components/content/common/CastMemberCard.tsx";
import Layout from "../ui/components/Layout.tsx";
import { PaletteTree } from "./palette";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/CastMemberCard">
                <CastMemberCard/>
            </ComponentPreview>
            <ComponentPreview path="/Layout">
                <Layout/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;