import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Accordion, AccordionDetails, AccordionSummary, Box, ListItem, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import IMealDetails from '../../interfaces/IMealDetails';
import IMealSummary from "../../interfaces/IMealSummary";
import { fetchMealDetails } from '../../utils/meals';
import MealDetailsFoodList from './MealDetailsFoodList';

interface MealDetailsProps {
    meal: IMealSummary;
}

const MealDetails = ({ meal }: MealDetailsProps) => {

    const [expanded, setExpanded] = useState(false);
    const [mealDetails, setMealDetails] = useState<IMealDetails | null>(null);

    useEffect(() => {
        if (expanded && mealDetails === null) {
            fetchMealDetails(meal.id)
                .then(response => setMealDetails(response))
                .catch(() => {
                    setMealDetails(null);
                })
        }
    }, [expanded, meal, mealDetails]);

    return (
        <ListItem disablePadding>
            <Accordion sx={{ width: "100%" }} expanded={expanded} onChange={() => setExpanded(!expanded)}>
                <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                >
                    <Box width="100%">
                        <Typography component="h4" variant="h5">
                            {meal.name}
                        </Typography>
                        <Box sx={{
                            display: "flex",
                            gap: "20px"
                        }}>
                            <Typography>Calorias: {meal.totalCalories.toFixed(2)}kcal </Typography>
                            <Typography>Carb: {meal.totalCarbohydrates.toFixed(2)}g </Typography>
                            <Typography>Prot: {meal.totalProtein.toFixed(2)}g </Typography>
                            <Typography>Gord: {meal.totalFat.toFixed(2)}g </Typography>
                        </Box>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    {mealDetails && <MealDetailsFoodList foodList={mealDetails.foodList} />}
                </AccordionDetails>
            </Accordion>
        </ListItem>
    )
}

export default MealDetails;