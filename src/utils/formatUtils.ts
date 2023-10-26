export const getFormattedDate = (dateString: string | undefined) => {
    if (!dateString) {
        return "";
    }
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat("en-us", {
        dateStyle: "long"
    });
    return formatter.format(date);
};

export const getFormattedCurrencyAmount = (dollarAmount: number) => {
    return dollarAmount.toLocaleString("en-us", { style: "currency", currency: "USD" });
};