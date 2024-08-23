import { Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import LoginForm from "../../components/LoginForm";
import { authState } from "../../state/atom";

const Login = () => {
    const authStateValue = useRecoilValue(authState);
    const navigate = useNavigate();

    useEffect(() => {
        if (authStateValue.isAuthenticated) {
            navigate("/profile");
        }
    }, [authStateValue, navigate])

    return (
        <Box component="section" sx={{ p: 2, display: "flex", justifyContent: "center" }}>
            <LoginForm />
        </Box>
    )
}

export default Login;