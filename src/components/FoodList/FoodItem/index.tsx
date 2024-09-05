import { Box, Checkbox, FormControl, FormHelperText, Input, Typography } from "@mui/joy";
import { ListItem, ListItemButton } from "@mui/material";
import { useEffect, useState } from "react";
import IFoodItem from "../../../interfaces/IFoodItem";
import IFoodQuantity from "../../../interfaces/IFoodQuantity";


interface FoodItemProps {
    food: IFoodItem;
    selectedFoods: IFoodQuantity[];
    setSelectedFoods: React.Dispatch<React.SetStateAction<IFoodQuantity[]>>;
}

const FoodItem = ({ food, selectedFoods, setSelectedFoods }: FoodItemProps) => {

    const [quantity, setQuantity] = useState<number>(() => {
        let quantityToReturn = 1;
        selectedFoods.forEach(f => {
            if (f.id === food.id) quantityToReturn = f.quantity;
        })
        return quantityToReturn;
    });
    const [isChecked, setIsChecked] = useState<boolean>(selectedFoods.some(f => f.id === food.id));
    const [foodQuantity, setFoodQuantity] = useState<IFoodQuantity>({ quantity, ...food });

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
        if (event.target.checked) {
            addFoodFromSelectedFoods();
        } else {
            removeFoodFromSelectedFoods();
        }
    };

    const addFoodFromSelectedFoods = () => {
        setSelectedFoods(prevSelectedFoods => {
            return [...prevSelectedFoods, foodQuantity];
        })
    }

    const removeFoodFromSelectedFoods = () => {
        setSelectedFoods(prevSelectedFoods => {
            return prevSelectedFoods.filter(f => f.id !== food.id);
        })
    }

    useEffect(() => {
        setFoodQuantity({ quantity, ...food });
    }, [quantity, food])

    useEffect(() => {
        setSelectedFoods(prevSelectedFoods => prevSelectedFoods.map(f => {
            if (f.id === foodQuantity.id) {
                return {
                    ...f,
                    quantity: foodQuantity.quantity
                }
            }
            return f;
        }))
    }, [foodQuantity, setSelectedFoods])

    return (
        <ListItem sx={{ p: 0 }}>
            <ListItemButton sx={{ display: "block" }} >
                <FormControl sx={{ width: "100%" }}>
                    <Checkbox overlay label={food.name} checked={isChecked} onChange={handleCheckboxChange} />
                    <FormHelperText>
                        <Box display="flex" gap={2}>
                            <Typography>Porção: {(food.serving * quantity).toFixed(0)}g</Typography>
                            <Typography>Calorias: {(food.calories * quantity).toFixed(2)} kcal</Typography>
                            <Typography>C: {(food.carbohydrate * quantity).toFixed(0)}g</Typography>
                            <Typography>P: {(food.protein * quantity).toFixed(0)}g</Typography>
                            <Typography>G: {(food.fat * quantity).toFixed(0)}g</Typography>
                        </Box>
                    </FormHelperText>
                </FormControl>
                {isChecked &&
                    <Input type="number" value={quantity} onChange={event => setQuantity(Number(event.target.value))} sx={{ width: 80, zIndex: 1, marginLeft: 3.5 }} />
                }
            </ListItemButton>
        </ListItem>
    )
}

export default FoodItem;