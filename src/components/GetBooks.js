import { useEffect, useState } from 'react'
import { Container, Grid, Button, Typography, Paper } from "@mui/material"
import { experimentalStyled as styled } from '@mui/material/styles'
import URL from "../utils/Url.js"
import '../index.css'
import { getJwtToken, getRole, tokenValid } from '../utils/Auth'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import CreateBook from '../components/CreateBook.js'
import EditBook from '../components/EditBook.js'
import DeleteBook from '../components/DeleteBook.js'
import DeleteSection from '../components/DeleteSection.js'
import EditSection from '../components/EditSection.js'

export default function GetBooks({ libraryid, setNeedCount, section, setSelected, updateSectionsCreated, updateSectionsEdited, updateSectionsDeleted }) {
    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState(null)
    const[title, setTitle] = useState(section["title"])

    if (tokenValid()) {
        var token = getJwtToken()
        var role = getRole()
    }

    const updateBooksCreated = (val) => {
        setBooks((books) => [...books, val]);
        setNeedCount(true)
    };

    const updateBooksDeleted = (val) => {
        setBooks((books) => books.filter(book => book.id !== val.id));
        setNeedCount(true)
    };

    const updateBooksEdited = (val) => {
        setBooks((books) => books.map(book => book.id === val.id ? val : book));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const url = URL + "/libraries/" + libraryid + "/sections/" + section["id"] + "/books"

        console.log("fetch called (books)")

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
                setBooks(data);
            } else {
                console.log('Error fetching data (books)');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const Item = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(2),
        width: 300,
        height: 300,
        color: theme.palette.text.primary,
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
            transform: 'scale(1.05)',
            cursor: 'pointer',
            boxShadow: `0px 0px 10px #52433d`
        },
    }));

    return (
        <div>

            <Typography variant='h3' sx={{ fontFamily: 'Open Sans, sans-serif', textAlign: 'center' }}> {title} section</Typography>

            <Container sx={{ mb: 6, mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                <Button
                    onClick={() => setSelected(null)}
                    variant="contained"
                    sx={{ mr: 2, width: 200, height: 50, fontFamily: 'Open Sans, sans-serif', bgcolor: "#637e90", '&:hover': { bgcolor: "#4e697a" } }}
                >
                    <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
                    Back to sections
                </Button>
                
                {role === "Admin" &&               
                <div>
                    <EditSection onUpdate={updateSectionsEdited} setTitle={setTitle} libraryid={libraryid} section={section} />
                    <DeleteSection onUpdate={updateSectionsDeleted} closeSection={setSelected} libraryid={libraryid} section={section} />
                </div>
                }

            </Container>

            <Container sx={{ mb: 4, display: 'flex', justifyContent: 'flex-end' }}>
                <CreateBook onUpdate={updateBooksCreated} libraryid={libraryid} section={section} />
            </Container>

            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxWidth: "80%" }}>
                <Grid container columns={{ sm: 2 }} alignItems="center" justifyContent="space-evenly">
                    {books.map((book) => (
                        <Grid key={book["id"]}>
                            <Item sx={{ mb: 2 }} onClick={() => setSelectedBook(book)}>
                                <Typography sx={{ fontFamily: 'Open Sans, sans-serif' }}> {book["publishYear"]} </Typography>
                                <Typography variant="h5" component="div" sx={{ fontFamily: 'Open Sans, sans-serif' }}> {book["title"]} </Typography>
                                <Typography sx={{ fontFamily: 'Open Sans, sans-serif' }}> {book["author"]} </Typography>
                                <Typography sx={{ fontFamily: 'Open Sans, sans-serif' }}> {book["gendre"]} book </Typography>
                                <Typography sx={{ fontFamily: 'Open Sans, sans-serif' }}> Publisher: {book["publisher"]} </Typography>
                                {selectedBook && (role === "Admin" || role === "User") && selectedBook.id === book.id && (
                                    <div>
                                        <EditBook onUpdate={updateBooksEdited} libraryid={libraryid} section={section} book={selectedBook} />
                                        <DeleteBook onUpdate={updateBooksDeleted} libraryid={libraryid} section={section} book={selectedBook} />
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
