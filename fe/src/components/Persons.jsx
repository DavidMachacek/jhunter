import React, {useEffect, useState} from 'react';
import '../css/Persons.css';
import {Alert} from "@material-ui/lab";
import MaterialTable from '@material-table/core';
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
import PersonModal from "./PersonModal";
import Add from "@material-ui/icons/Add";
import Edit from "@material-ui/icons/Edit";

function Persons() {
    const [persons, setPersons] = useState([]);
    const [isError, setIsError] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);
    const rolesFilter = useSelector((state) => state.roleReducer.roles);
    const userStore = useSelector((state) => state.oidc);
    const [selectedRow, setSelectedRow] = useState(null);

    const [modalOpen, setModalOpen] = React.useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

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
        api.interceptors.request.use(
            function (config) {
                config.headers['Authorization'] = 'Bearer ' + userStore.user.access_token
                return config;
            }, function (error) {
                return Promise.reject(error);
            }
        )
        api.post("/persons/search", {roles: roleKeys}
        )

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
                title="Lide"
                columns={columns}
                data={persons}
                icons={tableIcons}
                actions={[
                    {
                        icon: Add,
                        tooltip: 'Add User',
                        isFreeAction: true,
                        onClick: (event) => {
                            setModalOpen(true);
                        }
                    },
                    {
                        icon: Edit,
                        tooltip: 'Edit User',
                        onClick: (event, rowData) => {
                            console.log("setSelectedRow" + JSON.stringify(rowData.tableData))
                            setSelectedRow(rowData.tableData.id)
                            dispatch(savePersonId(rowData.idPerson))
                            setModalOpen(true);
                        }
                    }
                ]}
                options={{
                    maxBodyHeight: "59vh",
                    minBodyHeight: "59vh",
                    padding: "dense",
                    actionsColumnIndex: -1,
                    pageSize: 10, pageSizeOptions: [5, 10, 20, 30],
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

            <PersonModal open={modalOpen} handleModalClose={handleModalClose}/>
        </div>
    )
}

export default Persons;