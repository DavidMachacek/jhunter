import React, {Component, forwardRef} from 'react';
import AddBox from '@material-ui/icons/AddBox';
import './App.css';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {Avatar, Grid} from "@material-ui/core";
import axios from "axios";
import {Alert} from "@material-ui/lab";
import MaterialTable from "material-table";
import CommunicationList from './components/CommunicationList.js';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};

const api = axios.create({
    baseURL: `http://localhost:8080/api`
})


var columns = [
    {title: "id", field: "idContact", hidden: true},
    {
        title: "Avatar",
        render: rowData => <Avatar maxInitials={1} size={40} round={true}
                                   name={rowData === undefined ? " " : rowData.firstName}/>
    },
    {title: "First name", field: "firstName"},
    {title: "Last name", field: "lastName"},
    {title: "email", field: "email"},
    {title: "phone", field: "phone"},
    {title: "role", field: "role"}
]

//const [data, setData] = useState([]); //table data


export default class App extends Component {

    state = {
        contacts: [],
        isError: false,
        errorMessages: []
    }

    componentDidMount() {
        this.loadData()
    }

    validateEmail(email) {
        const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
        return re.test(String(email).toLowerCase());
    }

    loadData() {
        api.get("/contacts")
            .then(res => {
                this.setState( { contacts: res.data })
            })
            .catch(error => {
                console.log("Error")
            })
    }

    handleRowUpdate(newData, oldData, resolve) {
        //validation
        let errorList = []
        if (newData.firstName === "") {
            errorList.push("Please enter first name")
        }
        if (newData.lastName === "") {
            errorList.push("Please enter last name")
        }
        if (newData.email === "" || this.validateEmail(newData.email) === false) {
            errorList.push("Please enter a valid email")
        }

        if (errorList.length < 1) {
            api.patch("/contacts/" + newData.idContact, newData)
                .then(res => {
                    //const dataUpdate = [...data];
                    //this.setState( { data })
                    const updatedData = this.state.ids.slice()
                    const index = oldData.tableData.id;
                    updatedData[index] = newData
                    //setData([...dataUpdate]);
                    this.setState( { ...updatedData })
                    resolve()
                    /*
                    setIserror(false)
                    setErrorMessages([])*/
                })
                .catch(error => {
                    this.setState((previousState) => ({ errorMessages: [...previousState.errorMessages, "Update failed! Server error"], isError: true}))
                    /*
                    setErrorMessages(["Update failed! Server error"])
                    setIserror(true)*/
                    resolve()

                })
        } else {
            this.setState((previousState) => ({ errorMessages: [...previousState.errorMessages, errorList], isError: true}))
            /*
            setErrorMessages(errorList)
            setIserror(true)*/
            resolve()
        }

    }

    handleRowAdd(newData, resolve) {
        //validation
        let errorList = []
        if (newData.firstName === undefined) {
            errorList.push("Please enter first name")
        }
        if (newData.lastName === undefined) {
            errorList.push("Please enter last name")
        }
        if (newData.email === undefined || this.validateEmail(newData.email) === false) {
            errorList.push("Please enter a valid email")
        }

        if (errorList.length < 1) { //no error
            api.post("/contacts", newData)
                .then(res => {
                    /*let dataToAdd = [...this.state.contacts];
                    dataToAdd.push(newData);*/
                    //setData(dataToAdd);
                    //this.setState( { dataToAdd })
                    this.setState((previousState) => ({ contacts: [...previousState.contacts, newData] }))
                    resolve()/*
                    setErrorMessages([])
                    setIserror(false)*/
                })
                .catch(error => {
                    this.setState((previousState) => ({ errorMessages: [...previousState.errorMessages, "Cannot add data. Server error!"], isError: true}))
                    /*
                    setErrorMessages(["Cannot add data. Server error!"])
                    setIserror(true)*/
                    resolve()
                })
        } else {/*
            setErrorMessages(errorList)
            setIserror(true)*/
            resolve()
        }

    }

    handleRowDelete(oldData, resolve) {

        api.delete("/contacts/" + oldData.idContact)
            .then(res => {
                const dataDelete = [...this.state.contacts];
                const index = oldData.tableData.idContact;
                dataDelete.splice(index, 1);
                //setData([...dataDelete]);
                this.setState( (previousState) => ({ contacts: dataDelete }))
                resolve()
            })
            .catch(error => {
                this.setState((previousState) => ({ errorMessages: [...previousState.errorMessages, "Delete failed! Server error!"], isError: true}))
                /*
                setErrorMessages(["Delete failed! Server error"])
                setIserror(true)*/
                resolve()
            })
    }

    render() {
        return (
            //<Contacts contacts={this.state.contacts}/>
            <div className="App">

                <Grid container spacing={
                    1
                }

                >
                    <Grid item xs={3}></Grid>
                    <Grid item xs={6}>
                        <div>
                            {this.state.isError &&
                                <Alert severity="error">
                                    {this.state.errorMessages.map((msg, i) => {
                                        return <div key={i}>{msg}</div>
                                    })}
                                </Alert>
                            }
                        </div>
                        <MaterialTable
                            title="Seznam kontaktů"
                            columns={columns}
                            data={this.state.contacts}
                            icons={tableIcons}
                            editable={{
                                onRowUpdate: (newData, oldData) =>
                                    new Promise((resolve) => {
                                        this.handleRowUpdate(newData, oldData, resolve);

                                    }),
                                onRowAdd: (newData) =>
                                    new Promise((resolve) => {
                                        this.handleRowAdd(newData, resolve)
                                    }),
                                onRowDelete: (oldData) =>
                                    new Promise((resolve) => {
                                        this.handleRowDelete(oldData, resolve)
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
}

/*
state = {
    contacts: []
};

componentDidMount()
{
    fetch('http://localhost:8080/api')
        .then(res => res.json())
        .then((data) => {
            this.setState({contacts: data})
        })
        .catch(console.log)
}
}
*/

/*
export default App;*/
