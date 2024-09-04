import { Box, Button, Checkbox, FormControl, FormHelperText, Input, Typography } from "@mui/joy";
import { ListItem, ListItemButton } from "@mui/material";
import { useEffect, useState } from "react";
import IFoodItem from "../../../interfaces/IFoodItem";
import IFoodQuantity from "../../../interfaces/IFoodQuantity";

interface FoodItemProps {
    food: IFoodItem;
    setSelectedFoods: React.Dispatch<React.SetStateAction<IFoodQuantity[]>>;
}

const FoodItem = ({ food, setSelectedFoods }: FoodItemProps) => {

    const [quantity, setQuantity] = useState<number>(1);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [foodQuantity, setFoodQuantity] = useState<IFoodQuantity>({ quantity, ...food });

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };

    const addFood = () => {
        setSelectedFoods(prevSelectedFoods => {
            const itemIndex = prevSelectedFoods.findIndex(f => f.id === foodQuantity.id);

            if (itemIndex != -1) {
                return prevSelectedFoods.map((f, index) =>
                    index === itemIndex
                        ? { ...f, quantity: f.quantity + foodQuantity.quantity }
                        : f
                );
            }

            return [...prevSelectedFoods, foodQuantity];
        })
    }

    useEffect(() => {
        setFoodQuantity({ quantity, ...food });
    }, [quantity, food])

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
                    <Box display="flex" justifyContent="space-between">
                        <Input type="number" value={quantity} onChange={event => setQuantity(Number(event.target.value))} sx={{ width: 80, zIndex: 1, marginLeft: 3.5 }} />
                        <Button onClick={addFood} sx={{ zIndex: 1 }}>Adicionar alimento</Button>
                    </Box>
                }
            </ListItemButton>
        </ListItem>
    )
}

export default FoodItem;