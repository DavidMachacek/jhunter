import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import api from "../consts/api";
import Modal from "@mui/material/Modal";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {useSelector} from "react-redux";

function PersonModal(props) {
    const [form, setForm] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        linkedIn: ''
    });

    const personId = useSelector((state) => state.personReducer.id);

    const [person, setPerson] = useState([]);
    const loadPersonsData = (idPerson) => {
        api.get("/persons/" + idPerson)
            .then(res => {
                setPerson(res.data)
            })
            .catch(error => {
                console.log("Error")
            })
        setForm(person)
        console.log("MODAL PERSON " + JSON.stringify(person));
        console.log("JOJ First Name ");
        console.log("JOJ First Name " + person && person.firstName);
    }

    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(props.open);
        loadPersonsData(personId)
    }, [props.open, personId]);

    const handleFormChange = (event) => {
        setForm({
            ...form,
            [event.target.id]: event.target.value,
        });
    };

    const addPerson = (event) => {
        event.preventDefault();
        console.log("firstName " + (form.firstName));
        console.log("lastName " + form.lastName);
        console.log("sending " + JSON.stringify(form));
        api.post("/persons", form)
            .then(res => {
                setOpen(false)
            })
            .catch(error => {
            })
    }


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

    return (
        <Modal
            open={props.open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <form onSubmit={addPerson}>

                    <Typography variant="h6" gutterBottom>
                        Add or Change Person
                    </Typography>
                    <Grid container spacing={3}
                          direction="row"
                          justifyContent="center"
                          alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="firstName"
                                name="firstName"
                                label="Krestni Jmeno"
                                type="text"
                                defaultValue={form.firstName}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="lastName"
                                label="Prijmeni"
                                name="lastName"
                                type="text"
                                defaultValue={form.lastName}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="email"
                                label="Email"
                                name="email"
                                type="text"
                                defaultValue={form.email}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="linkedIn"
                                label="LinkedIn"
                                name="linkedIn"
                                type="text"
                                defaultValue={form.linkedIn}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button variant="contained" color="primary" type="submit">
                                Submit
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button variant="contained" color="primary" onClick={props.handleModalClose}>
                                Exit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Modal>
    )
}


export default PersonModal;