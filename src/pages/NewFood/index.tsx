import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import NewFoodForm from "../../components/NewFoodForm";
import CreatedFoodModal from "../../components/CreatedFoodModal";
import { useState } from "react";
import IFoodItem from "../../interfaces/IFoodItem";

const NewFood = () => {

    const location = useLocation();
    const { state } = location;
    const [successCreated, setSucessCreated] = useState(false);
    const [createdFood, setCreatedFood] = useState<IFoodItem | null>(null);

    return (
        <Box component="section" display="flex" flexDirection="column" alignItems="center" paddingTop={5}>
            <NewFoodForm state={state} setSucess={setSucessCreated} setFood={setCreatedFood} />
            <CreatedFoodModal success={successCreated} food={createdFood} setSucess={setSucessCreated} setFood={setCreatedFood} />
        </Box>
    )
}

export default NewFood;