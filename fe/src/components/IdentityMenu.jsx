import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Button, Modal, Box, Typography} from '@mui/material';
import {withStyles} from '@mui/styles';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Grid} from "@material-ui/core";
import Chip from '@mui/material/Chip';
import Notifications from "./Notifications";

function IdentityMenu(props) {

    const {classes, user, isAuthenticated, signIn, signOut, changePassword} = props;
    // const {open} = state;
    console.log('isAuthenticated: ' + isAuthenticated);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            {isAuthenticated ?
                (<div>
                    <Grid container alignContent="center">
                        <Grid xs={3}>
                            {/*className={classes.profileButton}*/}
                            <Button variant="contained"
                                    onClick={handleOpen}
                                /*aria-owns={open ? 'menu-list' : null}
                                aria-haspopup="true"
                                onClick={this.menuOpen}*/
                            >
                                <FontAwesomeIcon icon="fa-solid fa-user"/>
                                Profile
                                {/*<AccountIcon className={`${classes.rightIcon} appIcon`}/>*/}
                            </Button>
                        </Grid>
                        <Grid xs={3}>
                            <Button variant="contained"
                                /*aria-owns={open ? 'menu-list' : null}
                                aria-haspopup="true"
                                onClick={this.menuOpen}*/
                                    onClick={signOut}
                                    color="error"
                            >
                                <FontAwesomeIcon icon="fa-solid fa-user"/>
                                SignOut
                                {/*<AccountIcon className={`${classes.rightIcon} appIcon`}/>*/}
                            </Button>
                        </Grid>
                        <Grid xs={6}>
                            <Notifications/>
                        </Grid>
                    </Grid>
                </div>)
                :
                (
                    <Button width="100px" height="100px" onClick={signIn} variant="contained"
                            color="success"><FontAwesomeIcon class="fa-solid fa-user"/> Sign in</Button>
                )
            }


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Ahoj {user && user.profile.preferred_username}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        Tady jsou detaily uzivatele:
                        <ul>
                            <li>Krestni jmeno: {user && user.profile.given_name}</li>
                            <li>Prijmeni: {user && user.profile.family_name}</li>
                        </ul>
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

IdentityMenu.propTypes = {
    userName: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
    signIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired
};

/*export default withStyles(styles)(IdentityMenu);*/
export default IdentityMenu;
