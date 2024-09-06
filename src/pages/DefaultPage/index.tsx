import { AppBar, Box, Container, Toolbar } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import NavBar from "../../components/NavBar";
import { authState } from "../../state/atom";
import { getUser } from "../../utils/login";

const DefaultPage = () => {

     
    const [auth, setAuthState] = useRecoilState(authState);
    const navigate = useNavigate();

    useEffect(() => {
        getUser((userDetails) => {
            setAuthState({
                isAuthenticated: true,
                ...userDetails
            })
        });
    }, [setAuthState])

    useEffect(() => {
        console.log("Executou")
        if (!auth.isAuthenticated) {
            alert("Área restrita à usuários autenticados. Faça login caso queira acessar essa página!")
            navigate("/")
        }
    }, [])

    return (
        <Box component="main" sx={{minHeight: "100vh", display: "flex", flexDirection: "column"}}>
            <AppBar position="static" sx={{bgcolor: "var(--orange)", color: "black"}}>
                <Container maxWidth='xl'>
                    <Toolbar disableGutters sx={{display: "flex", justifyContent: "center"}}>
                        <NavBar />
                    </Toolbar>
                </Container>
            </AppBar>
            <Outlet />
        </Box>
    )
}

export default DefaultPage;