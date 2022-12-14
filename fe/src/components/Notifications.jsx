import React, {useEffect, useState} from 'react';
import api from "../consts/api";
import Chip from "@mui/material/Chip";

function Notifications() {
    const [seconds, setSeconds] = useState(0);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
            console.log("Seconds timer: " + seconds)
            loadTasks()
        }, 1000);
        return () => {
            clearInterval(interval);
        }
    }, []);

    function loadTasks() {
        api.get("/tasks/due")
            .then(res => {
                console.log("Response due tasks: " + JSON.stringify(res.data))
                setTasks(res.data);
            })
            .catch(error => {
                console.log("Error")
            })
    }

    return (
        <div className="App">
            <Chip label={tasks.length} color={tasks.length === 0 ? "success": "error"}/>
        </div>
    );
}
export default Notifications;