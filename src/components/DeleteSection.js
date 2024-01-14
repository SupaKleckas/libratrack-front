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

export default function DeleteSection({ onUpdate, closeSection, libraryid, section }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        delSection()
    };

    async function delSection() {
        try {
            let url = URL + "/libraries/" + libraryid + "/sections/" + section.id;
    
            let response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + getJwtToken()
                }
            });
    
            if (response.ok) {
                onUpdate(section)
                handleClose()
                closeSection(null)
            } else {
                console.error('Delete operation failed (section):', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error during delete operation (section):', error);
        }
    }

    return (
        <Fragment>
            <Button
                variant="contained"
                onClick={handleClickOpen}
                sx={{ml:1, width: 200, height: 50, fontFamily: 'Open Sans, sans-serif', bgcolor: "#915a5a", '&:hover': { bgcolor: "#784343" } }}
            >
                <DeleteOutlineIcon></DeleteOutlineIcon>
                Delete section
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ textAlign: "center" }}>Are you sure you want to delete this section of the library?</DialogTitle>
                <DialogContent>
                    <Typography sx={{ fontFamily: 'Open Sans, sans-serif', textAlign: 'center' }}> Title: {section["title"]} </Typography>
                    <Typography sx={{ fontFamily: 'Open Sans, sans-serif', textAlign: 'center' }}> Amount of books: {section["bookCount"]}</Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center" }}>
                    <Button variant="contained" onClick={handleSubmit} sx={{ fontFamily: 'Open Sans, sans-serif', bgcolor: "#915a5a", '&:hover': { bgcolor: "#784343" } }}><b>Delete</b></Button>
                    <Button variant="contained" onClick={handleClose} sx={{ fontFamily: 'Open Sans, sans-serif', bgcolor: "#637e90", '&:hover': { bgcolor: "#4e697a" } }}><b>Cancel</b></Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
