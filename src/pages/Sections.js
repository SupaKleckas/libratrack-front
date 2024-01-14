import { useEffect, useState } from 'react';
import { Container, Grid, Typography, Paper } from "@mui/material"
import { experimentalStyled as styled } from '@mui/material/styles';
import URL from "../utils/Url.js"
import '../index.css'
import { getJwtToken, getRole, tokenValid } from '../utils/Auth';
import { useLocation, useNavigate } from "react-router-dom";
import CreateSection from '../components/CreateSection.js';
import GetBooks from '../components/GetBooks.js'

import AssignLibrary from '../components/AssignLibrary.js'

export default function Section() {
    const [sections, setSections] = useState([])
    const [selected, setSelected] = useState(null)
    const [needCount, setNeedCount] = useState(false)

    const { state } = useLocation()
    const navigate = useNavigate()

    if (tokenValid()) {
        var role = getRole()
        var token = getJwtToken()
    }

    const updateSectionsCreated = (val) => {
        setSections((sections) => [...sections, val]);
    };

    const updateSectionsDeleted = (val) => {
        setSections((sections) => sections.filter(section => section.id !== val.id));
    };

    const updateSectionsEdited = (val) => {
        setSections((sections) => sections.map(section => section.id === val.id ? val : section));
    };

    const url = URL + "/libraries/" + state.id + "/sections"

    const fetchData = async () => {
        console.log("Called fetch (sections)")
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setSections(data);
            } else {
                console.log('Error fetching data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {

        fetchData()

    }, []);

    useEffect(() => {

        fetchData()
        setNeedCount(false)

    }, [needCount]);

    const Item = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(2),
        textAlign: 'center',
        width: 400,
        height: 80,
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
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mb:4}}>
                <Typography variant='h2' sx={{ fontFamily: 'Open Sans, sans-serif', textAlign: 'center'}}> {state.name} </Typography>
                <Typography sx={{ fontFamily: 'Open Sans, sans-serif', textAlign: 'center', fontSize: 18 }}> {state.address} </Typography>
            </Container>

            {!selected && sections &&
                <div>
                    <Container>
                        {role === "Admin" && 
                        <div>
                            <CreateSection onUpdate={updateSectionsCreated} libraryid={state.id} />
                            <AssignLibrary libraryid={state.id} />
                        </div>
                        }
                    </Container>

                    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 4 }}>
                        <Grid container spacing={{ xs: 1, sm: 2 }} columns={{ xs: 1, sm: 2 }} alignItems="center" justifyContent="space-evenly" >
                            {sections.map((section) => (
                                <Grid key={section["id"]}>
                                    <Item sx={{ mb: 2 }} onClick={() => setSelected(section)}>
                                        <Typography sx={{ wordBreak: "break-word", fontFamily: 'Open Sans, sans-serif', textAlign: 'center' }}> <b>{section["title"]}, {section["bookCount"]}</b>  </Typography>
                                    </Item>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </div>
            }

            {selected && <GetBooks setNeedCount={setNeedCount} libraryid={state.id} section={selected} setSelected={setSelected} updateSectionsCreated={updateSectionsCreated} updateSectionsEdited={updateSectionsEdited} updateSectionsDeleted={updateSectionsDeleted} />}
        </div>
    )
}
