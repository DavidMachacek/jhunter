import React, {Component, forwardRef} from "react";
import MaterialTable from "material-table";
import CustomDatePicker from "./CustomDatePicker.js";
import axios from "axios";
import AddBox from "@material-ui/icons/AddBox";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Edit from "@material-ui/icons/Edit";
import SaveAlt from "@material-ui/icons/SaveAlt";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import Search from "@material-ui/icons/Search";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Remove from "@material-ui/icons/Remove";
import ViewColumn from "@material-ui/icons/ViewColumn";

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

var columns = [
    {title: "id", field: "idCommunication", hidden: true},

    {
        title: "Date",
        field: "created",
        type: "date",
        dateSetting: {format: 'dd/MM/yyyy'},
        cellStyle: {
            backgroundColor: '#808080',
            color: '#FFF'
        },
        filterComponent: (props) => <CustomDatePicker {...props} />
    },
    {
        title: "Channel", field: "channel",
        cellStyle: {
            backgroundColor: '#808080',
            color: '#FFF'
        },
    },
    {
        title: "Note", field: "note",
        cellStyle: {
            backgroundColor: '#808080',
            color: '#FFF'
        },
    }
]

const api = axios.create({
    baseURL: `http://localhost:8080/api`
})

export default class CommunicationList extends Component {
    state = {
        communications: [],
        isError: false,
        errorMessages: []
    }

    componentDidMount() {
        this.loadData()
    }

    loadData(idContact) {
        api.get("/communication/" + this.props.idContact)
            .then(res => {
                this.setState({communications: res.data})
            })
            .catch(error => {
                console.log("Error")
            })
    }

    handleRowAdd(newData, resolve) {
        //validation
        let errorList = []
        if (newData.channel === undefined) {
            newData.channel = "EMAIL";
        }
        if (newData.note === undefined) {
            errorList.push("Please enter note")
        }
        if (errorList.length < 1) { //no error
            api.post("/communication/" + this.props.idContact, newData)
                .then(res => {
                    let dataToAdd = [...this.state.communications];
                    dataToAdd.push(newData);
                    //setData(dataToAdd);
                    this.setState((previousState) => ({ communications: [...previousState.communications, res.data] }))
                    resolve()/*
                    setErrorMessages([])
                    setIserror(false)*/
                })
                .catch(error => {
                    this.setState((previousState) => ({
                        errorMessages: [...previousState.errorMessages, "Cannot add data. Server error!"],
                        isError: true
                    }))
                    /*
                    setErrorMessages(["Cannot add data. Server error!"])
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

    render() {
        return <div>
            <MaterialTable
                icons={tableIcons}
                title="Seznam komunikace"
                columns={columns}
                data={this.state.communications}
                options={{search: false, filtering: true}}
                editable={{
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            this.handleRowAdd(newData, resolve)
                        })
                }}
            />
        </div>
    }
}