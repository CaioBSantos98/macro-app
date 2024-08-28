import IFoodResponseDto from "./IFoodResponseDto";

interface IMealDetails {
    name: string;
    id: string;
    date: string;
    foodList: IFoodResponseDto[]
}

export default IMealDetails;