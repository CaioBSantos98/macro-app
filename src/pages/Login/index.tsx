import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { authState } from "../../state/atom";
import { login } from "../../utils/login";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const setAuthState = useSetRecoilState(authState);
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
        <Box component="section" sx={{ p: 2, display: "flex", justifyContent: "center" }}>
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
                    id="outlined-required"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    sx={{width: "100%"}}
                />
                <TextField
                    required
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    sx={{width: "100%"}}
                />
                <Button variant="contained" type="submit" sx={{
                    width: "100%",
                    height: "56px",
                    fontSize: "16px"
                }}>Entrar</Button>
            </Box>
        </Box>
    )
}

export default Login;