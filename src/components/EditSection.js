import { useState, Fragment } from "react"
import URL from "../utils/Url.js"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { getJwtToken } from "../utils/Auth";
import EditIcon from '@mui/icons-material/Edit';


export default function EditSection({ onUpdate, setTitle, libraryid, section }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [formData, setFormData] = useState({
        title: ""
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
            title: formData.title,
        })
        edSection()
    };

    async function edSection() {
        try {
            let url = URL + "/libraries/" + libraryid + "/sections/" + section.id
    
            let editedItem = {
                title: formData.title
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
                setTitle(editedLibrary["title"])
                handleClose();
            } else {
                console.error('Edit operation failed:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error during edit operation:', error);
        }
    }

    return (
        <Fragment>
            <Button
                variant="contained"
                onClick={handleClickOpen}
                sx={{mr:1, width: 200, height: 50, fontFamily: 'Open Sans, sans-serif', bgcolor: "#918e5a", '&:hover': { bgcolor: "#66643a" } }}
            >
                <EditIcon></EditIcon>
                Edit section
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ textAlign: "center" }}>Edit section information</DialogTitle>
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
                        defaultValue={section["title"]}
                    />
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center" }}>
                    <Button variant="contained" onClick={handleSubmit} sx={{ fontFamily: 'Open Sans, sans-serif', bgcolor: "#5a9178", '&:hover': { bgcolor: "#3e755c" } }}><b>Save</b></Button>
                    <Button variant="contained" onClick={handleClose} sx={{ fontFamily: 'Open Sans, sans-serif', bgcolor: "#637e90", '&:hover': { bgcolor: "#4e697a" } }}><b>Cancel</b></Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
