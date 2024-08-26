import CloseIcon from '@mui/icons-material/Close';
import { Button, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import IFoodItem from '../../interfaces/IFoodItem';
import { searchFood } from '../../utils/foods';
import FoodList from '../FoodList';

const SearchFoodModal = () => {

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
    const handleClose = () => {setOpen(false); setFoodList([]); setFoodName('')};
    const [foodName, setFoodName] = useState('');
    const [foodList, setFoodList] = useState<IFoodItem[]>([]);

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = await searchFood(foodName);
        if (data.content.length > 0) {
            setFoodList(data.content);
        }
    }

    return (
        <Box>
            <Button variant='contained' color='success' size='large' onClick={handleOpen}>
                Selecionar alimento
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component="form" sx={style}
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
                    <Typography variant="h4" component="h2">Selecione um alimento</Typography>
                    <TextField
                        required
                        label="Nome do alimento"
                        type="text"
                        value={foodName}
                        onChange={(event) => setFoodName(event.target.value)}
                        sx={{ width: "100%", bgcolor: "white" }}
                    />
                    {foodList.length > 0 && 
                        <FoodList foodList={foodList} />
                    }
                    <Button variant="contained" type="submit" sx={{
                        width: "100%",
                        height: "56px",
                        fontSize: "16px"
                    }}>Pesquisar</Button>
                </Box>
            </Modal>
        </Box>
    );
}

export default SearchFoodModal;