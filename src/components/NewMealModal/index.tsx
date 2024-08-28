import CloseIcon from '@mui/icons-material/Close';
import { Button, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import IFoodQuantity from '../../interfaces/IFoodQuantity';
import SearchFoodModal from '../SearchFoodModal';
import SelectedFoodsList from '../SelectedFoodsList';
import { createMeal } from '../../utils/meals';

const NewMealModal = () => {

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

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(false); setSelectedFoods([]) };
    const [mealName, setMealName] = useState('');
    const [selectedFoods, setSelectedFoods] = useState<IFoodQuantity[]>([]);

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(selectedFoods);
        if (selectedFoods.length === 0) {
            alert("Nenhum alimento selecionado para essa refeição! Adicione um alimento e tente novamente.")
            return
        }
        const createdMeal = await createMeal(mealName, selectedFoods);
        setMealName('');
        handleClose();
    }

    return (
        <Box>
            <Button variant='contained' color='success' size='large' onClick={handleOpen}>
                Adicionar refeição
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-new-meal"
                aria-describedby="modal-to-create-a-new-meal-today"
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
                        <Typography variant="h4" component="h2">Adicione uma refeição</Typography>
                        <TextField
                            required
                            label="Nome da refeição"
                            type="text"
                            value={mealName}
                            onChange={(event) => setMealName(event.target.value)}
                            sx={{ width: "100%", bgcolor: "white" }}
                        />
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

export default NewMealModal;