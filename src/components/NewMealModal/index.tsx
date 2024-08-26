import { Button, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

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
    const handleClose = () => setOpen(false);
    const [mealName, setMealName] = useState('');

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMealName('');
    }

    return (
        <Box>
            <Button variant='contained' color='success' size='large' onClick={handleOpen}>
                Adicionar refeição
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
                    <Typography variant="h4" component="h2">Adicione uma refeição</Typography>
                    <TextField
                        required
                        label="Nome da refeição"
                        type="text"
                        value={mealName}
                        onChange={(event) => setMealName(event.target.value)}
                        sx={{ width: "100%", bgcolor: "white" }}
                    />
                    <Button variant="contained" type="submit" sx={{
                        width: "100%",
                        height: "56px",
                        fontSize: "16px"
                    }}>Adicionar</Button>
                </Box>
            </Modal>
        </Box>
    );
}

export default NewMealModal;