import { useState, Fragment } from "react"
import URL from "../utils/Url.js"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { getJwtToken } from "../utils/Auth";
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';

export default function EditBook({ onUpdate, libraryid, section, book }) {
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [formData, setFormData] = useState({
        title: book["title"],
        publishyear: book["publishYear"],
        publisher: book["publisher"],
        author: book["author"],
        gendre: book["gendre"]
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        setFormData({
            title: book["title"],
            publishYear: book["publishYear"],
            publisher: book["publisher"],
            author: book["author"],
            gendre: book["gendre"]
        })
        edBook()
    };

    async function edBook() {
        try {
            let url = URL + "/libraries/" + libraryid + "/sections/" + section["id"] + "/books/" + book.id
    
            let editedItem = {
                Title: formData.title,
                PublishYear: formData.publishyear,
                Publisher: formData.publisher,
                Author: formData.author,
                Gendre: formData.gendre
            };

            let response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getJwtToken()
                },
                body: JSON.stringify(editedItem)
            });
    
            if (response.ok) {
                const editedLibrary = await response.json();
                onUpdate(editedLibrary)
                handleClose();
            } else {
                console.error('Edit operation failed:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error during edit operation:', error);
        }
    }

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
    ].map((genre, index)=>{
        return (<MenuItem key={index} value={genre}>{genre}</MenuItem>)
    })

    return (
        <Fragment>
            <Button
                variant="contained"
                onClick={handleClickOpen}
                sx={{mr:1, height:30, fontFamily: 'Open Sans, sans-serif', bgcolor: "#918e5a", '&:hover': { bgcolor: "#66643a" } }}
            >
                <EditIcon></EditIcon>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle sx={{ textAlign: "center" }}>Edit book information</DialogTitle>
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
                        sx={{fontFamily: 'Open Sans, sans-serif'}}
                        defaultValue={book["title"]}
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
                        sx={{fontFamily: 'Open Sans, sans-serif'}}
                        defaultValue={book["publishYear"]}
                    />
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
                        sx={{fontFamily: 'Open Sans, sans-serif'}}
                        defaultValue={book["publisher"]}
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
                        sx={{fontFamily: 'Open Sans, sans-serif'}}
                        defaultValue={book["author"]}
                    />
                </DialogContent>
                <DialogContent>
                    <TextField
                        required
                        fullWidth
                        select
                        margin="dense"
                        id="gendre"
                        name="gendre"
                        label="Genre"
                        onChange={handleChange}
                        sx={{fontFamily: 'Open Sans, sans-serif'}}
                        defaultValue={book["gendre"]}
                    >
                        {genreItems}
                    </TextField>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center" }}>
                    <Button variant="contained" onClick={handleSubmit} sx={{ fontFamily: 'Open Sans, sans-serif', bgcolor: "#5a9178", '&:hover': { bgcolor: "#3e755c" } }}><b>Save</b></Button>
                    <Button variant="contained" onClick={handleClose} sx={{ fontFamily: 'Open Sans, sans-serif', bgcolor: "#637e90", '&:hover': { bgcolor: "#4e697a" } }}><b>Cancel</b></Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
