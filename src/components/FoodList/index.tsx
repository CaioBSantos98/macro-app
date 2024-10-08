import { List } from "@mui/material";
import IFoodItem from "../../interfaces/IFoodItem";
import IFoodQuantity from "../../interfaces/IFoodQuantity";
import FoodItem from "./FoodItem";

interface FoodListProps {
    foodList: IFoodItem[];
    selectedFoods: IFoodQuantity[]
    setSelectedFoods: React.Dispatch<React.SetStateAction<IFoodQuantity[]>>;
}

const FoodList = ({ foodList, selectedFoods, setSelectedFoods }: FoodListProps) => {
    return (
        <List component="ul" sx={{ width: "100%", maxHeight: 300, overflow: 'auto', borderRadius: 'sm', bgcolor: 'var(--beige)', p: 0 }}>
            {foodList.map(food => <FoodItem key={food.id} food={food} selectedFoods={selectedFoods} setSelectedFoods={setSelectedFoods} />)}
        </List>
    )
}

export default FoodList;