import React, {useEffect} from 'react';
import Persons from './components/Persons.jsx';
import {useSelector} from "react-redux";
import CommunicationList from "./components/CommunicationList";
import Experience from "./components/Experience";
import './css/App.css';
import {AppBar, CssBaseline, Typography, Toolbar, Container, Grid, ThemeProvider} from '@mui/material';
import useStyles from './styles'
import FilterBar from "./components/FilterBar";
import {createTheme} from '@material-ui/core/styles'
import TaskList from "./components/TaskList";
import PropTypes from 'prop-types';
import {connected} from './slices/connected';
import {signIn, signInSilent, signOut, changePassword} from './slices/identityActions';
import IdentityMenu from "./components/IdentityMenu";
import '../public/jhunter-logo.png';
import mainLogo from '../public/jhunter-logo2.png';

/*

interface PersonIdState {
    personId: Text
}
*/

function App(props) {

    useEffect(() => {
        const {actions, user} = props;
        if (!user) {
            actions.signInSilent().catch(e => console.error(e));
        }

        /*console.log('Token ' + user)
        console.log('Token ' + JSON.stringify(user))*/
        //console.log('Token ' + user.id_token)
        // console.log('Token ' + user.data.id)
    })

    /*const personId = useSelector((state) => state.persons.id);*/
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
                /*fontSize: '1rem',*/
                /*fontWeight: 400,*/
            },
            body2: {
                /*fontSize: '0.8rem',*/
                /*fontWeight: 400,*/
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
                            <Grid container
                                  alignItems="center"
                            >
                                <Grid item xs={3} md={3}>
                                    <img src={mainLogo} height="80"/>
                                    {/*<Typography variant="h4">jHunter</Typography>*/}
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    <IdentityMenu user={props.user}
                                                  isAuthenticated={isAuthenticated(props.user)}
                                                  signIn={props.actions.signIn}
                                                  signOut={props.actions.signOut}
                                                  changePassword={props.actions.changePassword}
                                    />
                                </Grid>
                                <Grid item xs={3} md={3}>
                                    <FilterBar className={classes.formControl}/>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                    <Container className={classes.container} style={{marginTop: 100}} spacing={5}>
                        <Grid container>
                            <Grid container xs={6} md={4}>
                                <Grid item xs={12} md={12}>
                                    <Persons/>
                                </Grid>
                            </Grid>
                            <Grid container alignContent="baseline"xs={6} md={8} spacing={0}>
                                <Grid item xs={12} md={12}>
                                    <Experience/>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <CommunicationList/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} md={12}>
                                <TaskList/>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
                <footer></footer>
            </ThemeProvider>


            <br/>
            <br/>
            <br/>

        </div>
    )
}


const isAuthenticated = (user) => {
    return !!(user && user.profile);
};

const getUserName = (user) => {
    return (user && user.profile && user.profile.preferred_username)
        ? user.profile.preferred_username
        : '';
};

App.propTypes = {
    clientId: PropTypes.string,
    user: PropTypes.object,
    appConfig: PropTypes.object,
    actions: PropTypes.shape({
        signIn: PropTypes.func.isRequired,
        signInSilent: PropTypes.func.isRequired,
        signOut: PropTypes.func.isRequired,
        changePassword: PropTypes.func.isRequired
    })
};

export default connected(App)
    .mappingStateToProps((state) => {
        return {
            clientId: state.appConfig.oauth2.client_id,
            user: state.oidc.user,
            alerts: state.alerts,
            appConfig: state.appConfig
        };
    })
    .mappingActionsToProps({signIn, signInSilent, signOut, changePassword})
    .build();
