import axios, { AxiosResponse } from "axios";

export const retrieveData = async (url: string): Promise<AxiosResponse> => {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json"
        }
    };
    return (await axios.get(url, options)).data;
};