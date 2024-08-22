import { AppBar, Box, Container, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

const DefaultPage = () => {
    return (
        <Box component="main" sx={{minHeight: "100vh", display: "flex", flexDirection: "column"}}>
            <AppBar position="static">
                <Container maxWidth='xl'>
                    <Toolbar disableGutters sx={{display: "flex", justifyContent: "center"}}>
                        <NavBar />
                    </Toolbar>
                </Container>
            </AppBar>
            <Outlet />
            <Footer />
        </Box>
    )
}

export default DefaultPage;