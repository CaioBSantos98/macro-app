import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authState } from "../../state/atom";
import { login } from "../../utils/login";
import NewUserModal from "../modal/NewUserModal";

const LoginForm = () => {
    const setAuthState = useSetRecoilState(authState)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await login(email, password, (userDetails) => {
            setAuthState({
                isAuthenticated: true,
                ...userDetails
            })
        });
        setEmail('');
        setPassword('');
        navigate("/profile")
    }

    return (
        <Box
            sx={{
                maxWidth: "450px",
                width: "100%",
                height: "100%",
                padding: "75px 25px",
                borderRadius: 2,
                boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                bgcolor: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
            <Box component="form" onSubmit={(event) => submitHandler(event)} sx={{
                maxWidth: "350px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1.5,
                width: "100%"
            }}>
                <TextField
                    required
                    autoComplete="username"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    sx={{ width: "100%", bgcolor: "var(--background-color)" }}
                />
                <TextField
                    required
                    autoComplete="current-password"
                    label="Senha"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    sx={{ width: "100%", bgcolor: "var(--background-color)" }}
                />
                <Button variant="contained" type="submit" sx={{
                    width: "100%",
                    fontWeight: 700
                }}>Entrar</Button>
            </Box>
            <Typography variant="caption" fontSize={14} color="var(--primary-color)" sx={{
                display: "flex", gap: "5px", marginTop: 2, cursor: 'pointer', // Muda o cursor para indicar que o texto é clicável
                '&:hover': {
                    textDecoration: 'underline', // Adiciona sublinhado ao passar o mouse
                }
            }}>
                Esqueceu a senha?
            </Typography>
            <Typography variant="overline" sx={{ display: "flex", flexDirection:"column", gap: "5px", marginTop: 2, alignItems:"center", width:"85%" }}>
                <Box height={1} border="0.5px solid" width="100%" margin={3} sx={{opacity: 0.1}}></Box>
                Não possui conta?
                <NewUserModal />
            </Typography>
        </Box>
    )
}

export default LoginForm;