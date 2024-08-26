interface IFoodItem {
    id: string;
    name: string;
    brand: string | null; // Pode ser null ou uma string
    serving: number;
    calories: number;
    carbohydrate: number;
    protein: number;
    fat: number;
}

export default IFoodItem;