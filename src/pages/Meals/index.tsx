import { Box } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import DaySummary from "../../components/DaySummary";
import MealDetails from "../../components/MealDetails";
import NewMealModal from "../../components/NewMealModal";
import IMealSummary from "../../interfaces/IMealSummary";
import { getDayMeals } from "../../utils/meals";

const Meals = () => {
    const today = dayjs().subtract(3, "hour").format("YYYY-MM-DD");
    const [meals, setMeals] = useState<IMealSummary[]>([]);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await getDayMeals(today);
                setMeals(response);
            } catch (error) {
                console.error('Failed to fetch meals', error);
            }
        }

        fetchMeals();
    }, [])

    return (
        <Box component="section">
            <Box maxWidth="768px"
                padding={2}
                marginLeft={2}
                borderRadius={4}
                sx={{
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
                }}>
                <span>{today}</span>
                <DaySummary meals={meals} />
                <Box component="ul" sx={{listStyle: "none"}}>
                    {meals.map(meal => <MealDetails key={meal.id} meal={meal} />)}  
                </Box>
            </Box>
            <NewMealModal />
        </Box>
    )
}

export default Meals;