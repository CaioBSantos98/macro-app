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
                return { id: f.id, quantity: f.quantity }
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

export const getSummaryMeal = (meal: IMealDetails): IMealSummary => {
    const summaryMeal: IMealSummary = {
        id: meal.id,
        name: meal.name,
        date: meal.date,
        totalCalories: meal.foodList.reduce((acc, f) => acc + (f.foodDetails.calories * f.quantity), 0),
        totalCarbohydrates: meal.foodList.reduce((acc, f) => acc + (f.foodDetails.carbohydrate * f.quantity), 0),
        totalProtein: meal.foodList.reduce((acc, f) => acc + (f.foodDetails.protein * f.quantity), 0),
        totalFat: meal.foodList.reduce((acc, f) => acc + (f.foodDetails.fat * f.quantity), 0)
    }

    return summaryMeal;
}

export const fetchMealDetails = async (id: string): Promise<IMealDetails> => {
    try {
        const response = await axios.get(`${url}/api/meal/detailed/${id}`);
        const data: IMealDetails = response.data;
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to get meal details');
    }
}

export const addFoodsOnMeal = async (foods: IFoodQuantity[], mealId: string): Promise<IMealDetails> => {
    try {
        const requestBody = {
            mealId: mealId,
            foodList: foods.map(f => {
                return {
                    id: f.id,
                    quantity: f.quantity
                }
            })
        }
        const response = await axios.post(`${url}/api/meal/foods`, requestBody);
        const data: IMealDetails = response.data;
        return data;
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to add foods on ${mealId}`);
    }
}

export const removeFoodOnMeal = async (mealId: string, foodId: string): Promise<IMealDetails> => {
    try {
        const response = await axios.delete(`${url}/api/meal/${mealId}/food/${foodId}`);
        const data: IMealDetails = response.data;
        return data;
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to remove food: ${foodId} on meal: ${mealId}`);
    }
}

export const removeAllFoodsOnMeal = async (mealId: string): Promise<IMealDetails> => {
    try {
        const response = await axios.delete(`${url}/api/meal/${mealId}/foods`);
        const data: IMealDetails = response.data;
        return data;
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to remove all foods on meal: ${mealId}`);
    }
}

export const deleteMeal = async (mealId: string): Promise<number> => {
    try {
        const response = await axios.delete(`${url}/api/meal/delete/${mealId}`);
        return response.status;
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to delete meal: ${mealId}`);
    }
}