import { useState, Fragment } from "react"
import URL from "../utils/Url.js"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { getJwtToken } from "../utils/Auth";
import PostAddIcon from '@mui/icons-material/PostAdd';

export default function CreateSection( {onUpdate, libraryid} ) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    };

    const [formData, setFormData] = useState({
        title: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormData({
            title: ""
        })
        createNewSection()
    };

    const createNewSection = async () => {
        let url = URL + "/libraries/" + libraryid + "/sections"

        let newItem = {
            Title: formData.title
        };
        console.log(JSON.stringify(newItem))
        try {
            const response = await fetch(url, {
                method:'POST',
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
                console.log('Error creating section');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Fragment>
            <Button
                variant="contained"
                onClick={handleClickOpen}
                sx={{ mb: 4, width: 200, height: 50, fontFamily: 'Open Sans, sans-serif', bgcolor:"#5a9178", '&:hover': {bgcolor: "#3e755c"} }}
            >
            <PostAddIcon></PostAddIcon>
                Add new section
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ textAlign: "center" }}>Section title</DialogTitle>
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
