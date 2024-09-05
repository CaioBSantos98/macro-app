import { Button, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import IFoodQuantity from '../../../interfaces/IFoodQuantity';
import IMealSummary from '../../../interfaces/IMealSummary';
import { createMeal, getSummaryMeal } from '../../../utils/meals';
import SelectedFoodsList from '../../SelectedFoodsList';
import SearchFoodModal from '../SearchFoodModal';
import { Add } from '@mui/icons-material';
import dayjs from 'dayjs';

interface NewMealModalProps {
    date: dayjs.Dayjs
    setMeal: React.Dispatch<React.SetStateAction<IMealSummary[]>>;
}

const NewMealModal = ({ date, setMeal }: NewMealModalProps) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        minWidth: "325px",
        maxWidth: "650px",
        minHeight: "70vh",
        width: "100%",
        borderRadius: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        paddingTop: 4,
        paddingBottom: 4
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(false); setSelectedFoods([]) };
    const [mealName, setMealName] = useState('');
    const [selectedFoods, setSelectedFoods] = useState<IFoodQuantity[]>([]);

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (selectedFoods.length === 0) {
            alert("Nenhum alimento selecionado para essa refeição! Adicione um alimento e tente novamente.")
            return
        }
        const createdMeal = await createMeal(mealName, selectedFoods, date);
        if (createdMeal) {
            const summaryMeal = getSummaryMeal(createdMeal);
            setMeal(prevMeals => [
                ...prevMeals,
                summaryMeal
            ])
        }
        setMealName('');
        handleClose();
    }

    return (
        <Box>
            <Button
                variant='contained'
                onClick={handleOpen}
                sx={{
                    p: "16px 8px",
                    bgcolor: "var(--lightgreen)",
                    gap: 1,
                    ":hover": { bgcolor: "var(--green)" }
                }}
            >
                <Add />
                <Typography fontWeight={700} paddingRight={1} >REFEIÇÃO</Typography>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-new-meal"
                aria-describedby="modal-to-create-a-new-meal-today"
                sx={{ m: 2, p: 2 }}
            >
                <Box sx={style}>
                    <Box
                        component="form"
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 1
                        }}
                        onSubmit={(event) => submitHandler(event)}
                    >
                        <TextField
                            required
                            label="Nome da refeição"
                            type="text"
                            value={mealName}
                            onChange={(event) => setMealName(event.target.value)}
                            sx={{ width: "100%", bgcolor: "var(--beige)", maxWidth: "90%" }}
                        />
                        <SearchFoodModal selectedFoods={selectedFoods} setSelectedFoods={setSelectedFoods} />
                        <Box width="90%" display="flex" gap={2}>
                            <Button fullWidth variant="contained" type="button" color="error" onClick={handleClose}>Cancelar</Button>
                            <Button fullWidth variant="contained" type="submit" color="success" sx={{ bgcolor: "var(--lightgreen)", ":hover": { bgcolor: "var(--green)" } }}>Adicionar ({selectedFoods.length})</Button>
                        </Box>
                    </Box>
                    {selectedFoods.length > 0 && <SelectedFoodsList selectedFoods={selectedFoods} setSelectedFoods={setSelectedFoods} />}
                </Box>
            </Modal>
        </Box>
    );
}

export default NewMealModal;