import { Box, Button, TextField, Typography } from "@mui/material";

const Login = () => {
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
            }}>
                <Typography variant="h4" component="h2">Faça seu login</Typography>
                <TextField
                    required
                    id="outlined-required"
                    label="Email"
                    type="email"
                    defaultValue=""
                    sx={{width: "100%"}}
                />
                <TextField
                    required
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    sx={{width: "100%"}}
                />
                <Button variant="contained" sx={{
                    width: "100%",
                    height: "56px",
                    fontSize: "16px"
                }}>Entrar</Button>
            </Box>
        </Box>
    )
}

export default Login;