import { AppBar, Box, Container, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { useEffect } from "react";
import { getUser } from "../../utils/login";
import { useRecoilState } from "recoil";
import { authState } from "../../state/atom";

const DefaultPage = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [auth, setAuthState] = useRecoilState(authState);

    useEffect(() => {
        getUser((userDetails) => {
            setAuthState({
                isAuthenticated: true,
                ...userDetails
            })
        });
    }, [setAuthState])

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