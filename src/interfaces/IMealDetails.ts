import IFoodQuantity from "./IFoodQuantity";

interface IMealDetails {
    name: string;
    id: string;
    date: string;
    foodList: IFoodQuantity[]
}

export default IMealDetails;