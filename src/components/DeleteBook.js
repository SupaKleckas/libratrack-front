import { useState, Fragment } from "react"
import URL from "../utils/Url.js"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { getJwtToken } from "../utils/Auth";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Typography } from "@mui/material";

export default function DeleteBook({ onUpdate, libraryid, section, book }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        delBook()
    };

    async function delBook() {
        try {
            let url = URL + "/libraries/" + libraryid + "/sections/" + section["id"] + "/books/" + book.id
    
            let response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + getJwtToken()
                }
            });
    
            if (response.ok) {
                onUpdate(book)
                handleClose()
            } else {
                console.error('Delete operation failed (book):', response.status, response.statusText)
            }
        } catch (error) {
            console.error('Error during delete operation (book):', error)
        }
    }

    return (
        <Fragment>
            <Button
                variant="contained"
                onClick={handleClickOpen}
                sx={{ml:1, height:30, fontFamily: 'Open Sans, sans-serif', bgcolor: "#915a5a", '&:hover': { bgcolor: "#784343" } }}
            >
                <DeleteOutlineIcon></DeleteOutlineIcon>
                Delete
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ textAlign: "center" }}>Are you sure you want to delete this book from the library?</DialogTitle>
                <DialogContent>
                    <Typography sx={{ fontFamily: 'Open Sans, sans-serif', textAlign: 'center' }}> Title: {book["title"]} </Typography>
                    <Typography sx={{ fontFamily: 'Open Sans, sans-serif', textAlign: 'center' }}> Publish Year: {book["publishYear"]}</Typography>
                    <Typography sx={{ fontFamily: 'Open Sans, sans-serif', textAlign: 'center' }}> Publisher: {book["publisher"]} </Typography>
                    <Typography sx={{ fontFamily: 'Open Sans, sans-serif', textAlign: 'center' }}> Author: {book["author"]} </Typography>
                    <Typography sx={{ fontFamily: 'Open Sans, sans-serif', textAlign: 'center' }}> Genre: {book["gendre"]} </Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center" }}>
                    <Button variant="contained" onClick={handleSubmit} sx={{ fontFamily: 'Open Sans, sans-serif', bgcolor: "#915a5a", '&:hover': { bgcolor: "#784343" } }}><b>Delete</b></Button>
                    <Button variant="contained" onClick={handleClose} sx={{ fontFamily: 'Open Sans, sans-serif', bgcolor: "#637e90", '&:hover': { bgcolor: "#4e697a" } }}><b>Cancel</b></Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
