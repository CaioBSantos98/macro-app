import { Avatar, Box, IconButton } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { authState } from '../../../state/atom';
import { logout } from '../../../utils/login';

const ProfileMenu = () => {
    const authValue = useRecoilValue(authState);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const resetAuthState = useResetRecoilState(authState);
    const navigate = useNavigate();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logoutHandler = async () => {
        handleClose();
        const confirmed = confirm("Tem certeza que deseja sair?");
        if (confirmed) {
            const response = await logout();
            if(response) {
                resetAuthState();
                navigate('');
            }
        }
    }

    return (
        <Box>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <Avatar sx={{ bgcolor: "var(--brown)" }}>{authValue.name[0]}</Avatar>
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => {navigate('/profile'); handleClose()}}>Perfil</MenuItem>
                <MenuItem onClick={() => {navigate('/meals'); handleClose()}}>Minhas refeições</MenuItem>
                <MenuItem onClick={logoutHandler}>Sair</MenuItem>
            </Menu>
        </Box>
    );
}

export default ProfileMenu;