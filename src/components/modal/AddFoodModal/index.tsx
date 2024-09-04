import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import IFoodQuantity from '../../../interfaces/IFoodQuantity';
import IMealSummary from '../../../interfaces/IMealSummary';
import SelectedFoodsList from '../../SelectedFoodsList';
import SearchFoodModal from '../SearchFoodModal';
import { addFoodsOnMeal, getSummaryMeal } from '../../../utils/meals';
import IMealDetails from '../../../interfaces/IMealDetails';

interface AddFoodModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    meal: IMealSummary;
    setMealDetails: React.Dispatch<React.SetStateAction<IMealDetails | null>>;
    setMeals: React.Dispatch<React.SetStateAction<IMealSummary[]>>;
}

const AddFoodModal = ({ open, setOpen, meal, setMealDetails, setMeals }: AddFoodModalProps) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        p: 2,
        maxWidth: "600px",
        width: "100%",
        minHeight: "50vh",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
    };

    const handleClose = () => { setOpen(false); setSelectedFoods([]) };
    const [selectedFoods, setSelectedFoods] = useState<IFoodQuantity[]>([]);

    const addFoodToMeal = async () => {
        if (selectedFoods.length === 0) {
            alert("Nenhum alimento selecionado! Adicione um alimento e tente novamente.")
            return
        }

        const addFoods = async () => {
            try {
                const mealDetails = await addFoodsOnMeal(selectedFoods, meal.id);
                const mealSummary = getSummaryMeal(mealDetails);
                setMealDetails(mealDetails);
                setMeals(prevMeals => prevMeals.map(meal => {
                    if (meal.id === mealSummary.id) {
                        return { ...mealSummary }
                    }
                    return meal
                }))
            } catch (error) {
                console.error(error)
            }
        }
        addFoods();
        handleClose();
    }

    return (
        <Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-add-new-food"
                aria-describedby="modal-to-add-a-new-food-on-this-meal"
            >
                <Box sx={style}>
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            top: 5,
                            right: 5,
                            color: "var(--brown)",
                            ":hover": {
                                color: "var(--dark-brown)"
                            }
                        }}
                    >
                        <CloseIcon fontSize='large' />
                    </IconButton>
                    <Typography variant="h5" component="h3">Adicione alimentos ao {meal.name} </Typography>
                    {selectedFoods.length > 0 && <SelectedFoodsList selectedFoods={selectedFoods} setSelectedFoods={setSelectedFoods} />}
                    <SearchFoodModal setSelectedFoods={setSelectedFoods} />
                    <Button sx={{ width: "90%" }} variant="contained" onClick={addFoodToMeal} color="success">Adicionar ({selectedFoods.length})</Button>
                </Box>
            </Modal>
        </Box>
    );
}

export default AddFoodModal;