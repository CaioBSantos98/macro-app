import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import IFoodItem from '../../interfaces/IFoodItem';
import { Typography } from '@mui/material';

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

const CreatedFoodModal = ({ success, food, setSucess, setFood }: CreatedFoodModal) => {
    const [open, setOpen] = useState(success);
    const handleClose = () => {setSucess(false); setFood(null)};

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
                    <>
                        <Typography>{food.id}</Typography>
                        <Typography>{food.name}</Typography>
                        <Typography>{food.brand}</Typography>
                        <Typography>{food.serving}</Typography>
                        <Typography>{food.calories}</Typography>
                        <Typography>{food.carbohydrate}</Typography>
                        <Typography>{food.protein}</Typography>
                        <Typography>{food.fat}</Typography>
                    </>
                }
            </Box>
        </Modal>
    );
}

export default CreatedFoodModal;