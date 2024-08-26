import { Box, Typography } from "@mui/material";
import IMealSummary from "../../interfaces/IMealSummary";

interface MealDetailsProps {
    meal: IMealSummary;
}

const MealDetails = ({meal}: MealDetailsProps) => {
    return (
        <Box sx={{borderBottom: "1px dashed gray"}} component="li">
            <Typography component="h4" variant="h4">
                {meal.name}
            </Typography>
            <Typography>Calorias: {meal.totalCalories.toFixed(2)}kcal </Typography>
            <Box sx={{
                display: "flex",
                gap: "20px"
            }}>
                <Typography>Carboidratos: {meal.totalCarbohydrates.toFixed(2)}g </Typography>
                <Typography>Proteina: {meal.totalProtein.toFixed(2)}g </Typography>
                <Typography>Gordura: {meal.totalFat.toFixed(2)}g </Typography>
            </Box>
        </Box>
    )
}

export default MealDetails;