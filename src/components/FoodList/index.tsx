import { Box, Checkbox, FormControlLabel, ListItem, Typography } from "@mui/material";
import { useRecoilState } from "recoil";
import IFoodItem from "../../interfaces/IFoodItem";
import { selectedFoods } from "../../state/atom";

interface FoodListProps {
    foodList: IFoodItem[];
}

const FoodList = ({ foodList }: FoodListProps) => {

    const [selectedFoodsValue, setSelectedFoods] = useRecoilState(selectedFoods);

    const handleCheckboxChange = (id: string) => {
        setSelectedFoods(prevSelected => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(id)) {
                newSelected.delete(id);
            } else {
                newSelected.add(id);
            }
            return newSelected;
        });
    };

    return (
        <Box component="ul">
            <span>{selectedFoodsValue.size}</span>
            {foodList.map(food =>
                <ListItem key={food.id}>
                    <FormControlLabel
                        label={
                            <Box>
                                <Typography>{food.name}</Typography>
                                <Box display="flex" justifyContent="space-around" alignItems="center" gap={2}>
                                    <Typography fontSize={12}>Calorias: {food.calories.toFixed(2)}</Typography>
                                    <Typography fontSize={12}>Porção (g): {food.serving}</Typography>
                                    <Typography fontSize={12}>Carboidrato: {food.carbohydrate.toFixed(2)}</Typography>
                                    <Typography fontSize={12}>Proteina: {food.protein.toFixed(2)}</Typography>
                                    <Typography fontSize={12}>Gordura: {food.fat.toFixed(2)}</Typography>
                                </Box>
                            </Box>
                        }
                        control={
                            <Checkbox size="large"
                                onChange={() => handleCheckboxChange(food.id)}
                            />
                        }>
                    </FormControlLabel>
                </ListItem>
            )}
        </Box>
    )
}

export default FoodList;