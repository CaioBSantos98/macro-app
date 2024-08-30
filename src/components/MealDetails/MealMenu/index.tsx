import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, IconButton } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import IMealDetails from '../../../interfaces/IMealDetails';
import IMealSummary from '../../../interfaces/IMealSummary';
import { deleteMeal, getSummaryMeal, removeAllFoodsOnMeal } from '../../../utils/meals';

interface MealMenuProps {
    meal: IMealSummary;
    setMeals: React.Dispatch<React.SetStateAction<IMealSummary[]>>
    setMealDetails: React.Dispatch<React.SetStateAction<IMealDetails | null>>
}

const MealMenu = ({ meal, setMeals, setMealDetails }: MealMenuProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        event.stopPropagation();
        setAnchorEl(null);
    };
    const clear = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const remove = async () => {
            try {
                const mealDetails = await removeAllFoodsOnMeal(meal.id);
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
        handleClose(event);
        if (meal.totalCalories > 0) {
            const confirmed = confirm(`Tem certeza que deseja remover todos os alimentos do ${meal.name} ?`);
            if (confirmed) remove();
        }
    };
    const deleteMealFunc = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const deleteMealAsyncFunc = async () => {
            try {
                const statusCode = await deleteMeal(meal.id);
                if (statusCode === 204) {
                    setMealDetails(null);
                    setMeals(prevMeals => prevMeals.filter(interableMeal =>
                        interableMeal.id !== meal.id
                    ))
                }
            } catch (error) {
                console.error(error)
            }
        }
        handleClose(event);
        const confirmed = confirm(`Tem certeza que deseja deletar o ${meal.name}?`);
        if (confirmed) deleteMealAsyncFunc();
    };


    return (
        <Box>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                size='large'
            >
                <MoreVertIcon color='primary' />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={(event) => clear(event)}>Limpar refeição</MenuItem>
                <MenuItem onClick={(event) => deleteMealFunc(event)}>Deletar refeição</MenuItem>
            </Menu>
        </Box>
    );
}

export default MealMenu;