import { ListItem, Pagination, Paper } from "@mui/material";
import IFoodItem from "../../../interfaces/IFoodItem";
import IPageResponse from "../../../interfaces/IPageResponse";
import { pageSearchFood } from "../../../utils/foods";
import FoodListItem from "./FoodListItem";

interface PageableFoodListProps {
    foodName: string
    pageableFoods: IPageResponse | null
    setPageableFoods: React.Dispatch<React.SetStateAction<IPageResponse | null>>
    setClickedFood: React.Dispatch<React.SetStateAction<IFoodItem | null>>
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const PageableFoodList = ({ foodName, pageableFoods, setPageableFoods, setClickedFood, setOpen }: PageableFoodListProps) => {

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        const search = async () => {
            const data = await pageSearchFood(foodName, (value - 1));
            setPageableFoods(data)
        }
        search();
    }

    return (
        <>
            {pageableFoods && pageableFoods.content.length > 0 &&
                <Paper component="ul"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        padding: "8px 0"
                    }}
                >

                    {pageableFoods.content.map(food =>
                        <ListItem key={food.id} sx={{ padding: "0 16px" }}>
                            <FoodListItem food={food} setClickedFood={setClickedFood} setOpen={setOpen} />
                        </ListItem>
                    )}
                    {pageableFoods.totalPages > 1 &&
                        <Pagination count={pageableFoods.totalPages} page={pageableFoods.pageable.pageNumber + 1} onChange={handleChange} />
                    }

                </Paper>
            }
        </>
    )
}

export default PageableFoodList;