import { Button, Pagination, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IFoodQuantity from '../../../interfaces/IFoodQuantity';
import IPageResponse from '../../../interfaces/IPageResponse';
import { pageSearchFood, searchFood } from '../../../utils/foods';
import FoodList from '../../FoodList';

interface SearchFoodModalProps {
    selectedFoods: IFoodQuantity[]
    setSelectedFoods: React.Dispatch<React.SetStateAction<IFoodQuantity[]>>
}

const SearchFoodModal = ({ selectedFoods, setSelectedFoods }: SearchFoodModalProps) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        p: 2,
        maxWidth: "600px",
        width: "100%",
        height: 500,
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(false); setPageResponse(null); setFoodName(''); setPage(1) };
    const [foodName, setFoodName] = useState('');
    const [page, setPage] = useState(1);
    const [pageResponse, setPageResponse] = useState<IPageResponse | null>(null);
    const [foodFound, setFoodFound] = useState(true);
    const navigate = useNavigate();

    const search = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        const data = await searchFood(foodName);
        setPageResponse(data);
        if (data.content.length > 0) {
            setFoodFound(true);
        } else {
            setFoodFound(false);
        }
    }

    const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
        const pageSearch = async () => {
            const response = await pageSearchFood(foodName, value - 1);
            setPageResponse(response);
        }
        pageSearch();
        setPage(value);
    };

    return (
        <Box width="90%">
            <Button fullWidth variant='contained' onClick={handleOpen} sx={{ bgcolor: "var(--brown)", ":hover": { bgcolor: "var(--dark-brown)" } }}>
                Selecionar alimentos
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ m: 2 }}
            >
                <Box sx={style}>
                    <Typography
                        variant='h5'
                    >
                        Selecionados: {selectedFoods.length}
                    </Typography>
                    <Box component="form" onSubmit={(event) => search(event)} width="100%">
                        <TextField
                            required
                            placeholder="Nome do alimento"
                            label="Pesquise um alimento"
                            type="text"
                            value={foodName}
                            onChange={(event) => setFoodName(event.target.value)}
                            onFocus={() => setFoodFound(true)}
                            sx={{ width: "100%", bgcolor: "white" }}
                        />
                        <Box display="flex" width="100%" gap={1} marginTop={1}>
                            <Button
                                fullWidth
                                variant="contained"
                                type="submit"
                                sx={{ bgcolor: "var(--brown)", ":hover": { bgcolor: "var(--dark-brown)" } }}
                            >
                                Pesquisar
                            </Button>
                            <Button
                                onClick={handleClose}
                                fullWidth
                                variant="contained"
                                sx={{ bgcolor: "var(--lightgreen)", ":hover": { bgcolor: "var(--green)" } }}
                            >
                                Concluir
                            </Button>
                        </Box>
                    </Box>
                    {pageResponse && pageResponse.content.length > 0 &&
                        <>
                            <FoodList selectedFoods={selectedFoods} setSelectedFoods={setSelectedFoods} foodList={pageResponse.content} />
                            <Pagination count={pageResponse?.totalPages} page={page} onChange={handlePaginationChange} />
                        </>
                    }
                    {!foodFound &&
                        <Box textAlign="center">
                            <Typography>Alimento "{foodName}" não encontrado.</Typography>
                            <Typography>Deseja cadastrar "{foodName}"?</Typography>
                            <Button
                                variant='contained'
                                sx={{ bgcolor: "var(--lightgreen)", ":hover": { bgcolor: "var(--green)" } }}
                                onClick={() => navigate("/foods/create", { state: { foodName: foodName } })}
                            >
                                Cadastrar
                            </Button>
                        </Box>
                    }
                </Box>
            </Modal>
        </Box>
    );
}

export default SearchFoodModal;