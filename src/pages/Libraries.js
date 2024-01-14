import { useEffect, useState } from 'react';
import { Container, Grid, Button, Typography, Paper } from "@mui/material"
import { experimentalStyled as styled } from '@mui/material/styles';
import URL from "../utils/Url.js"
import '../index.css'
import { getJwtToken, getRole, tokenValid } from '../utils/Auth';
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom'
import Alert from '@mui/material/Alert';
import CreateLibrary from '../components/CreateLibrary.js';
import DeleteLibrary from '../components/DeleteLibrary.js';
import EditLibrary from '../components/EditLibrary.js';

export default function Library() {
    const [libraries, setLibraries] = useState([])
    const [selected, setSelected] = useState(null)
    const navigate = useNavigate()

    if (tokenValid()) {
        var role = getRole()
        var token = getJwtToken()
        var assignedLibrary = localStorage.getItem("assignedLibrary")
    }

    const updateLibrariesCreated = (val) => {
        setLibraries((libraries) => [...libraries, val]);
    };

    const updateLibrariesDeleted = (val) => {
        setLibraries((libraries) => libraries.filter(library => library.id !== val.id));
    };

    const updateLibrariesEdited = (val) => {
        setLibraries((libraries) => libraries.map(library => library.id === val.id ? val : library));
    };

    const url = URL + "/libraries"

    const fetchData = async () => {
        try {
            const response = await fetch(url, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setLibraries(data);
            } else {
                console.log('Error fetching data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {

        fetchData();

    }, []);

    const Item = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(2),
        textAlign: 'center',
        width: 300,
        height: 150,
        color: theme.palette.text.primary,
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
            transform: 'scale(1.05)',
            cursor: 'pointer',
            boxShadow: `0px 0px 10px #52433d`,
        },
    }));

    return (
        <div>
            <Container sx={{mb:6}}>
                {role === "Admin" && <CreateLibrary onUpdate={updateLibrariesCreated} />}
            </Container>

            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                
                {role === "User" && assignedLibrary === 'null' && 
                <Alert variant="outlined" severity="warning" sx={{ 
                    fontFamily: 'Open Sans, sans-serif', 
                    mb: 6, 
                    width: 500, 
                    height: 50, 
                    alignItems: "center", 
                    justifyContent: "center", 
                    display: 'flex' }}>
                        Please contact the administrator to assign your working library.
                </Alert>}
                
                <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} columns={{ xs: 1, sm: 2, md: 4 }} alignItems="center" justifyContent="space-evenly" >
                    {libraries.map((library) => (
                        <Grid key={library["id"]}>
                            <Item sx={{ mb: 2 }} onClick={() => setSelected(library)}>
                                <Typography sx={{ wordBreak: "break-word", fontFamily: 'Open Sans, sans-serif', textAlign: 'center' }}> <b>{library["name"]}</b></Typography>
                                {selected && (role === "Admin" || (role === "User" && parseInt(assignedLibrary) === selected.id)) && selected.id === library.id && (
                                    <div>
                                        <Button component={RouterLink} to={"/sections"} state={selected} variant="contained" color="primary" sx={{ fontFamily: 'Open Sans, sans-serif', mt: 1, bgcolor: "#637e90", '&:hover': { bgcolor: "#4e697a" } }}> Enter database </Button>
                                    </div>
                                )}
                                {selected && role === "Admin" && selected.id === library.id && (
                                    <div>
                                        <EditLibrary onUpdate={updateLibrariesEdited} library={library} />
                                        <DeleteLibrary onUpdate={updateLibrariesDeleted} library={library} />
                                    </div>
                                )}
                            </Item>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>

    )
}

