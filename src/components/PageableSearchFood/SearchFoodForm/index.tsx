import SearchIcon from '@mui/icons-material/Search';
import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import { searchFood } from '../../../utils/foods';
import IPageResponse from '../../../interfaces/IPageResponse';
import LunchDiningIcon from '@mui/icons-material/LunchDining';

interface SearchFoodFormProps {
    foodName: string
    setFoodName: React.Dispatch<React.SetStateAction<string>>
    setPageableFoods: React.Dispatch<React.SetStateAction<IPageResponse | null>>
}

const SearchFoodForm = ({ foodName, setFoodName, setPageableFoods }: SearchFoodFormProps) => {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const search = async () => {
            const data = await searchFood(foodName);
            setPageableFoods(data)
        }
        search();
    }

    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            onSubmit={event => handleSubmit(event)}
        >
            <LunchDiningIcon fontSize="large" sx={{ color: "var(--dark-brown)", marginLeft: 1, marginRight: 0.5 }} />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <InputBase
                required
                sx={{ ml: 1, flex: 1, fontSize: 20 }}
                placeholder="Busca de alimentos"
                inputProps={{ 'aria-label': 'busca de alimentos' }}
                value={foodName}
                onChange={event => setFoodName(event.target.value)}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon fontSize="large" sx={{ color: "var(--orange)" }} />
            </IconButton>
        </Paper>
    )
}

export default SearchFoodForm;