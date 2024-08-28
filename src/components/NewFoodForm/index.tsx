import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { registerFood } from "../../utils/foods";
import IFoodItem from "../../interfaces/IFoodItem";

interface NewFoodFormProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    state: any
    setSucess: React.Dispatch<React.SetStateAction<boolean>>
    setFood: React.Dispatch<React.SetStateAction<IFoodItem | null>>
}

const NewFoodForm = ({ state, setSucess, setFood }: NewFoodFormProps) => {

    let initialValue: string;
    if (state != null) {
        initialValue = state.foodName;
    } else {
        initialValue = '';
    }
    const [foodName, setFoodName] = useState(initialValue);
    const [brand, setBrand] = useState('');
    const [serving, setServing] = useState<number>(100);
    const [carbohydrate, setCarbohydrate] = useState<number>(0);
    const [protein, setProtein] = useState<number>(0);
    const [fat, setFat] = useState<number>(0);

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const register = async () => {
            try {
                const createdFood = await registerFood(foodName, brand, serving, carbohydrate, protein, fat);
                setFood(createdFood);
                setSucess(true);
            } catch (error) {
                console.error('Erro:', error)
                setFood(null);
                setSucess(false);
            }
        }
        register();
    }

    return (
        <Box
            onSubmit={event => submitHandler(event)}
            component="form"
            display="flex"
            flexDirection="column"
            maxWidth="345px"
            gap={1}
            autoComplete="off"
            sx={{
                boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                padding: 3
            }}
        >
            <Typography textAlign="center" component="h2" variant="h5">Cadastre um novo alimento</Typography>
            <TextField
                size="small"
                required
                label="Nome do alimento"
                value={foodName}
                onChange={event => setFoodName(event.target.value)}
            />
            <TextField
                size="small"
                label="Marca (opcional)"
                value={brand}
                onChange={event => setBrand(event.target.value)}
            />
            <TextField
                size="small"
                required
                label="Porção (g)"
                type="number"
                value={serving}
                onChange={event => setServing(Number(event.target.value))}
            />
            <TextField
                size="small"
                required
                label="Carboidrato (g)"
                type="number"
                value={carbohydrate}
                onChange={event => setCarbohydrate(Number(event.target.value))}
            />
            <TextField
                size="small"
                required
                label="Proteina (g)"
                type="number"
                value={protein}
                onChange={event => setProtein(Number(event.target.value))}
            />
            <TextField
                size="small"
                required
                label="Gordura (g)"
                type="number"
                value={fat}
                onChange={event => setFat(Number(event.target.value))}
            />
            <Typography sx={{ opacity: 0.5 }}>Campos com * são obrigatórios</Typography>
            <Button variant="contained" type="submit">Cadastrar</Button>
        </Box>
    )
}

export default NewFoodForm;