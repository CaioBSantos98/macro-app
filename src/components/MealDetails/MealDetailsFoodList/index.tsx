import { Box, Button, List, ListItem, Typography } from "@mui/material";
import IFoodResponseDto from "../../../interfaces/IFoodResponseDto";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { getSummaryMeal, removeFoodOnMeal } from "../../../utils/meals";
import IMealSummary from "../../../interfaces/IMealSummary";
import IMealDetails from "../../../interfaces/IMealDetails";

interface MealDetailsFoodListProps {
    foodList: IFoodResponseDto[];
    mealId: string;
    setMeals: React.Dispatch<React.SetStateAction<IMealSummary[]>>;
    setMealDetails: React.Dispatch<React.SetStateAction<IMealDetails | null>>;
}

const MealDetailsFoodList = ({ foodList, mealId, setMeals, setMealDetails }: MealDetailsFoodListProps) => {

    const removeFoodItem = (food: IFoodResponseDto) => {
        const confirmed = confirm('Realmente deseja remover esse alimento da refeição?')
        if (confirmed) {
            const remove = async () => {
                const mealDetails = await removeFoodOnMeal(mealId, food.foodDetails.id);
                const mealSummary = getSummaryMeal(mealDetails);
                setMealDetails(mealDetails);
                setMeals(prevMeals => prevMeals.map(meal => {
                    if(meal.id === mealSummary.id) {
                        return {...mealSummary}
                    }
                    return meal
                }))
            }
            remove();
        }
    }

    return (
        <List component="ul">
            {foodList.map(f =>
                <ListItem key={f.foodDetails.id} sx={{display: "block", position: "relative"}}>
                    <Typography>
                        {f.foodDetails.name} ({(f.foodDetails.serving * f.quantity).toFixed(0)}g)
                    </Typography>
                    <Box sx={{
                        display: "flex",
                        gap: "20px"
                    }}>
                        <Typography>Calorias: {(f.quantity * f.foodDetails.calories).toFixed(2)}kcal </Typography>
                        <Typography>Carb: {(f.quantity * f.foodDetails.carbohydrate).toFixed(0)}g </Typography>
                        <Typography>Prot: {(f.quantity * f.foodDetails.protein).toFixed(0)}g </Typography>
                        <Typography>Gord: {(f.quantity * f.foodDetails.fat).toFixed(0)}g </Typography>
                    </Box>
                    <Button sx={{position: "absolute", right: 0, top: 0, height: "100%"}} onClick={() => removeFoodItem(f)}>
                        <DeleteOutlineOutlinedIcon color="primary" fontSize="large" />
                    </Button>
                </ListItem>
            )}
        </List>
    )
}

export default MealDetailsFoodList;