import { Avatar, Badge, Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../../state/atom";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const Profile = () => {
    const authStateValue = useRecoilValue(authState);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authStateValue.isAuthenticated) {
            navigate("/");
        }
    }, [authStateValue, navigate])

    return (
        <Box component="section" sx={{ p: 2, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "90vh" }}>
            <Card
                sx={{
                    minWidth: "75%",
                    display: "flex",
                    flexDirection: {
                        xs: "column",
                        sm: "column",
                        md: "row"
                    }
                }}>
                <Box sx={{
                    bgcolor: "var(--orange)",
                    p: 7,
                    textAlign: "center"
                }}>
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                            <IconButton>
                                <Avatar sx={{ width: 40, height: 40, bgcolor: "var(--primary-color)" }}>
                                    <AddAPhotoIcon />
                                </Avatar>
                            </IconButton>
                        }
                    >
                        <Avatar sx={{ width: 150, height: 150 }}></Avatar>
                    </Badge>
                    <Typography
                        component="h4"
                        variant="h3"
                        color="white"
                        marginTop={5}
                    >
                        {authStateValue.name.split(' ')[0]}
                    </Typography>
                </Box>
                <CardContent sx={{ width: "100%" }} >
                    <Box display="flex" flexDirection="column" gap={2} paddingTop={2} height="100%" justifyContent="space-around">
                        <Typography variant="h5" borderBottom={2} borderColor={"var(--beige)"}>
                            Informações
                        </Typography>
                        <Box>
                            <Typography variant="h6">ID do usuário</Typography>
                            <Typography variant="subtitle2">{authStateValue.id}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6">Nome completo</Typography>
                            <Typography variant="subtitle2">{authStateValue.name}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6">Email</Typography>
                            <Typography variant="subtitle2">{authStateValue.email}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6">Data de nascimento</Typography>
                            <Typography variant="subtitle2">{authStateValue.birthDate}</Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}

export default Profile;