import React, {useEffect} from 'react';
import Persons from './components/Persons.js';
import {useSelector} from "react-redux";
import CommunicationList from "./components/CommunicationList";
import Experience from "./components/Experience";
import './css/App.css';
import {AppBar, CssBaseline, Typography, Toolbar, Container, Grid, ThemeProvider} from '@mui/material';
import useStyles from './styles'
import FilterBar from "./components/FilterBar";
import { createTheme } from '@material-ui/core/styles'

function App() {
    const personId = useSelector((state) => state.persons.id);
    const classes = useStyles();

    const theme = createTheme({
        palette: {
            type: 'light',
            primary: {
                main: '#f8bbd0',
                light: '#ffcdd2',
                dark: '#f06292',
            },
            secondary: {
                main: '#f50057',
            },
        },
        typography: {
            body1: {
                fontSize: '1rem',
                fontWeight: 400,
            },
            body2: {
                fontSize: '0.8rem',
                fontWeight: 400,
            },
            h1: {
                fontWeight: 300,
            },
            caption: {
                fontWeight: 400,
            },
            h5: {
                fontWeight: 600,
                fontSize: '1.2rem',
            },
            h4: {
                fontWeight: 700,
            },
            h6: {
                fontWeight: 500,
            },
            subtitle1: {
                fontWeight: 400,
            },
        }
    });

    return (
        <div>
            <ThemeProvider theme={theme}>
            <main>
                <CssBaseline/>
                <AppBar>
                    <Toolbar>
                        <Typography variant="h4">jHunter</Typography>
                        <Container align="right">
                        <FilterBar className={classes.formControl} />
                        </Container>
                    </Toolbar>
                </AppBar>
                <Container className={classes.container} style={{ marginTop: 100 }}>
                    <Grid container>
                        <Grid item xs={6} md={3}>
                            <Persons/>
                        </Grid>
                        <Grid item xs={6} md={9}>
                            <Experience/>
                            <CommunicationList/>
                        </Grid>
                    </Grid>
                </Container>
            </main>
            <footer></footer>
            </ThemeProvider>
        </div>
    )
}

export default App;