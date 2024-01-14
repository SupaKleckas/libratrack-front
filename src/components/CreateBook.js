import { useState, Fragment } from "react"
import URL from "../utils/Url.js"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import { getJwtToken } from "../utils/Auth";
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Container } from "@mui/material"

export default function CreateBook({ onUpdate, libraryid, section }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [formData, setFormData] = useState({
        title: "",
        publishyear: "",
        publisher: "",
        author: "",
        gendre: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const isFormValid = Object.values(formData).every((field) => field.trim() !== '');
        if (!isFormValid) {
            alert('Please fill in all the required fields and check field requirements.');
            return
        }

        setFormData({
            title: "",
            publishyear: "",
            publisher: "",
            author: "",
            gendre: "",
        })
        createNewBook()
    };

    const createNewBook = async () => {
        let url = URL + "/libraries/" + libraryid + "/sections/" + section["id"] + "/books"

        let newItem = {
            Title: formData.title,
            PublishYear: formData.publishyear,
            Publisher: formData.publisher,
            Author: formData.author,
            Gendre: formData.gendre
        };
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getJwtToken()}`
                },
                body: JSON.stringify(newItem)
            });

            if (response.ok) {
                const data = await response.json()
                onUpdate(data)
                handleClose()
            } else {
                console.log('Error creating book');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const genreItems = [
        "Science",
        "History",
        "Fiction",
        "Classics",
        "Horror",
        "Dystopian",
        "Memoir",
        "Mystery",
        "Fantasy"
    ].map((genre, index) => {
        return (<MenuItem key={index} value={genre}>{genre}</MenuItem>)
    })

    return (
        <Fragment>

            <Button
                variant="contained"
                onClick={handleClickOpen}
                sx={{ width: 200, height: 50, fontFamily: 'Open Sans, sans-serif', bgcolor: "#5a9178", '&:hover': { bgcolor: "#3e755c" } }}
            >
                <PostAddIcon></PostAddIcon>
                Add new book
            </Button>

            <Container>
                <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                    <DialogTitle sx={{ textAlign: "center" }}>Book information</DialogTitle>
                    <DialogContentText sx={{ ml: 2 }}>
                        Please fill out all fields.
                    </DialogContentText>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            fullWidth
                            margin="dense"
                            id="title"
                            name="title"
                            label="Title"
                            type="text"
                            variant="standard"
                            onChange={handleChange}
                            sx={{ fontFamily: 'Open Sans, sans-serif' }}
                        />
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            fullWidth
                            margin="dense"
                            id="publishyear"
                            name="publishyear"
                            label="Publish year"
                            type="number"
                            min="1800"
                            max="2024"
                            variant="standard"
                            onChange={handleChange}
                            sx={{ fontFamily: 'Open Sans, sans-serif' }}
                        />
                        <FormHelperText>Enter a year between 1800 and 2024</FormHelperText>
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            fullWidth
                            margin="dense"
                            id="publisher"
                            name="publisher"
                            label="Publisher"
                            type="text"
                            variant="standard"
                            onChange={handleChange}
                            sx={{ fontFamily: 'Open Sans, sans-serif' }}
                        />
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            fullWidth
                            margin="dense"
                            id="author"
                            name="author"
                            label="Author"
                            type="text"
                            variant="standard"
                            onChange={handleChange}
                            sx={{ fontFamily: 'Open Sans, sans-serif' }}
                        />
                    </DialogContent>
                    <DialogContent >
                        <TextField
                            autoFocus
                            required
                            fullWidth
                            select
                            margin="dense"
                            id="gendre"
                            name="gendre"
                            type="text"
                            label="Genre"
                            onChange={handleChange}
                            defaultValue="Science"
                            sx={{ fontFamily: 'Open Sans, sans-serif' }}
                        >
                            {genreItems}
                        </TextField>
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: "center" }}>
                        <Button variant="contained" onClick={handleSubmit} sx={{ fontFamily: 'Open Sans, sans-serif', bgcolor: "#5a9178", '&:hover': { bgcolor: "#3e755c" } }}><b>Create</b></Button>
                        <Button variant="contained" onClick={handleClose} sx={{ fontFamily: 'Open Sans, sans-serif', bgcolor: "#637e90", '&:hover': { bgcolor: "#4e697a" } }}><b>Cancel</b></Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Fragment>
    );

}
