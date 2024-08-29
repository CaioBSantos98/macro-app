import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import NewUserForm from '../../NewUserForm';

const NewUserModal = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box>
            <Typography
                variant="overline"
                onClick={handleOpen}
                sx={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    transition: "0.2s",
                    "&:hover": {
                        color: "blue"
                    }
                }}>
                Cadastre-se aqui
            </Typography>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    <NewUserForm handleClose={handleClose}/>
                </Box>
            </Modal>
        </Box>
    );
}

export default NewUserModal;