import React, {useEffect, useState} from 'react';
import '../css/Contacts.css';
import {Avatar, Grid} from "@material-ui/core";
import axios from "axios";
import {Alert} from "@material-ui/lab";
import MaterialTable from 'material-table';
import CommunicationList from './CommunicationList.js';
import { saveContactId } from '../slices/contact.js';
import tableIcons from '../consts/tableIcons';
import { useDispatch } from "react-redux";


function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [isError, setIsError] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    useEffect(() => {
        loadData()
    }, [JSON.stringify(contacts)])

    const api = axios.create({
        baseURL: `http://localhost:8080/api`
    })

    const columns = [
        {title: "id", field: "idContact", hidden: true},
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
        api.get("/contacts")
            .then(res => {
                setContacts(res.data);
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

        if (errorList.length < 1) {
            api.patch("/contacts/" + newData.idContact, newData)
                .then(res => {
                    const updatedData = contacts.ids.slice()
                    const index = oldData.tableData.id;
                    updatedData[index] = newData
                    setContacts({...updatedData})
                    resolve()
                })
                .catch(error => {
                    setErrorMessages([...errorMessages, "Update failed! Server error"])
                    setIsError(isError)
                    resolve()
                })
        } else {
            setErrorMessages([...errorMessages, "Update failed! Server error"])
            setIsError(isError)
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

        if (errorList.length < 1) { //no error
            api.post("/contacts", newData)
                .then(res => {
                    /*let dataToAdd = [...this.state.contacts];
                    dataToAdd.push(newData);*/
                    //setData(dataToAdd);
                    //this.setState( { dataToAdd })
                    setContacts([...contacts, newData])
                    resolve()/*
                    setErrorMessages([])
                    setIserror(false)*/
                })
                .catch(error => {
                    setErrorMessages([...errorMessages, "Cannot add data. Server error!"])
                    setIsError(isError)
                    resolve()
                })
        } else {
            resolve()
        }

    }

    const handleRowDelete = (oldData, resolve) => {

        api.delete("/contacts/" + oldData.idContact)
            .then(res => {
                const dataDelete = [...contacts];
                const index = oldData.tableData.idContact;
                dataDelete.splice(index, 1);
                //setData([...dataDelete]);
                setContacts((previousState) => ({contacts: dataDelete}))
                resolve()
            })
            .catch(error => {
                setErrorMessages((previousState) => ({
                    errorMessages: [...previousState.errorMessages, "Delete failed! Server error!"],
                    isError: true
                }))
                /*
                setErrorMessages(["Delete failed! Server error"])
                setIserror(true)*/
                resolve()
            })
    }

    const dispatch = useDispatch();

//https://blog.logrocket.com/react-redux-connect-when-and-how-to-use-it-f2a1edab2013/
 /*   const saveIdContactToRedux = (idContact) => {
        dispatch(saveContactId(idContact))
    }*/

    return (
        //<Contacts contacts={this.state.contacts}/>
        <div className="Contacts">

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
                        data={contacts}
                        icons={tableIcons}
                        onRowClick={(event, rowData) => {
                            //const rowDataCopy = { ...rowData };
                            dispatch(saveContactId(rowData.idContact))
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
                                        <CommunicationList idContact={rowData.idContact}/>
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

export default Contacts;