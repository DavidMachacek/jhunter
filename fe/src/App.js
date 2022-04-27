import React, {useEffect } from 'react';
import Persons from './components/Persons.js';
import { useSelector} from "react-redux";

function App() {
    const personId = useSelector((state) => state.persons.id);
    return (
        <div>
            <h1>JHUNTER</h1>
            <Persons/>
            <h3>State is {personId}</h3>
        </div>
    )
}

export default App;