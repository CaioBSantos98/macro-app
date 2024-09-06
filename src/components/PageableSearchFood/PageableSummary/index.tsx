import { Box, Typography } from "@mui/material";
import IPageResponse from "../../../interfaces/IPageResponse";

interface PageableSummaryProps {
    pageableFoods: IPageResponse | null
}

const PageableSummary = ({ pageableFoods }: PageableSummaryProps) => {
    return (
        <>
            {pageableFoods && pageableFoods.totalElements > 10 &&
                <Box>
                    <Typography textAlign="end">
                        {pageableFoods.number * 10 + 1} a {pageableFoods.last ? pageableFoods.totalElements : (pageableFoods.number + 1) * 10} de {pageableFoods.totalElements}
                    </Typography>
                </Box>
            }
        </>
    )
}

export default PageableSummary;