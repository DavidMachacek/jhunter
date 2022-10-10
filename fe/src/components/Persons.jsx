import React, {useEffect, useState} from 'react';
import '../css/Persons.css';
import {Avatar, Grid} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import MaterialTable from 'material-table';
import PersonDetail from './PersonDetail';
import {savePersonId} from '../slices/person.js';
import tableIcons from '../consts/tableIcons';
import {useDispatch, useSelector} from "react-redux";
import api from "../consts/api"
import roleConstants from "../consts/roles"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons';
import * as IconsBrands from '@fortawesome/free-brands-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
import useStyles from "../styles";

function Persons() {
    const [persons, setPersons] = useState([]);
    const [isError, setIsError] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);
    const rolesFilter = useSelector((state) => state.roleFilter.roles);
    const [selectedRow, setSelectedRow] = useState(null);

    const classes = useStyles();

    useEffect(() => {
        loadData()
    }, [JSON.stringify(persons), JSON.stringify(rolesFilter)])

    const iconList = Object.keys(Icons)
        .filter((key) => key !== 'fas' && key !== 'prefix')
        .map((icon) => Icons[icon]);
    const iconsBrands = Object.keys(IconsBrands)
        .filter((key) => key !== 'fas' && key !== 'prefix')
        .map((icon) => IconsBrands[icon]);

    library.add(...iconList, ...iconsBrands);

    const columns = [
        {title: "id", field: "idPerson", hidden: true},
        /*{
            title: "Avatar",
            render: rowData => <Avatar size={40}
                                       name={rowData === undefined ? " " : rowData.firstName}/>
                                       .filter(({ l: v }) => v === exp.key)
        },*/
        {
            render: (rowData) => {
                return `${rowData.firstName} ${rowData.lastName}`;
            },
            title: 'Name',
        },
        {
            render: (rowData) => {
                return <div>{getRoleFaIcon(rowData)}</div>
            },
            title: 'Role',
        }
    ]

    function getRoleFaIcon(rowData) {
        let icons = rowData.experiences.map((exp) => exp.type).map((type) => roleConstants.find((role) => role.key === type))
        return (icons.length > 0 && typeof icons[0] !== 'undefined') ? icons.map((role) => {
            return (<FontAwesomeIcon icon={role.faIconClass} class="fa fa-home fa-fw"/>)
        }) : ""
    }

    const validateEmail = (email) => {
        const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
        return re.test(String(email).toLowerCase());
    }

    function loadData() {
        let roleKeys = rolesFilter.map((role) => {
            return role.key
        })
        api.post("/persons/search", {roles: roleKeys})
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

            {/*<Grid container spacing={
                1
            }

            >
                <Grid item xs={3}></Grid>*/}
            {/*<Grid item xs={6}>*/}
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
                title="Kontakty"
                columns={columns}
                data={persons}
                icons={tableIcons}
                options={{
                    padding: "dense",
                    actionsColumnIndex: -1,
                    pageSize: 20, pageSizeOptions: [5, 10, 20, 30],
                    rowStyle: (data, index) => (selectedRow === data.tableData.id ? {
                        background: "#f8bbd0"
                    } : index % 2 == 0 ? {
                        background: "#f5f5f5",
                        width: 50
                    } : {width: 50}),
                    headerStyle: {fontWeight: 'bold', color: "#f8bbd0", height: 60, whiteSpace: "nowrap", width: 50}
                }}
                onRowClick={(event, rowData) => {
                    dispatch(savePersonId(rowData.idPerson))
                    setSelectedRow(rowData.tableData.id)
                }}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            handleRowUpdate(newData, oldData, resolve);

                        }),
                    /*onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            handleRowAdd(newData, resolve)
                        }),*/
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
                                <PersonDetail person={rowData}/>
                            )
                        },
                    }
                ]}
            />
        </div>
    )
}

export default Persons;