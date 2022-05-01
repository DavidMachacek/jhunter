import React, {useEffect} from 'react';
import Persons from './components/Persons.js';
import {useSelector} from "react-redux";
import CommunicationList from "./components/CommunicationList";
import Experience from "./components/Experience";
import './css/App.css';
import {AppBar, CssBaseline, Typography, Toolbar, Container, Grid} from '@mui/material';
import useStyles from './styles'
import FilterBar from "./components/FilterBar";

function App() {
    const personId = useSelector((state) => state.persons.id);
    const classes = useStyles();

    return (
        <div>
            <CssBaseline/>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6">jHunter</Typography>
                    <FilterBar/>
                </Toolbar>
            </AppBar>
            <main>
                <Container className={classes.container}>
                    <Grid container>
                        <Grid item xs={6} md={4}>
                            <Persons id="persons"/>
                        </Grid>
                        <Grid item xs={6} md={8}>
                            <Experience id="exp"/>
                            <CommunicationList idPerson={personId}/>
                        </Grid>
                    </Grid>
                </Container>
            </main>
            <footer></footer>
        </div>
    )
}

export default App;