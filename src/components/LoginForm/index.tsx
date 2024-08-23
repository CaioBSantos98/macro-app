import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authState } from "../../state/atom";
import { login } from "../../utils/login";
import NewUserModal from "../NewUserModal";

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
        <Box component="form" sx={{
            maxWidth: "350px",
            width: "100%",
            height: "100%",
            borderRadius: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            border: "2px solid grey",
            padding: "20px",
            marginTop: "50px"
        }}
            onSubmit={(event) => submitHandler(event)}>
            <Typography variant="h4" component="h2">Faça seu login</Typography>
            <TextField
                required
                autoComplete="username"
                label="Email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                sx={{ width: "100%" }}
            />
            <TextField
                required
                autoComplete="current-password"
                label="Senha"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                sx={{ width: "100%" }}
            />
            <Button variant="contained" type="submit" sx={{
                width: "100%",
                height: "56px",
                fontSize: "16px"
            }}>Entrar</Button>
            <Typography variant="overline" sx={{ display: "flex", gap: "5px" }}>
                Não possui conta?
                <NewUserModal />
            </Typography>
        </Box>
    )
}

export default LoginForm;