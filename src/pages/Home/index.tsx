import { Box, Link, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import LoginForm from "../../components/LoginForm";
import { authState } from "../../state/atom";

const Home = () => {
    const authStateValue = useRecoilValue(authState);
    const navigate = useNavigate();

    useEffect(() => {
        if (authStateValue.isAuthenticated) {
            navigate("/profile");
        }
    }, [authStateValue, navigate])

    return (
        <Box component="main" sx={{
            p: 2,
            display: "flex",
            flexDirection: {
                xs: 'column',
                sm: 'column',
                md: 'row'
            },
            gap: 5,
            justifyContent: "space-around",
            alignItems: "center",
            minHeight: "100vh"
        }}>
            <Box maxWidth={450}>
                <Typography component="h1" variant="h3" fontWeight={700} color="var(--orange)">Macro</Typography>
                <Typography component="h2" variant="h6">
                    Seu companheiro diário para uma alimentação equilibrada. Acompanhe facilmente suas calorias e macronutrientes, otimizado para ajudar você a alcançar suas metas de saúde e bem-estar.
                </Typography>
                <Typography marginTop={2} sx={{
                    display: {
                        xs: 'none',
                        sm: 'none',
                        md: 'block'
                    }
                }}>
                    Desenvolvido por <Link sx={{color: "var(--orange)", fontWeight: 700}} target="_blank" rel="noopener noreferrer" underline="hover" href="https://github.com/CaioBSantos98">Caio Belchior</Link>
                </Typography>
            </Box>
            <LoginForm />
            <Typography marginTop={2} sx={{
                display: {
                    md: 'none'
                }
            }}>
                Desenvolvido por <Link sx={{color: "var(--orange)", fontWeight: 700}} target="_blank" rel="noopener noreferrer" underline="hover" href="https://github.com/CaioBSantos98">Caio Belchior</Link>
            </Typography>
        </Box>
    )
}

export default Home;