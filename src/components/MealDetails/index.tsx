import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, ListItem, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import IMealDetails from '../../interfaces/IMealDetails';
import IMealSummary from "../../interfaces/IMealSummary";
import { fetchMealDetails } from '../../utils/meals';
import AddFoodModal from '../modal/AddFoodModal';
import MealDetailsFoodList from './MealDetailsFoodList';
import MealMenu from './MealMenu';

interface MealDetailsProps {
    meal: IMealSummary;
    setMeals: React.Dispatch<React.SetStateAction<IMealSummary[]>>
}

const MealDetails = ({ meal, setMeals }: MealDetailsProps) => {

    const [open, setOpen] = useState(false);
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

    const openAddFoodForm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        setOpen(true);
    }

    return (
        <ListItem>
            <Accordion sx={{ bgcolor: "var(--orange)", width: "100%", color: "var(--dark-brown)" }} expanded={expanded} onChange={() => setExpanded(!expanded)}>
                <AccordionSummary
                    expandIcon={<IconButton><ArrowDropDownIcon sx={{ color: "var(--brown)" }} fontSize='large' /></IconButton>}
                >
                    <Box
                        sx={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                        <Typography width="100%" variant='h5' fontWeight={700}>{meal.name}</Typography>
                        <IconButton onClick={event => openAddFoodForm(event)}>
                            <AddIcon fontSize="large" sx={{ color: "var(--brown)" }} />
                        </IconButton>
                        <MealMenu meal={meal} setMeals={setMeals} setMealDetails={setMealDetails} />
                    </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0, bgcolor: "var(--beige)" }}>
                    <Box bgcolor="var(--orange)" paddingRight={1} paddingLeft={1}>
                        <Typography>Calorias: {meal.totalCalories.toFixed(2)} kcal </Typography>
                        <Box sx={{
                            display: "flex",
                            gap: "20px"
                        }}>
                            <Typography>Carb: {meal.totalCarbohydrates.toFixed(2)}g </Typography>
                            <Typography>Prot: {meal.totalProtein.toFixed(2)}g </Typography>
                            <Typography>Gord: {meal.totalFat.toFixed(2)}g </Typography>
                        </Box>
                    </Box>
                    {mealDetails && <MealDetailsFoodList foodList={mealDetails.foodList} mealId={meal.id} setMeals={setMeals} setMealDetails={setMealDetails} />}
                </AccordionDetails>
            </Accordion>
            <AddFoodModal open={open} setOpen={setOpen} meal={meal} setMealDetails={setMealDetails} setMeals={setMeals} />
        </ListItem>
    )
}

export default MealDetails;