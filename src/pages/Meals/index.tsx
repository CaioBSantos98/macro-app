import { Box, List } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import DatePickerCustom from "../../components/DatePickerCustom";
import DaySummary from "../../components/DaySummary";
import MealDetails from "../../components/MealDetails";
import NewMealModal from "../../components/modal/NewMealModal";
import IMealSummary from "../../interfaces/IMealSummary";
import { getDayMeals } from "../../utils/meals";


const Meals = () => {
    const today = dayjs().subtract(3, "hour");
    const [date, setDate] = useState<Dayjs>(today);
    const [meals, setMeals] = useState<IMealSummary[]>([]);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await getDayMeals(date.format("YYYY-MM-DD"));
                setMeals(response);
            } catch (error) {
                console.error('Failed to fetch meals', error);
            }
        }

        fetchMeals();
    }, [date])

    return (
        <Box component="section" display="flex" flexDirection="column" alignItems="center" p={3}>
            <Box
                maxWidth="768px"
                sx={{
                    bgcolor: "white",
                    width: "100%",
                    boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
                }}>
                <Box component="header" display="flex" padding={2} alignItems="center" justifyContent="space-between" bgcolor="var(--orange)">
                    <DatePickerCustom date={date} setDate={setDate} />
                    <NewMealModal setMeal={setMeals} />
                </Box>
                <DaySummary meals={meals} />
                <List component="ul" sx={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 2 }}>
                    {meals.map(meal => <MealDetails key={meal.id} meal={meal} setMeals={setMeals} />)}
                </List>
            </Box>
        </Box>
    )
}

export default Meals;