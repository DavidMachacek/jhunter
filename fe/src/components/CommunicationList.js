import React, {Component, useState} from "react";
import MaterialTable from "material-table";
import axios from "axios";

var columns = [
    {title: "id", field: "idCommunication", hidden: false},
    {title: "Date", field: "date"},
    {title: "Channel", field: "channel"},
    {title: "Note", field: "note"}
]

const api = axios.create({
    baseURL: `http://localhost:8080/api`
})

const [communications] = useState([]); //table data

class CommunicationList extends Component {

    render() {
        const {idContact} = this.props
/*
        function loadContacts(idContact) {
            api.get("/communication/" + idContact)
                .then(res => {
                    communications(res.data)
                })
                .catch(error => {
                    console.log("Error")
                })
        }

        loadContacts(idContact)*/
        return <div>
            <MaterialTable
                title="Seznam kontaktů"
                columns={columns}
                data={communications}
            />
        </div>
    }
}

export default CommunicationList;