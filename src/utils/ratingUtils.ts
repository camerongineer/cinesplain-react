export const getCSRatingColor = (rating: number) => {
    return rating < 60 ? "rgba(236,122,39,0.7)" : rating < 80 ? "rgba(255,132,232,0.7)" : "rgba(76,67,212,0.7)";
};