import DeleteIcon from '@mui/icons-material/Delete';
import { List, ListItem } from "@mui/joy";
import { Box, IconButton, Typography } from "@mui/material";
import IFoodQuantity from "../../interfaces/IFoodQuantity";

interface SelectedFoodsListProps {
    selectedFoods: IFoodQuantity[];
    setSelectedFoods: React.Dispatch<React.SetStateAction<IFoodQuantity[]>>
}

const SelectedFoodsList = ({ selectedFoods, setSelectedFoods }: SelectedFoodsListProps) => {

    const removeFromSelectedFoods = (food: IFoodQuantity) => {
        setSelectedFoods(prevFoods => prevFoods.filter(prevFood => prevFood.id !== food.id ));
    }

    return (
        <Box width="90%" bgcolor="var(--beige)">
            <Typography m={1} variant="h5" textAlign="center" width="100%" color="var(--dark-brown)">Selecionados:</Typography>
            <List
                component="ul"
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    minHeight: 40,
                    p: 0,
                    gap: 1
                }}
            >
                {selectedFoods.map(food => {
                    return <ListItem
                        key={food.id}
                        sx={{
                            p: 0
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                border: "1px solid var(--dark-brown)"
                            }}
                        >
                            <Typography paddingLeft={1} variant='button' color="var(--dark-brown)">
                                {food.name} ({food.serving * food.quantity}g)
                            </Typography>
                            <IconButton color='primary' onClick={() => removeFromSelectedFoods(food)}>
                                <DeleteIcon sx={{color: "var(--brown)"}}/>
                            </IconButton>
                        </Box>
                    </ListItem>
                })}
            </List>
        </Box>
    )
}

export default SelectedFoodsList;