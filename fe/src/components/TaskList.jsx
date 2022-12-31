import React, {useEffect, useState} from "react";
import api from "../consts/api";
import MaterialTable from '@material-table/core';
import tableIcons from "../consts/tableIcons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import taskStatus from "../consts/status";
import {Alert} from "@material-ui/lab";
import Close from '@material-ui/icons/Close';
import Check from '@material-ui/icons/Check';


function TaskList() {

    const [tasks, setTasks] = useState([]);
    const [isError, setIsError] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

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
        {title: "id", field: "idTask", hidden: true, filtering: false },
        {
            field: "targetDate",
            title: 'Datum',
            type: "datetime",
            dateSetting: {locale: "en-GB"},
            filtering: false
},
        {
            field: "note",
            title: 'Poznamka',
        filtering: false
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

    function finishTask(taskId) {
        /*console.log("Deleting task " + JSON.stringify(taskId))*/
        api.patch("/tasks/id/" + JSON.stringify(taskId) + "/done")
            .then(res => {
                loadData();
            })
            .catch(error => {
                console.log("Error")
            })
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
                filtering: true,
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
            actions={[
                rowData => ({
                    icon: rowData.isDone ? Close : Check,
                    tooltip: rowData.isDone ? 'Mark the task unfinished' : 'Mark the task finished',
                    onClick: (event, rowData) => finishTask(rowData.idTask)
                })
            ]}
        />
    </div>
}


export default TaskList;