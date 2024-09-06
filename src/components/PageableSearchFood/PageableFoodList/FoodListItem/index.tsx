import { Box, Divider, Typography } from "@mui/material";
import IFoodItem from "../../../../interfaces/IFoodItem";

interface FoodListItemProps {
    food: IFoodItem
    setClickedFood: React.Dispatch<React.SetStateAction<IFoodItem | null>>
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const FoodListItem = ({ food, setClickedFood, setOpen }: FoodListItemProps) => {

    const showDetails = () => {
        setClickedFood(food);
        setOpen(true)
    }

    return (
        <Box
            width="100%"
            sx={{
                cursor: "pointer",
                transition: "0.3s",
                ":hover": {
                    bgcolor: "var(--beige)"
                }
            }}
            onClick={showDetails}
        >
            <Box
                display="flex"
                gap={1}
                alignItems="center"
                color="var(--dark-orange)"
                sx={{
                    cursor: "pointer",
                    ":hover": {
                        textDecoration: "underline"
                    }
                }}
            >
                <Typography variant="h6" fontWeight={700}>{food.name}</Typography>
                {food.brand && <Typography variant="h6">({food.brand})</Typography>}
            </Box>
            <Box display="flex" gap={1} alignItems="center">
                <Typography>por {food.serving}g -</Typography>
                <Typography
                    color="var(--brown)"
                    fontWeight={700}
                    sx={{
                        cursor: "pointer",
                        ":hover": {
                            color: "var(--dark-brown)",
                            textDecoration: "underline"
                        }
                    }}
                >
                    detalhar
                </Typography>
            </Box>
            <Divider sx={{ marginTop: 0.5 }} />
        </Box>
    )

}

export default FoodListItem;