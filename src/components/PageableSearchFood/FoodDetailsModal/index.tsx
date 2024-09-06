import { Button, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IFoodItem from '../../../interfaces/IFoodItem';

interface FoodDetailsModalProps {
    food: IFoodItem | null;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    width: "100%",
    maxWidth: {
        xs: 375,
        sm: 425,
    }
};

const FoodDetailsModal = ({ food, open, setOpen }: FoodDetailsModalProps) => {
    const handleClose = () => setOpen(false);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-details-food"
            aria-describedby="modal-details"
        >
            <Box sx={style}>
                {food &&
                    <Card>
                        <CardActionArea>
                            <CardContent>
                                <Typography variant="h4" component="h4" color="var(--dark-orange)">
                                    {food.name}
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                    ID: {food.id}
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                    Marca: {food.brand === null ? 'null' : food.brand}
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                    Porção: {food.serving}g
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                    Calorias: {food.calories.toFixed(2)} kcal
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                    Carboidratos: {food.carbohydrate.toFixed(2)}g
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                    Proteína: {food.protein.toFixed(2)}g
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                    Gordura: {food.fat.toFixed(2)}g
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <Button fullWidth size='large' variant='text' onClick={handleClose} sx={{ color: "var(--dark-brown)", fontWeight: 700 }}>
                            Fechar
                        </Button>
                    </Card>
                }
            </Box>
        </Modal>
    );
}

export default FoodDetailsModal;