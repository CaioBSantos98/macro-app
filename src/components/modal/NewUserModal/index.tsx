import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import NewUserForm from '../../NewUserForm';

const NewUserModal = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box>
            <Button
                variant="contained"
                onClick={handleOpen}
                sx={{
                    color: "white",
                    bgcolor: "var(--lightgreen)",
                    fontWeight: 700,
                    padding: "10px 30px",
                    transition: 1,
                    "&:hover": {
                        bgcolor: "var(--green)"
                    }
                }}>
                Cadastre-se aqui
            </Button>
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