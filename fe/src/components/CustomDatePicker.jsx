import React, {Component, forwardRef, useState} from "react";
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';


const CustomDatePicker = (props) => {
    const [date, setDate] = useState(null);

    return (
        <LocalizationProvider  utils={DateFnsUtils}>
            <DatePicker
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
        </LocalizationProvider >
    );
};

export default CustomDatePicker;