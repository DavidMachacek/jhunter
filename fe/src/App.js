import React, {useEffect } from 'react';
import Contacts from './components/Contacts.js';
import { useSelector} from "react-redux";
/*import store from "./slices/store"
import {getContactId} from "./slices/contact"
import {Button} from "@material-ui/core";*/

function App() {
    const contactId = useSelector((state) => state.contacts.id);
    console.log("contact id is " + {contactId})

    return (
        <div>
            <h1>JHUNTER</h1>
            <Contacts/>
            <h3>State is {contactId}</h3>
        </div>
    )
}

export default App;