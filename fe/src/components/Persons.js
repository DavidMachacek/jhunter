import React, {useEffect, useState} from 'react';
import '../css/Persons.css';
import {Avatar, Grid} from "@material-ui/core";
import axios from "axios";
import {Alert} from "@material-ui/lab";
import MaterialTable from 'material-table';
import CommunicationList from './CommunicationList.js';
import { savePersonId } from '../slices/person.js';
import tableIcons from '../consts/tableIcons';
import { useDispatch } from "react-redux";

function Persons() {
    const [persons, setPersons] = useState([]);
    const [isError, setIsError] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    useEffect(() => {
        loadData()
    }, [JSON.stringify(persons)])

    const api = axios.create({
        baseURL: `http://localhost:8080/api`
    })

    const columns = [
        {title: "id", field: "idPerson", hidden: true},
        {
            title: "Avatar",
            render: rowData => <Avatar size={40}
                                       name={rowData === undefined ? " " : rowData.firstName}/>
        },
        {title: "First name", field: "firstName"},
        {title: "Last name", field: "lastName"},
        {title: "email", field: "email"},
        {title: "phone", field: "phone"},
        {title: "role", field: "role"}
    ]

    const validateEmail = (email) => {
        const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
        return re.test(String(email).toLowerCase());
    }

    function loadData() {
        api.get("/persons")
            .then(res => {
                setPersons(res.data);
            })
            .catch(error => {
                console.log("Error")
            })
    }

    const handleRowUpdate = (newData, oldData, resolve) => {
        //validation
        let errorList = []
        if (newData.firstName === "") {
            errorList.push("Please enter first name")
        }
        if (newData.lastName === "") {
            errorList.push("Please enter last name")
        }
        if (newData.email === "" || validateEmail(newData.email) === false) {
            errorList.push("Please enter a valid email")
        }
        console.log("Errorlist size " + errorList.length)
        if (errorList.length < 1) {
            api.patch("/persons/" + newData.idPerson, newData)
                .then(res => {
                    const updatedData = persons.ids.slice()
                    const index = oldData.tableData.id;
                    updatedData[index] = newData
                    setPersons({...updatedData})
                    resolve()
                })
                .catch(error => {
                    setErrorMessages([...errorMessages, "Update failed! Server error"])
                    setIsError(true)
                    resolve()
                })
        } else {
            setErrorMessages([...errorMessages, ...errorList, "Update failed! Server error"])
            setIsError(true)
            resolve()
        }

    }

    const handleRowAdd = (newData, resolve) => {
        //validation
        let errorList = []
        if (newData.firstName === undefined) {
            errorList.push("Please enter first name")
        }
        if (newData.lastName === undefined) {
            errorList.push("Please enter last name")
        }
        if (newData.email === undefined || validateEmail(newData.email) === false) {
            errorList.push("Please enter a valid email")
        }
        console.log("Errorlist size " + errorList.length)

        if (errorList.length < 1) { //no error
            api.post("/persons", newData)
                .then(res => {
                    setPersons([...persons, newData])
                    resolve()
                })
                .catch(error => {
                    setErrorMessages([...errorMessages, "Cannot add data. Server error!"])
                    setIsError(true)
                    resolve()
                })
        } else {
            setErrorMessages([...errorMessages, ...errorList, "Adding person failed! Server error"])
            setIsError(true)
            resolve()
        }

    }

    const handleRowDelete = (oldData, resolve) => {

        api.delete("/persons/" + oldData.idPerson)
            .then(res => {
                const dataDelete = [...persons];
                const index = oldData.tableData.idPerson;
                dataDelete.splice(index, 1);
                //setData([...dataDelete]);
                setPersons((previousState) => ({persons: dataDelete}))
                resolve()
            })
            .catch(error => {
                setErrorMessages((previousState) => ({
                    errorMessages: [...previousState.errorMessages, "Delete failed! Server error!"],
                    isError: true
                }))
                resolve()
            })
    }

    const dispatch = useDispatch();

    return (
        <div className="Persons">

            <Grid container spacing={
                1
            }

            >
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <div>
                        {isError &&
                            <Alert severity="error">
                                {errorMessages.map((msg, i) => {
                                    return <div key={i}>{msg}</div>
                                })}
                            </Alert>
                        }
                    </div>
                    <MaterialTable
                        title="Seznam kontaktů"
                        columns={columns}
                        data={persons}
                        icons={tableIcons}
                        onRowClick={(event, rowData) => {
                            dispatch(savePersonId(rowData.idPerson))
                        }}
                        editable={{
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve) => {
                                    handleRowUpdate(newData, oldData, resolve);

                                }),
                            onRowAdd: (newData) =>
                                new Promise((resolve) => {
                                    handleRowAdd(newData, resolve)
                                }),
                            onRowDelete: (oldData) =>
                                new Promise((resolve) => {
                                    handleRowDelete(oldData, resolve)
                                }),
                        }}
                        detailPanel={[
                            {
                                tooltip: 'Ukaz kontakty',
                                render: rowData => {
                                    return (
                                        <CommunicationList idPerson={rowData.idPerson}/>
                                    )
                                },
                            }
                        ]}
                    />
                </Grid>
                <Grid item xs={3}></Grid>
            </Grid>
        </div>
    )
}

export default Persons;