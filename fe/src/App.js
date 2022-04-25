import React, {Component} from 'react';
import Contacts from './components/Contacts.js';
import { useSelector } from "react-redux";

export default class App extends Component {
    //https://blog.logrocket.com/react-redux-connect-when-and-how-to-use-it-f2a1edab2013/
    getContactId() {
        const mapStateToProps = state => ({
            idContact: state.idContact
        });
        return mapStateToProps((state) => state.idContact); // <-- select the user state
    }

    render() {
        return (
            <div>
                <h1>JHUNTER</h1>
                <Contacts/>
                <h3>State is {() => this.getContactId()}</h3>
            </div>
        )
    }
}