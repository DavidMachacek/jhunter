import React, {Component, forwardRef, useEffect, useState} from "react";
import MaterialTable from "material-table";
import CustomDatePicker from "./CustomDatePicker.jsx";
import tableIcons from '../consts/tableIcons';
import {useSelector} from "react-redux";
import api from "../consts/api"
import personReducer from "../slices/person";

function CommunicationList() {
    const [communications, setCommunications] = useState([]);
    const [isError, setIsError] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    const personId = useSelector((state) => state.personReducer.id);

    useEffect(() => {
        loadData(personId)
    }, [personId])

    const loadData = (idPerson) => {
        api.get("/communication/" + idPerson)
            .then(res => {
                setCommunications(res.data)
            })
            .catch(error => {
                console.log("Error")
            })
    }

    const handleRowAdd = (newData, resolve) => {
        //validation
        let errorList = []
        if (newData.channel === undefined) {
            newData.channel = "EMAIL";
        }
        if (newData.note === undefined) {
            errorList.push("Please enter note")
        }
        if (errorList.length < 1) { //no error
            api.post("/communication/" + personId, newData)
                .then(res => {
                    setCommunications(...communications, res.data)
                    resolve()
                })
                .catch(error => {
                    setErrorMessages([...errorMessages, "Cannot add data. Server error!"])
                    setIsError(true)
                })
        } else {
            setErrorMessages([...errorMessages, ...errorList])
            setIsError(true)
            resolve()
        }
    }

    const columns = [
        {title: "id", field: "idCommunication", hidden: true},

        {
            title: "Date",
            field: "created",
            type: "date",
            dateSetting: {format: 'dd/MM/yyyy'},
            filterComponent: (props) => <CustomDatePicker {...props} />
        },
        {
            title: "Channel", field: "channel",
        },
        {
            title: "Note", field: "note",
        }
    ]

    return <div>
        <MaterialTable
            icons={tableIcons}
            title="Komunikace"
            columns={columns}
            data={communications}
            options={{
                padding: "dense",
                search: false, filtering: false,
                actionsColumnIndex: -1,
                rowStyle: (data, index) => index%2==0?{ background: "#f5f5f5" }: null,
                headerStyle: {fontWeight: 'bold', color: "#f8bbd0", height: 60, whiteSpace: "nowrap"}
            }}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        handleRowAdd(newData, resolve)
                    })
            }}
        />
    </div>
}

export default CommunicationList;