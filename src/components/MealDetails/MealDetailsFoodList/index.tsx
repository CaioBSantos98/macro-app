import { Box, List, ListItem, Typography } from "@mui/material";
import IFoodResponseDto from "../../../interfaces/IFoodResponseDto";

interface MealDetailsFoodListProps {
    foodList: IFoodResponseDto[];
}

const MealDetailsFoodList = ({ foodList }: MealDetailsFoodListProps) => {
    return (
        <List component="ul">
            {foodList.map(f =>
                <ListItem key={f.foodDetails.id} sx={{display: "block"}}>
                    <Typography>
                        {f.foodDetails.name} ({(f.foodDetails.serving * f.quantity).toFixed(0)}g)
                    </Typography>
                    <Box sx={{
                        display: "flex",
                        gap: "20px"
                    }}>
                        <Typography>Calorias: {(f.quantity * f.foodDetails.calories).toFixed(2)}kcal </Typography>
                        <Typography>Carb: {(f.quantity * f.foodDetails.carbohydrate).toFixed(0)}g </Typography>
                        <Typography>Prot: {(f.quantity * f.foodDetails.protein).toFixed(0)}g </Typography>
                        <Typography>Gord: {(f.quantity * f.foodDetails.fat).toFixed(0)}g </Typography>
                    </Box>
                </ListItem>
            )}
        </List>
    )
}

export default MealDetailsFoodList;