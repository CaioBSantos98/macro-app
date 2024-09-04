import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import IFoodItem from '../../../interfaces/IFoodItem';
import IFoodQuantity from '../../../interfaces/IFoodQuantity';
import { searchFood } from '../../../utils/foods';
import FoodList from '../../FoodList';
import { useNavigate } from 'react-router-dom';

interface SearchFoodModalProps {
    setSelectedFoods: React.Dispatch<React.SetStateAction<IFoodQuantity[]>>
}

const SearchFoodModal = ({ setSelectedFoods }: SearchFoodModalProps) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        p: 2,
        maxWidth: "600px",
        width: "100%",
        height: 500,
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(false); setFoodList([]); setFoodName('') };
    const [foodName, setFoodName] = useState('');
    const [foodList, setFoodList] = useState<IFoodItem[]>([]);
    const [foodFound, setFoodFound] = useState(true);
    const navigate = useNavigate();

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = await searchFood(foodName);
        if (data.content.length > 0) {
            setFoodList(data.content);
            setFoodFound(true);
        } else {
            setFoodList([]);
            setFoodFound(false);
        }
    }

    return (
        <Box width="90%">
            <Button fullWidth variant='contained' onClick={handleOpen} sx={{ bgcolor: "var(--brown)", ":hover": { bgcolor: "var(--dark-brown)" } }}>
                Selecionar alimentos
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ m: 2 }}
            >
                <Box component="form" sx={style}
                    onSubmit={(event) => submitHandler(event)}>
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            transition: "0.2s",
                            color: "var(--brown)",
                            ":hover": {
                                color: "var(--dark-brown)"
                            }
                        }}
                    >
                        <CloseIcon fontSize='large' />
                    </IconButton>
                    <Typography variant="h4" component="h2">Selecione um alimento</Typography>
                    <TextField
                        required
                        label="Nome do alimento"
                        type="text"
                        value={foodName}
                        onChange={(event) => setFoodName(event.target.value)}
                        onFocus={() => setFoodFound(true)}
                        sx={{ width: "100%", bgcolor: "white" }}
                    />
                    <Button fullWidth variant="contained" type="submit" sx={{ bgcolor: "var(--brown)", ":hover": { bgcolor: "var(--dark-brown)" } }}>Pesquisar</Button>
                    {foodList.length > 0 &&
                        <FoodList setSelectedFoods={setSelectedFoods} foodList={foodList} />
                    }
                    {!foodFound &&
                        <Box textAlign="center">
                            <Typography>Alimento "{foodName}" não encontrado.</Typography>
                            <Typography>Deseja cadastrar "{foodName}"?</Typography>
                            <Button
                                variant='contained'
                                color='success'
                                onClick={() => navigate("/new-food", { state: { foodName: foodName } })}
                            >
                                Cadastrar
                            </Button>
                        </Box>
                    }
                </Box>
            </Modal>
        </Box>
    );
}

export default SearchFoodModal;