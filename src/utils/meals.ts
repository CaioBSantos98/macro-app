import axios from "axios";
import IMealSummary from "../interfaces/IMealSummary";
import IFoodQuantity from "../interfaces/IFoodQuantity";
import IMealDetails from "../interfaces/IMealDetails";

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

export const createMeal = async (mealName: string, foods: IFoodQuantity[]): Promise<IMealDetails | null> => {
    try {
        const requestBody = {
            name: mealName,
            foodList: foods.map(f => {
                return {id: f.id, quantity: f.quantity}
            })
        }
        const response = await axios.post(`${url}/api/meal`, requestBody);
        const data: IMealDetails = response.data;
        return data
    } catch (error) {
        console.error('Failed get days meals', error);
        return null;
    }
}