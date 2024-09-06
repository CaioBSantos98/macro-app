import axios from "axios";
import IPageResponse from "../interfaces/IPageResponse";
import IFoodItem from "../interfaces/IFoodItem";

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

export const pageSearchFood = async (foodName: string, page: number): Promise<IPageResponse> => {
    try {
        const response = await axios.get<IPageResponse>(`${url}/api/food/search/${foodName}?page=${page}`)
        return response.data;
    } catch (error) {
        console.error('Failed to search food', error);
        throw new Error('Not found!')
    }
}

export const registerFood = async (foodName: string, brand: string, serving: number, carbohydrate: number, protein: number, fat: number): Promise<IFoodItem> => {
    const body = {
        name: foodName,
        brand: brand === '' ? null : brand,
        serving: serving,
        carbohydrate: carbohydrate,
        protein: protein,
        fat: fat
    }

    try {
        const response = await axios.post(`${url}/api/food`, body)
        const data: IFoodItem = response.data;
        return data;
    } catch (error) {
        console.error('Failed to register food', error);
        throw new Error('Failed to register food!')
    }
}

