import { Box, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box component="footer" sx={{
            bgcolor: "black",
            color: "white",
            textAlign: "center",
            position: "fixed",
            bottom: 0,
            right: 0,
            left: 0
        }}>
            <Typography variant="h5" component="p">
                Desenvolvido por Caio Belchior
            </Typography>
        </Box>
    )
}

export default Footer;