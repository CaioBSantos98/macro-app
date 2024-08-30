import AddIcon from '@mui/icons-material/Add';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
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
        <ListItem disablePadding>
            <Accordion sx={{ width: "100%" }} expanded={expanded} onChange={() => setExpanded(!expanded)}>
                <AccordionSummary
                    expandIcon={<IconButton><ArrowDownwardIcon color='primary' fontSize='medium' /></IconButton>}
                >
                    <Box
                        sx={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                        <Box>
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
                        <Box display="flex" alignItems="center">
                            <IconButton onClick={event => openAddFoodForm(event)} size='large'>
                                <AddIcon color='primary' />
                            </IconButton>
                            <MealMenu meal={meal} setMeals={setMeals} setMealDetails={setMealDetails} />
                        </Box>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    {mealDetails && <MealDetailsFoodList foodList={mealDetails.foodList} mealId={meal.id} setMeals={setMeals} setMealDetails={setMealDetails} />}
                </AccordionDetails>
            </Accordion>
            <AddFoodModal open={open} setOpen={setOpen} meal={meal} setMealDetails={setMealDetails} setMeals={setMeals} />
        </ListItem>
    )
}

export default MealDetails;