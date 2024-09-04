import { Box, Typography } from "@mui/material";
import IMealSummary from "../../interfaces/IMealSummary";

interface DaySummaryProps {
    meals: IMealSummary[];
}

const DaySummary = ({ meals }: DaySummaryProps) => {

    const calories = meals.reduce((accumulator, meal) => accumulator + meal.totalCalories, 0);
    const carbohydrate = meals.reduce((accumulator, meal) => accumulator + meal.totalCarbohydrates, 0);
    const protein = meals.reduce((accumulator, meal) => accumulator + meal.totalProtein, 0);
    const fat = meals.reduce((accumulator, meal) => accumulator + meal.totalFat, 0);

    return (
        <Box
            display="flex"
            justifyContent="space-around"
            bgcolor="var(--orange)"
            color="var(--dark-brown)"
            p={1}
        >
            <Typography>Carb: {carbohydrate.toFixed(2)}g </Typography>
            <Typography>Prot: {protein.toFixed(2)}g </Typography>
            <Typography>Gord: {fat.toFixed(2)}g </Typography>
            <Typography fontWeight={700} >Cals: {calories.toFixed(2)}kcal </Typography>
        </Box>
    )
}

export default DaySummary;