import { getImagePath } from "./retrievalUtils";

export const getOverlaidImage = (overlayColor: string, imageUrl: string, imageWidth: string) => {
    const bgOverlay = `linear-gradient(${overlayColor}80, ${overlayColor}50, ${overlayColor}80), `;
    return bgOverlay +
        (imageUrl
            ? `linear-gradient(rgba(0, 0, 0, .4), rgba(0, 0, 0, .4)), url(${getImagePath(imageUrl, imageWidth)})`
            : "");
};
