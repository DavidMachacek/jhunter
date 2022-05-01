import React, {useEffect, useState} from 'react';
import { Typography, Avatar } from "@material-ui/core";

function PersonDetail(props) {

    return (
        <div>
            <Avatar/><Typography>{props.person.firstName}</Typography>
        <Typography>Prijmeni {props.person.lastName}</Typography>
        <Typography>Email {props.person.email}</Typography>
        <Typography>Phone {props.person.phone}</Typography>
        <Typography>Role {props.person.role}</Typography>
        </div>
    )
}

export default PersonDetail;