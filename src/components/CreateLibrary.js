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
import PostAddIcon from '@mui/icons-material/PostAdd';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { InputLabel } from "@mui/material";
import Library from '../pages/Libraries'

export default function CreateLibrary( {onUpdate} ) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [formData, setFormData] = useState({
        Name: "",
        Address: ""
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
            Name: "",
            Address: ""
        })
        createNewLibrary()
    };

    async function createNewLibrary() {
        let url = URL + "/libraries"

        let newItem = {
            Name: formData.name,
            Address: formData.address
        };

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + getJwtToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem)
        })
            .then(response => response.ok ? response.json() : null)
            .catch(error => {
                console.log(error)
            });
            
        if (response == null) {
            return;
        } else {
            onUpdate(response)
            handleClose()
        }
    }

    return (
        <Fragment>
            <Button
                variant="contained"
                onClick={handleClickOpen}
                sx={{ width: 200, height: 50, fontFamily: 'Open Sans, sans-serif', bgcolor:"#5a9178", '&:hover': {bgcolor: "#3e755c"} }}
            >
            <PostAddIcon></PostAddIcon>
                Add new library
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ textAlign: "center" }}>Library information</DialogTitle>
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
                    />
                    <TextField
                        autoFocus
                        required
                        fullWidth
                        margin="dense"
                        id="address"
                        name="address"
                        label="Address"
                        type="text"
                        variant="standard"
                        onChange={handleChange}
                        sx={{fontFamily: 'Open Sans, sans-serif'}}
                    />
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center" }}>
                    <Button variant="contained" onClick={handleSubmit} sx={{fontFamily: 'Open Sans, sans-serif', bgcolor:"#5a9178", '&:hover': {bgcolor: "#3e755c"} }}><b>Create</b></Button>
                    <Button variant="contained" onClick={handleClose} sx={{fontFamily: 'Open Sans, sans-serif', bgcolor:"#637e90", '&:hover': {bgcolor: "#4e697a"} }}><b>Cancel</b></Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
