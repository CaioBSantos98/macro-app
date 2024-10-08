import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Box, Divider, IconButton, List, ListItem, Tooltip, Typography } from "@mui/material";
import { useState } from 'react';
import IFoodResponseDto from "../../../interfaces/IFoodResponseDto";
import IMealDetails from "../../../interfaces/IMealDetails";
import IMealSummary from "../../../interfaces/IMealSummary";
import { getSummaryMeal, removeFoodOnMeal } from "../../../utils/meals";
import UpdateMealModal from '../../modal/UpdateMealModal';

interface MealDetailsFoodListProps {
    foodList: IFoodResponseDto[];
    mealId: string;
    setMeals: React.Dispatch<React.SetStateAction<IMealSummary[]>>;
    setMealDetails: React.Dispatch<React.SetStateAction<IMealDetails | null>>;
}

const MealDetailsFoodList = ({ foodList, mealId, setMeals, setMealDetails }: MealDetailsFoodListProps) => {

    const [foodToUpdate, setFoodToUpdate] = useState<IFoodResponseDto | null>(null);

    const removeFoodItem = (food: IFoodResponseDto) => {
        const confirmed = confirm(`Realmente deseja remover ${food.foodDetails.name} ?`)
        if (confirmed) {
            const remove = async () => {
                const mealDetails = await removeFoodOnMeal(mealId, food.foodDetails.id);
                const mealSummary = getSummaryMeal(mealDetails);
                setMealDetails(mealDetails);
                setMeals(prevMeals => prevMeals.map(meal => {
                    if (meal.id === mealSummary.id) {
                        return { ...mealSummary }
                    }
                    return meal
                }))
            }
            remove();
        }
    }

    return (
        <List component="ul" sx={{ paddingLeft: 2, paddingRight: 2, display: 'flex', flexDirection: 'column', gap: 1, bgcolor: "var(--beige)" }}>
            {foodList.map(f =>
                <ListItem key={f.foodDetails.id} sx={{ display: "block", position: "relative", p: 0 }}>
                    <Tooltip title="Editar" placement="bottom-start">
                        <Typography fontWeight={700} sx={{ cursor: 'pointer', ":hover": { textDecoration: "underline" } }} onClick={() => { setFoodToUpdate(f) }}>
                            {f.foodDetails.name} ({(f.foodDetails.serving * f.quantity).toFixed(0)}g)
                        </Typography>
                    </Tooltip>
                    <Box sx={{
                        display: "flex",
                        gap: "20px",
                        maxWidth: "70%"
                    }}>
                        <Typography>Calorias: {(f.quantity * f.foodDetails.calories).toFixed(2)}kcal </Typography>
                        <Typography>Carb: {(f.quantity * f.foodDetails.carbohydrate).toFixed(0)}g </Typography>
                        <Typography>Prot: {(f.quantity * f.foodDetails.protein).toFixed(0)}g </Typography>
                        <Typography>Gord: {(f.quantity * f.foodDetails.fat).toFixed(0)}g </Typography>
                    </Box>
                    <IconButton size='large' sx={{ position: "absolute", right: 0, top: 0, height: "100%" }} onClick={() => removeFoodItem(f)}>
                        <DeleteOutlineOutlinedIcon fontSize='large' sx={{ color: "var(--brown)" }} />
                    </IconButton>
                    <Divider />
                </ListItem>
            )}
            {foodToUpdate && <UpdateMealModal food={foodToUpdate} setFood={setFoodToUpdate} mealId={mealId} setMealDetails={setMealDetails} setMeals={setMeals} />}
        </List>
    )
}

export default MealDetailsFoodList;