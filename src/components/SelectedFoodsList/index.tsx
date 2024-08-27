import { List, ListItem } from "@mui/joy";
import IFoodQuantity from "../../interfaces/IFoodQuantity";
import { Button } from "@mui/material";

interface SelectedFoodsListProps {
    selectedFoods: IFoodQuantity[]
}

const SelectedFoodsList = ({ selectedFoods }: SelectedFoodsListProps) => {
    return (
        <List component="ul" sx={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
            {selectedFoods.map(food => {
                return <ListItem key={food.id}>
                    <Button variant="contained" color="warning">
                        {food.name} ({food.serving * food.quantity}g)
                    </Button>
                </ListItem>
            })}
        </List>
    )
}

export default SelectedFoodsList;