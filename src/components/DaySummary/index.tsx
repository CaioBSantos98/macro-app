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
            flexDirection="column"
            alignItems="center"
            component="header"
            borderBottom="1px dashed grey"
        >
            <Typography component="h4" variant="h4">
                Resumo do dia
            </Typography>
            <Typography>Calorias: {calories.toFixed(2)} kcal </Typography>
            <Box sx={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%"
            }}>
                <Typography>Carboidratos: {carbohydrate.toFixed(2)}g </Typography>
                <Typography>Proteina: {protein.toFixed(2)}g </Typography>
                <Typography>Gordura: {fat.toFixed(2)}g </Typography>
            </Box>
        </Box>
    )
}

export default DaySummary;