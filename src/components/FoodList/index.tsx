import { List } from "@mui/material";
import IFoodItem from "../../interfaces/IFoodItem";
import IFoodQuantity from "../../interfaces/IFoodQuantity";
import FoodItem from "./FoodItem";

interface FoodListProps {
    foodList: IFoodItem[];
    setSelectedFoods: React.Dispatch<React.SetStateAction<IFoodQuantity[]>>;
}

const FoodList = ({ foodList, setSelectedFoods }: FoodListProps) => {
    return (
        <List component="ul" sx={{ width: "100%", maxHeight: 300, overflow: 'auto', borderRadius: 'sm' }}>
            {foodList.map(food => <FoodItem key={food.id} food={food} setSelectedFoods={setSelectedFoods} />)}
        </List>
    )
}

export default FoodList;