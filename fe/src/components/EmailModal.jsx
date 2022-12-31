import {Box, Modal} from "@mui/material";
import {Typography} from "@material-ui/core";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, {useEffect} from "react";
import api from "../consts/api";

function EmailModal(props) {

    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [form, setForm] = React.useState({
        subject: '',
        payload: '',
        recipientIds: []
    });

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleFormChange = (event) => {
        setForm({
            ...form,
            [event.target.id]: event.target.value,
        });
    };

    const sendEmail = (idPerson) => {
        form.recipientIds = [idPerson]
        console.log("Sending email: " + JSON.stringify(form))
        api.post("/email/send", form)
            .then(res => {
            })
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <form onSubmit={e => { e.preventDefault()
                    sendEmail(props.idPerson)
                    props.handleModalClose()
                }
                }>

                    <Typography variant="h6" gutterBottom>
                        Posli email
                    </Typography>
                    <Grid container spacing={3}
                          direction="row"
                          justifyContent="center"
                          alignItems="center">
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                id="subject"
                                name="subject"
                                label="Predmet"
                                type="text"
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                id="payload"
                                label="Obsah"
                                name="payload"
                                type="text"
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Button variant="contained" color="primary" type="submit">
                                {/*onClick={sendEmail(props.idPerson)}*/}
                                Poslat
                            </Button>

                            <Button variant="contained" color="error" onClick={props.handleModalClose}>
                                Exit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Modal>
    )
}

export default EmailModal;