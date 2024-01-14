import { useState, Fragment } from "react"
import URL from "../utils/Url.js"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getJwtToken } from "../utils/Auth";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { InputLabel, Typography } from "@mui/material";
import Library from '../pages/Libraries'

export default function EditLibrary({ onUpdate, library }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [formData, setFormData] = useState({
        name: "",
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
            name: formData.name,
        })
        edLibrary()
    };

    async function edLibrary() {
        try {
            let url = URL + "/libraries/" + library.id;
    
            let editedItem = {
                name: formData.name,
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

    return (
        <Fragment>
            <Button
                variant="contained"
                onClick={handleClickOpen}
                sx={{mr:1, mt:1, fontFamily: 'Open Sans, sans-serif', bgcolor: "#918e5a", '&:hover': { bgcolor: "#66643a" } }}
            >
                <EditIcon></EditIcon>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ textAlign: "center" }}>Edit library information</DialogTitle>
                <DialogContent>
                <TextField
                        autoFocus
                        required
                        fullWidth
                        margin="dense"
                        id="name"
                        name="name"
                        label="Name"
                        type="text"
                        variant="standard"
                        onChange={handleChange}
                        sx={{fontFamily: 'Open Sans, sans-serif'}}
                        defaultValue={library["name"]}
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
