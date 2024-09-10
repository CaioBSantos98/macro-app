import { Button, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import IFoodResponseDto from '../../../interfaces/IFoodResponseDto';
import IMealDetails from '../../../interfaces/IMealDetails';
import IMealSummary from '../../../interfaces/IMealSummary';
import { getSummaryMeal, updateMeal } from '../../../utils/meals';

interface UpdateMealModalProps {
    food: IFoodResponseDto | null;
    setFood: React.Dispatch<React.SetStateAction<IFoodResponseDto | null>>;
    mealId: string;
    setMeals: React.Dispatch<React.SetStateAction<IMealSummary[]>>;
    setMealDetails: React.Dispatch<React.SetStateAction<IMealDetails | null>>
}

const UpdateMealModal = ({ food, setFood, mealId, setMeals, setMealDetails }: UpdateMealModalProps) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        p: 2,
        maxWidth: "450px",
        width: "100%",
        minHeight: "50vh",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
    };

    const [quantity, setQuantity] = useState<number>(food!.quantity);

    const handleClose = () => {
        setFood(null);
    };

    const update = () => {

        const asyncUpdate = async () => {
            const mealDetails = await updateMeal(mealId, food!.foodDetails.id, quantity);
            const mealSummary = getSummaryMeal(mealDetails);
            setMealDetails(mealDetails);
            setMeals(prevMeals => prevMeals.map(meal => {
                if (meal.id === mealSummary.id) {
                    return { ...mealSummary }
                }
                return meal
            }))
        }

        if (quantity !== food?.quantity && quantity > 0) {
            asyncUpdate();
        }
        handleClose();
    }

    return (
        <Modal
            open={food != null}
            onClose={handleClose}
            aria-labelledby="modal-update-meal"
            aria-describedby="modal-to-update-a-food-on-meal"
            sx={{ m: 2 }}
        >
            <Box sx={style}>
                {food &&
                    <Box width="90%">
                        <Typography variant="h4" component="h4" color="var(--dark-orange)" textAlign="center" marginBottom={2}>
                            {food?.foodDetails.name} {food?.foodDetails.brand && `(${food.foodDetails.brand})`}
                        </Typography>
                        <TextField fullWidth label="Quantidade" type="number" value={quantity} onChange={event => setQuantity(Number(event.target.value))} />
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                            Porção: {(food.foodDetails.serving * quantity).toFixed(0)}g
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                            Calorias: {(food.foodDetails.calories * quantity).toFixed(2)} kcal
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                            Carboidratos: {(food.foodDetails.carbohydrate * quantity).toFixed(2)}g
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                            Proteína: {(food.foodDetails.protein * quantity).toFixed(2)}g
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                            Gordura: {(food.foodDetails.fat * quantity).toFixed(2)}g
                        </Typography>
                    </Box>
                }
                <Box width="90%" display="flex" gap={2}>
                    <Button fullWidth variant="contained" type="button" color="error" onClick={handleClose}>Cancelar</Button>
                    <Button fullWidth onClick={update} variant="contained" color="success" sx={{ bgcolor: "var(--lightgreen)", ":hover": { bgcolor: "var(--green)" } }}>Concluir</Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default UpdateMealModal;