import React from 'react';
import AuthForm from './AuthForm';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const style = {
    textfield: {
        width: '100%'
    }
}

class SignUpPage extends React.Component {
    isInValid = (meta) => {
        return ((meta.touched && meta.error)) ? true : false;
    }

    displayHelperText = (meta) => {
        if (this.isInValid(meta)) {
            return meta.error
        }
    }

    renderFieldsPage1 = (fields) => {
        const { classes } = this.props;
        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        className={classes.textfield}
                        label="Email"
                        {...fields.email.input}
                        error={this.isInValid(fields.email.meta)}
                        helperText={this.displayHelperText(fields.email.meta)}
                        variant="outlined" required />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        className={classes.textfield}
                        label="Password"
                        {...fields.passwordOne.input}
                        error={this.isInValid(fields.passwordOne.meta)}
                        helperText={this.displayHelperText(fields.passwordOne.meta)}
                        variant="outlined"
                        type="password" required />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        className={classes.textfield}
                        label="Confirm Your Password"
                        {...fields.passwordTwo.input}
                        error={this.isInValid(fields.passwordTwo.meta)}
                        helperText={this.displayHelperText(fields.passwordTwo.meta)}
                        variant="outlined"
                        type="password" required /></Grid>

                <Grid item><Button style={{ backgroundColor: '#8dc63f', color: 'white' }} type="submit">Sign Up</Button></Grid>
            </Grid>
        )
    }

    renderFieldsPage2 = (fields) => {
        const { classes } = this.props;
        return (
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <TextField
                        className={classes.textfield}
                        label="First Name"
                        {...fields.firstname.input}
                        error={this.isInValid(fields.firstname.meta)}
                        helperText={this.displayHelperText(fields.firstname.meta)}
                        variant="outlined" required />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        className={classes.textfield}
                        label="Last Name"
                        {...fields.lastname.input}
                        error={this.isInValid(fields.lastname.meta)}
                        helperText={this.displayHelperText(fields.lastname.meta)}
                        variant="outlined" required />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        className={classes.textfield}
                        select
                        label="Group"
                        {...fields.group.input}
                        error={this.isInValid(fields.group.meta)}
                        helperText={this.displayHelperText(fields.group.meta)}
                        variant="outlined"
                        required
                    >
                        <MenuItem key={"empty"} value=""></MenuItem>
                        {this.props.groups.map(group => (
                            <MenuItem key={group.name} value={group.name}>
                                {group.displayname}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>
        )
    }

    render() {
        if (this.props.auth.isEmpty) {
            return (
                <div>
                    <AuthForm
                        title="Register with Email and Password"
                        renderTextFields={this.renderFieldsPage1}
                        fieldsName={['email', 'passwordOne', 'passwordTwo']}
                        tryingSignIn={false}
                        question="Already Have an Account?"
                        buttonText="Sign In" linkTo="login" />
                </div>
            );
        } else {
            return (
                <div>
                    <AuthForm
                        renderTextFields={this.renderFieldsPage2}
                        fieldsName={['firstname', 'lastname', 'group']} />
                </div>
            )
        }

    }

}

const mapStateToProps = state => {
    return {
        groups: Object.values(state.events)[0].groups,
        auth: state.firebase.auth,
    }
}
export default connect(mapStateToProps)(withFirebase(withStyles(style)(SignUpPage)));