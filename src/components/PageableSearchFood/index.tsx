import { Box, Button, Paper, Typography } from "@mui/material";
import { useState } from "react";
import IPageResponse from "../../interfaces/IPageResponse";
import PageableFoodList from "./PageableFoodList";
import SearchFoodForm from "./SearchFoodForm";
import PageableSummary from "./PageableSummary";
import IFoodItem from "../../interfaces/IFoodItem";
import FoodDetailsModal from "./FoodDetailsModal";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const PageableSearchFood = () => {
    const [clickedFood, setClickedFood] = useState<IFoodItem | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [foodName, setFoodName] = useState<string>('');
    const [pageableFoods, setPageableFoods] = useState<IPageResponse | null>(null);
    const navigate = useNavigate();

    return (
        <Box display={"flex"} gap={2} flexDirection={"column"}>
            <SearchFoodForm foodName={foodName} setFoodName={setFoodName} setPageableFoods={setPageableFoods} />
            <Box>
                <PageableSummary pageableFoods={pageableFoods} />
                <PageableFoodList foodName={foodName} pageableFoods={pageableFoods} setPageableFoods={setPageableFoods} setClickedFood={setClickedFood} setOpen={setOpen} />
            </Box>
            <Paper sx={{ p: 4, marginTop: 2 }}>
                <Box>
                    <Typography textAlign="center" variant="h6" fontWeight={700} color="var(--dark-orange)">Não encontrou o que procurava ?</Typography>
                    <Button
                        fullWidth
                        startIcon={<Add />}
                        variant="contained"
                        sx={{
                            bgcolor: "var(--lightgreen)",
                            ":hover": { bgcolor: "var(--green)" }
                        }}
                        onClick={() => navigate("create")}
                    >
                        novo alimento
                    </Button>
                </Box>
            </Paper>
            <FoodDetailsModal food={clickedFood} open={open} setOpen={setOpen} />
        </Box>
    )
}

export default PageableSearchFood;