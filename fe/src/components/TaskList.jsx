import React, {useEffect, useState} from "react";
import api from "../consts/api";
import MaterialTable from "material-table";
import tableIcons from "../consts/tableIcons";
import {useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import taskStatus from "../consts/status";
import {Alert} from "@material-ui/lab";


function TaskList() {

    const [tasks, setTasks] = useState([]);
    const [isError, setIsError] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    const personId = useSelector((state) => state.persons.id);

    function loadData() {
        api.get("/tasks")
            .then(res => {
                setTasks(res.data);
            })
            .catch(error => {
                console.log("Error")
            })
    }


    const columns = [
        {title: "id", field: "idTask", hidden: true},
/*        {
            render: (rowData) => {
                return `${rowData.personEntity.firstName} ${rowData.personEntity.lastName}`;
            },
            title: 'Jmeno',
        },*/
        {
            /*render: (rowData) => {
                return `${rowData.targetDate}`;
            },*/
            field: "targetDate",
            title: 'Datum',
            type: "datetime",
            dateSetting: { locale: "en-GB" }
        },
        {
            render: (rowData) => {
                return <div>{getStatusFaIcon(rowData.isDone)}</div>
            },
            field: "isDone",
            title: 'Hotovo',
            type: "boolean"
        },
        {
            field: "note",
            title: 'Poznamka',
        }
    ]

    function getStatusFaIcon(isDone) {
        let icon = taskStatus.find((status) => status.key === isDone)
        return (<FontAwesomeIcon icon={icon.faIconClass} class="fa fa-home fa-fw"/>)
    }

    useEffect(() => {
        loadData()
    }, tasks)

    const handleRowAdd = (newData, resolve) => {
        //validation
        let errorList = []
        if (newData.targetDate === undefined) {
            errorList.push("Please enter targetDate")
        }
        if (newData.note === undefined) {
            errorList.push("Please enter note")
        }
        newData.isDone = false
        console.log("Error " + errorList)
        if (errorList.length < 1) { //no error
            api.post("/tasks", newData)
                .then(res => {
                    setTasks([...tasks, newData])
                    resolve()
                })
                .catch(error => {
                    setErrorMessages([...errorMessages, "Cannot add data. Server error!"])
                    setIsError(true)
                    resolve()
                })
        } else {
            setErrorMessages([...errorMessages, ...errorList, "Adding task failed! Server error"])
            setIsError(true)
            resolve()
        }

    }

    return <div>
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
            icons={tableIcons}
            title="Ukoly"
            columns={columns}
            data={tasks}
            options={{
                padding: "dense",
                filtering: false,
                search: true,
                actionsColumnIndex: -1,
                rowStyle: (data, index) => index % 2 == 0 ? {background: "#f5f5f5"} : null,
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

export default TaskList;