import React from 'react';
import AuthForm from './AuthForm';

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';

const style = {
    textfield: {
        width: '100%'
    }
}

class LogInForm extends React.Component {
    isInValid = (meta) => {
        return ((meta.touched && meta.error)) ? true : false;
    }

    displayHelperText = (meta) => {
        if (this.isInValid(meta)) {
            return meta.error
        }
    }
    renderFields = (fields) => {
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
                        {...fields.password.input}
                        error={this.isInValid(fields.password.meta)}
                        helperText={this.displayHelperText(fields.password.meta)}
                        variant="outlined"
                        type="password" required />
                </Grid>
                <Grid item><Button style={{ backgroundColor: '#8dc63f', color: 'white' }} type="submit">Sign In</Button></Grid>
            </Grid>
        )
    }
    render() {
        return (
            <div>
                <AuthForm title="Log In"
                    renderTextFields={this.renderFields}
                    fieldsName={['email', 'password']}
                    tryingSignIn={false}
                    question="Don't Have an Account?"
                    buttonText="Sign Up" linkTo="/signup" />
            </div>

        );
    }
}

export default withStyles(style)(LogInForm);