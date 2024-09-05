import { Box, Divider, List, Typography } from "@mui/material";
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
                    boxShadow: "rgba(0, 0, 0, 0.5) 0px 3px 8px"
                }}>
                <Box component="header" display="flex" padding={2} alignItems="center" justifyContent="space-between" bgcolor="var(--orange)">
                    <DatePickerCustom date={date} setDate={setDate} />
                    <NewMealModal setMeal={setMeals} date={date} />
                </Box>
                <Divider sx={{ bgcolor: "var(--brown)" }} />
                <DaySummary meals={meals} />
                {meals.length > 0
                    ? <List component="ul" sx={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 2 }}>
                        {meals.map(meal => <MealDetails key={meal.id} meal={meal} setMeals={setMeals} />)}
                    </List>
                    : <Typography variant="h5" bgcolor="var(--beige)" p={2} textAlign="center">
                        Não existem refeições registradas neste dia.
                    </Typography>
                }
            </Box>
        </Box>
    )
}

export default Meals;