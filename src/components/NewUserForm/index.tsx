import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from "dayjs";
import { useState } from "react";
import INewUser from "../../interfaces/INewUser";
import { createNewUser } from "../../utils/newUser";
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    maxWidth: 400,
    width: "100%",
    borderRadius: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px"
};

interface NewUserFormProps {
    handleClose: () => void
}

const NewUserForm = ({ handleClose }: NewUserFormProps) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthDate, setBirthDate] = useState<Dayjs | null>(null);

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (birthDate == null || birthDate.format('YYYY-MM-DD') == 'Invalid Date') {
            alert("Data de nascimento é obrigatório");
            return;
        }

        const user: INewUser = {
            name: name,
            email: email,
            password: password,
            birthDate: birthDate.format('YYYY-MM-DD')
        }

        const retorno = await createNewUser(user)
        if (retorno == true) {
            alert('Usuário cadastrado com sucesso!');
            handleClose();
            clearForm();
        } else {
            alert('Usuario não cadastrado');
        }
    }

    const clearForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setBirthDate(null);
    }

    return (
        <Box component="form" sx={style}
            onSubmit={(event) => submitHandler(event)}>
            <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 20, top: 27 }}>
                <CloseIcon fontSize="large" />
            </IconButton>
            <Typography variant="h4" component="h2" textAlign="initial" width="100%" paddingBottom={1} borderBottom={1} >Cadastre-se</Typography>
            <TextField
                required
                label="Nome completo"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                sx={{ width: "100%", bgcolor: "var(--beige)" }}
            />
            <TextField
                required
                label="Email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                sx={{ width: "100%", bgcolor: "var(--beige)" }}
            />
            <TextField
                required
                label="Senha"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                sx={{ width: "100%", bgcolor: "var(--beige)" }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Data de nascimento * "
                    format="DD/MM/YYYY"
                    value={birthDate}
                    onChange={newValue => setBirthDate(newValue)}
                    sx={{ width: "100%", bgcolor: "var(--beige)" }}
                />
            </LocalizationProvider>
            <Button variant="contained" type="submit" sx={{
                width: "100%",
                height: "56px",
                fontSize: "16px",
                color: "white",
                bgcolor: "var(--lightgreen)",
                fontWeight: 700,
                padding: "10px 30px",
                transition: 1,
                "&:hover": {
                    bgcolor: "var(--green)"
                }
            }}>Cadastrar</Button >
        </Box >
    )
}

export default NewUserForm;