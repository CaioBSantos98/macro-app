import { Box } from "@mui/material";
import PageableSearchFood from "../../components/PageableSearchFood";

const Foods = () => {

    return (
        <Box component="section" display="flex" flexDirection="column" alignItems="center" p={3}>
            <PageableSearchFood />
        </Box>
    )
}

export default Foods;