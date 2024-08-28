import { CheckCircleOutline } from '@mui/icons-material';
import { Alert, Button, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import IFoodItem from '../../interfaces/IFoodItem';

interface CreatedFoodModal {
    success: boolean;
    food: IFoodItem | null;
    setSucess: React.Dispatch<React.SetStateAction<boolean>>
    setFood: React.Dispatch<React.SetStateAction<IFoodItem | null>>
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
};

const CreatedFoodModal = ({ success, food, setSucess, setFood }: CreatedFoodModal) => {
    const [open, setOpen] = useState(success);
    const handleClose = () => { setSucess(false); setFood(null) };

    useEffect(() => {
        setOpen(success)
    }, [success])

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {food &&
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardContent>
                                <Alert icon={<CheckCircleOutline />} severity="success">
                                    Alimento cadastrado com sucesso!
                                </Alert>
                                <Typography gutterBottom variant="h5" component="h4">
                                    {food.name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    ID: {food.id}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Marca: {food.brand === null ? 'null' : food.brand}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Porção: {food.serving}g
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Calorias: {food.calories.toFixed(2)} kcal
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Carboidratos: {food.carbohydrate.toFixed(2)}g
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Proteína: {food.protein.toFixed(2)}g
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Gordura: {food.fat.toFixed(2)}g
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <Button fullWidth size='large' variant='text' onClick={handleClose}>
                            Fechar
                        </Button>
                    </Card>
                }
            </Box>
        </Modal>
    );
}

export default CreatedFoodModal;