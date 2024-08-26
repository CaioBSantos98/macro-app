import { Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from "../../utils/login";
import { useResetRecoilState } from "recoil";
import { authState } from "../../state/atom";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {

    const resetAuthState = useResetRecoilState(authState);
    const navigate = useNavigate();

    const style = {
        position: "fixed",
        right: 50,
        top: 15,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        cursor: "pointer",
        fontSize: "20px",
        fontWeight: "700",
        transition: "0.2s",
        ":hover": {
            color: "black"
        }
    }

    const logoutHandler = async () => {
        const confirmed = confirm("Tem certeza que deseja sair?");
        if (confirmed) {
            const response = await logout();
            if(response) {
                resetAuthState();
                navigate("/login");
            }
        }
    }

    return (
        <Typography sx={style} onClick={logoutHandler}>
            <LogoutIcon fontSize={"large"} />
            Sair
        </Typography>
    )
}

export default LogoutBtn;