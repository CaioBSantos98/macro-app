import { Box, Typography } from "@mui/material"
import { useRecoilValue } from "recoil";
import { authState } from "../../state/atom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Profile = () => {
    const authStateValue = useRecoilValue(authState);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authStateValue.isAuthenticated) {
            navigate("/login");
        }
    }, [])

    return (
        <Box component="section" sx={{ p: 2, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h3" component="h2" sx={{marginTop: "40px"}}>Bem vindo {authStateValue.name}</Typography>
            <Box sx={{
                maxWidth: "450px",
                width: "100%",
                height: "100%",
                borderRadius: 4,
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                border: "2px solid grey",
                padding: "20px",
                marginTop: "50px"
            }}>
                <Typography variant="h4" component="h2" sx={{textAlign: "center"}}>Dados do usuário</Typography>
                <Typography variant="h6" component="h2">id: {authStateValue.id}</Typography>
                <Typography variant="h6" component="h2">email: {authStateValue.email}</Typography>
                <Typography variant="h6" component="h2">data de nascimento: {authStateValue.birthDate}</Typography>
            </Box>
        </Box>
    )
}

export default Profile;