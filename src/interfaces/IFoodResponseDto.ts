import IFoodItem from "./IFoodItem";

interface IFoodResponseDto {
    quantity: number,
    foodDetails: IFoodItem
}

export default IFoodResponseDto;