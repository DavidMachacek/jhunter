import React, {Component, forwardRef, useState} from "react";
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const CustomDatePicker = (props) => {
    const [date, setDate] = useState(null);

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker"
                format="dd/MM/yyyy"
                clearable
                value={date}
                onChange={(event) => {
                    setDate(event);
                    props.onFilterChanged(props.columnDef.tableData.id, event);
                }}
                KeyboardButtonProps={{
                    "aria-label": "change date"
                }}
            />
        </MuiPickersUtilsProvider>
    );
};

export default CustomDatePicker;