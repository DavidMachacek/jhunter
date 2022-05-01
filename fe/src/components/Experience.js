import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import api from "../consts/api";
import MaterialTable from "material-table";
import tableIcons from "../consts/tableIcons";
import CustomDatePicker from "./CustomDatePicker";
import "../css/Experience.css"

function Experience() {
    const [experience, setExperience] = useState([]);
    const [isError, setIsError] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    const personId = useSelector((state) => state.persons.id);

    useEffect(() => {
        loadData(personId)
    }, [personId])

    const loadData = (idPerson) => {
        api.get("/experience/" + idPerson)
            .then(res => {
                setExperience(res.data)
            })
            .catch(error => {
                console.log("Error")
            })
    }

    const columns = [
        {title: "id", field: "idExperience", hidden: true},

        {
            title: "Date",
            field: "created",
            type: "date",
            hidden: true,
            dateSetting: {format: 'dd/MM/yyyy'},
            cellStyle: {
                backgroundColor: '#808080',
                color: '#FFF'
            },
            filterComponent: (props) => <CustomDatePicker {...props} />
        },
        {
            title: "Type", field: "experiencesType",
            cellStyle: {
                backgroundColor: '#808080',
                color: '#FFF'
            },
            lookup: { JAVA:"Java", DOTNET: ".net", ARCHITECT: "IT Architect", TESTER: "Tester", DATABASE: "Database", JAVASCRIPT: "Javascript", ANALYST: "Analytik"}
        },
        {
            title: "Years", field: "years",
            cellStyle: {
                backgroundColor: '#808080',
                color: '#FFF'
            },
        },
        {
            title: "Seniority", field: "seniority",
            cellStyle: {
                backgroundColor: '#808080',
                color: '#FFF'
            },
            lookup: { JUNIOR: "Junior", MEDIOR: "Medior", SENIOR: "Senior"}
        },
        {
            title: "Note", field: "note",
            cellStyle: {
                backgroundColor: '#808080',
                color: '#FFF'
            },
        }
    ]

    const handleRowAdd = (newData, resolve) => {
        //validation
        let errorList = []
        if (newData.experiencesType === undefined) {
            errorList.push("Please enter note")
        }
        if (errorList.length < 1) { //no error
            api.post("/experience/" + personId, newData)
                .then(res => {
                    setExperience(...experience, res.data)
                    resolve()
                })
                .catch(error => {
                    setErrorMessages([...errorMessages, "Cannot add experience. Server error!"])
                    setIsError(true)
                })
        } else {
            setErrorMessages([...errorMessages, ...errorList])
            setIsError(true)
            resolve()
        }
    }
    return <div>
        <MaterialTable
            id="exp-data"
            icons={tableIcons}
            title="Zkušenosti"
            columns={columns}
            data={experience}
            options={{
                padding: "dense",
                search: false, filtering: true,
                actionsColumnIndex: -1,
                rowStyle: (data, index) => index%2==0?{ background: "#f5f5f5" }: null,
                headerStyle: {background: "#00B3FF", fontWeight: 'bold', color: "white", height: 60, whiteSpace: "nowrap"}
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

export default Experience;

