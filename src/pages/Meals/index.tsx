import { Box, List } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import DaySummary from "../../components/DaySummary";
import MealDetails from "../../components/MealDetails";
import NewMealModal from "../../components/modal/NewMealModal";
import IMealSummary from "../../interfaces/IMealSummary";
import { getDayMeals } from "../../utils/meals";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

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
        <Box component="section" display="flex" flexDirection="column" alignItems="center" paddingTop={4}>
            <NewMealModal setMeal={setMeals} />
            <Box
                bgcolor="ButtonFace"
                position="relative" 
                maxWidth="768px"
                padding={2}
                marginLeft={2}
                borderRadius={4}
                sx={{
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                    width: "100%"
                }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            label="Data"
                            format="DD/MM/YYYY"
                            value={date}
                            onChange={(newValue) => setDate(newValue ? newValue : today)}
                            sx={{ width: 50, position: "absolute", right: 20}}
                        />
                    </DemoContainer>
                </LocalizationProvider>
                <DaySummary meals={meals} />
                <List component="ul" sx={{ listStyle: "none" }}>
                    {meals.map(meal => <MealDetails key={meal.id} meal={meal} setMeals={setMeals} />)}
                </List>
            </Box>
        </Box>
    )
}

export default Meals;