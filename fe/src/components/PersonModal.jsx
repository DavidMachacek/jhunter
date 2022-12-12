import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import api from "../consts/api";

function PersonModal(props) {

    const defaultValues = {
        firstName: "",
        lastName: ""
    };
    const [formValues, setFormValues] = useState(defaultValues);

    const handleSubmit = (event) => {
        /*event.preventDefault();*/
        console.log(formValues);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    function addPerson(formValues) {
        console.log("firstName " +(formValues.firstName));
        console.log("lastName " + formValues.lastName);
        console.log("sending " + JSON.stringify(formValues));
        api.post("/persons", formValues)
            .then(res => {
                props.handleModalClose()
            })
            .catch(error => {
            })
    }

    return (
            <form onSubmit={addPerson}>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            required
                            id="outlined-required"
                            name="firstName"
                            label="Krestni Jmeno"
                            type="text"
                            defaultValue={formValues.firstName}
                            /*value={formValues.krestni}*//*
                            onChange={handleInputChange}*/
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Prijmeni"
                            name="lastName"
                            type="text"
                            defaultValue={formValues.lastName}
                            /*value={formValues.prijmeni}*//*
                            onChange={handleInputChange}*/
                        />
                    </div>
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </Box>
            </form>
    )
}


export default PersonModal;