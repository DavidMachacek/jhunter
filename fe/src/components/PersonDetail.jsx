import React, {useEffect, useState} from 'react';
import { Typography, Avatar } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from "@fortawesome/free-solid-svg-icons";
import * as IconsBrands from "@fortawesome/free-brands-svg-icons";
import {library} from "@fortawesome/fontawesome-svg-core";

const iconList = Object.keys(Icons)
    .filter((key) => key !== 'fas' && key !== 'prefix')
    .map((icon) => Icons[icon]);
const iconsBrands = Object.keys(IconsBrands)
    .filter((key) => key !== 'fas' && key !== 'prefix')
    .map((icon) => IconsBrands[icon]);

library.add(...iconList, ...iconsBrands);

function PersonDetail(props) {

    console.log('PersonDetail ' + JSON.stringify(props.person))

    return (
        <div>
            <Avatar/>
            <Typography><FontAwesomeIcon icon="fa-solid fa-person" />{props.person.rowData.firstName} {props.person.lastName}</Typography>
            <Typography><FontAwesomeIcon icon="fa-solid fa-envelope" />{props.person.rowData.email}</Typography>
            <Typography><FontAwesomeIcon icon="fa-solid fa-phone" />{props.person.rowData.phone}</Typography>
            <Typography><FontAwesomeIcon icon="fa-brands fa-linkedin" />{props.person.rowData.linkedIn}</Typography>
        </div>
    )
}

export default PersonDetail;