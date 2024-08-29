import CloseIcon from '@mui/icons-material/Close';
import { Button, Typography } from '@mui/material';
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
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        maxWidth: "600px",
        width: "100%",
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        padding: "20px",
    };

    const handleClose = () => { setOpen(false); setSelectedFoods([]) };
    const [selectedFoods, setSelectedFoods] = useState<IFoodQuantity[]>([]);

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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
                    if(meal.id === mealSummary.id) {
                        return {...mealSummary}
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
                    <Box component="form" sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "20px",
                        padding: "20px",
                    }}
                        onSubmit={(event) => submitHandler(event)}>
                        <CloseIcon
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                cursor: "pointer",
                                right: 20,
                                fontSize: "30px",
                                transition: "0.2s",
                                ":hover": {
                                    color: "blue"
                                }
                            }} />
                        <Typography variant="h5" component="h3">Adicione alimentos ao {meal.name} </Typography>
                        <Typography>Alimentos selecionados: {selectedFoods.length}</Typography>
                        {selectedFoods.length > 0 && <SelectedFoodsList selectedFoods={selectedFoods} />}
                        <Button variant="contained" type="submit" color="success">Adicionar</Button>
                    </Box>
                    <SearchFoodModal setSelectedFoods={setSelectedFoods} />
                </Box>
            </Modal>
        </Box>
    );
}

export default AddFoodModal;