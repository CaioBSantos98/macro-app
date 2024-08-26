import axios from "axios";
import IPageResponse from "../interfaces/IPageResponse";

const url = import.meta.env.VITE_API_URL;

export const searchFood = async (foodName: string): Promise<IPageResponse> => {
    try {
        const response = await axios.get<IPageResponse>(`${url}/api/food/search/${foodName}`)
        return response.data;
    } catch (error) {
        console.error('Failed to search food', error);
        throw new Error('Not found!')
    }
}

