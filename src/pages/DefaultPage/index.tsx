import { AppBar, Container, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar";

const DefaultPage = () => {
    return (
        <>
            <AppBar position="static">
                <Container maxWidth='xl'>
                    <Toolbar disableGutters sx={{display: "flex", justifyContent: "center"}}>
                        <NavBar />
                    </Toolbar>
                </Container>
            </AppBar>
            <Outlet />
        </>
    )
}

export default DefaultPage;