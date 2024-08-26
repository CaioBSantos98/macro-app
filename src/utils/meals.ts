import axios from "axios";
import IMealSummary from "../interfaces/IMealSummary";

axios.defaults.withCredentials = true;
const url = import.meta.env.VITE_API_URL;

export const getDayMeals = async (date: string): Promise<IMealSummary[]> => {
    try {
        const response = await axios.get(`${url}/api/meal?date=${date}`);
        const data: IMealSummary[] = response.data;
        return data;
    } catch (error) {
        console.error('Failed get days meals', error);
        return [];
    }
}