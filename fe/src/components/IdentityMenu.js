import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Button, Menu, MenuItem} from '@mui/material';
import {withStyles} from '@mui/styles';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

/*const styles = theme => ({
    root: {
        display: 'flex',
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: 2 * theme.spacing.unit,
    },
    profileButton: {
        color: '#ffffff',
        fontWeight: 300,
        fontSize: '1rem',
        textTransform: 'none',
        paddingLeft: '3px',
        paddingRight: '0px',
    },
});*/

class IdentityMenu extends React.Component {

    constructor() {
        super();
        this.state = {
            open: false
        };
    }

    menuOpen = event => {
        this.setState({open: true, anchor: event.currentTarget});
    };

    menuClose = () => {
        this.setState({open: false});
    };

    render() {
        const {classes, userName, isAuthenticated, signIn, signOut, changePassword} = this.props;
        const {open} = this.state;
        console.log('isAuthenticated: ' + isAuthenticated);

        return (
            <div>
                {isAuthenticated ?
                    (<div>
                        {/*className={classes.profileButton}*/}
                        <Button id='menu-profile'
                                /*aria-owns={open ? 'menu-list' : null}
                                aria-haspopup="true"
                                onClick={this.menuOpen}*/
                        >
                            {isAuthenticated && userName}
                            <FontAwesomeIcon class="fa-solid fa-user"/>
                            asdasdasd
                            {/*<AccountIcon className={`${classes.rightIcon} appIcon`}/>*/}
                        </Button>
                        {/*<Menu
                            id="menu-authenticated"
                            anchorEl={this.state.anchor}
                            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                            transformOrigin={{horizontal: 'left', vertical: 'top'}}
                            getContentAnchorEl={null}
                            transitionDuration={0}
                            open={this.state.open}
                            onClose={this.menuClose}
                        >
                            <MenuItem key="placeholder" style={{display: 'none'}}/>
                            <Link to="/account">
                                <MenuItem>
                                    <FontAwesomeIcon class="fa-solid fa-user"/>
                                    <AccountIcon className={classes.leftIcon}/>
                                    Account
                                </MenuItem>
                            </Link>
                            <MenuItem id='menu-change-password' onClick={changePassword}>
                                <FontAwesomeIcon class="fa-solid key"/>
                                <ChangePasswordIcon className={classes.leftIcon}/>
                                Change password
                            </MenuItem>
                            <MenuItem id='menu-sign-out' onClick={event => {
                                this.menuClose();
                                signOut(event);
                            }}>
                                <SignOutIcon className={classes.leftIcon}/>
                                <FontAwesomeIcon class="fa-solid fa-arrow-right-from-bracket"/>
                                Sign out
                            </MenuItem>
                        </Menu>*/}
                    </div>)
                    :
                    (
                        <Button width="100px" height="100px" onClick={signIn}><FontAwesomeIcon class="fa-solid fa-user"/> Sign in</Button>
                    )
                }
            </div>
        );
    }
}

IdentityMenu.propTypes = {
    classes: PropTypes.object.isRequired,
    userName: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
    signIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired
};

/*export default withStyles(styles)(IdentityMenu);*/
export default IdentityMenu;
