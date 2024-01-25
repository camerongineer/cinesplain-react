import axios, { isAxiosError } from "axios";
import CineSplainUser from "../types/cineSplainUser.ts";

const BASE_URL = import.meta.env.VITE_CINESPLAIN_API_URL;

export const retrieveUser = async (userId: string): Promise<CineSplainUser | null> => {
    try {
        const res = await axios.get(getCineSplainUserPath(userId));
        const user = res.data.data;
        return user.results;
    } catch (error) {
        if (isAxiosError(error) && error?.response?.status === 404) {
            throw new Error("User doesn't exist");
        }
        console.error(error);
        return null;
    }
};

export const createUser = async (newUser: CineSplainUser): Promise<CineSplainUser | null> => {
    try {
        const res = await axios.post(postCineSplainUserPath(), newUser);
        return res.data.data.results;
    } catch (error) {
        if (isAxiosError(error) && error?.response?.status === 404) {
            throw new Error("User doesn't exist");
        }
        console.error(error);
        return null;
    }
};

const getCineSplainUserPath = (userId: string) => `${BASE_URL}/user/${userId}`;
const postCineSplainUserPath = () => `${BASE_URL}/user/create`;