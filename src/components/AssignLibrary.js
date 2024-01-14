import { useState, Fragment } from "react"
import URL from "../utils/Url.js"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { getJwtToken } from "../utils/Auth";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function AssignLibrary( {libraryid} ) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [formData, setFormData] = useState({
        username: ""
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
            username: ""
        })
        createNewLibrary()
    };

    async function createNewLibrary() {
        let url = URL + "/libraries/" + libraryid + "/addWorker"

        let newItem = {
            UserName: formData.username
        };

        let response = await fetch(url, {
            method: 'PUT',
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
            handleClose()
        }
    }

    return (
        <Fragment>
            <Button
                variant="contained"
                onClick={handleClickOpen}
                sx={{ mb: 4, ml:2, width: 260, height: 50, fontFamily: 'Open Sans, sans-serif', bgcolor:"#637e90", '&:hover': {bgcolor: "#4e697a"} }}
            >
            <PersonAddIcon></PersonAddIcon>
                Assign worker to library
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ textAlign: "center" }}> Assign to library </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        fullWidth
                        margin="dense"
                        id="username"
                        name="username"
                        label="Username"
                        type="text"
                        variant="standard"
                        onChange={handleChange}
                        sx={{fontFamily: 'Open Sans, sans-serif'}}
                    />

                </DialogContent>
                <DialogActions sx={{ justifyContent: "center" }}>
                    <Button variant="contained" onClick={handleSubmit} sx={{fontFamily: 'Open Sans, sans-serif', bgcolor:"#5a9178", '&:hover': {bgcolor: "#3e755c"} }}><b>Assign</b></Button>
                    <Button variant="contained" onClick={handleClose} sx={{fontFamily: 'Open Sans, sans-serif', bgcolor:"#637e90", '&:hover': {bgcolor: "#4e697a"} }}><b>Cancel</b></Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
