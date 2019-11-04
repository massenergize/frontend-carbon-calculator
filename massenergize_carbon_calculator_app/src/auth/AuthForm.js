import React from 'react';
import history from '../history';
import ReCAPTCHA from 'react-google-recaptcha';
import { VERIFY } from '../api/urls';
import { postJson } from '../actions';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Fields, reduxForm } from 'redux-form';
import { withFirebase } from 'react-redux-firebase';
import { facebookProvider, googleProvider } from '../auth/firebaseConfig';

//styling component
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { CircularProgress } from '@material-ui/core';

const INITIAL_STATE = {
    id: null,
    email: '',
    passwordOne: '',
    passwordTwo: '',
    firstName: '',
    lastName: '',
    form: 1,
    error: '',
}

const style = {
    root: {
        margin: '10vh 0vh',
        padding: '5vh'
    },

    textfield: {
        width: '100%'
    }
}

class SignUpForm extends React.Component {
    state = {
        ...INITIAL_STATE,
    }

    onSubmit = formValues => {
        this.onSignUpSubmit(formValues, 'email_and_pass');
    }
    onSignUpSubmit = (method, formValues) => {

        this.props.firebase.auth().setPersistence(this.props.firebase.auth.Auth.Persistence.SESSION).then(() => {
            switch (method) {
                case 'email_and_pass': {
                    const { email, passwordOne } = formValues;
                    this.signInWithEmailAndPassword(email, passwordOne);
                    break;
                }
                case 'facebook': {
                    this.signInWithFacebook();
                }

                case 'google': {
                    this.signInWithFacebook();
                }
            }
        })
    }
    sendVerificationEmail() {
        this.props.firebase.auth().currentUser.sendEmailVerification();
    }
    signInWithEmailAndPassword = (email, password) => {
        this.props.firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                this.sendVerificationEmail();
                alert("An Email has been sent to you for verification");
                history.push('/');
            })
            .catch(err => {
                this.setState({ error: err.message })
            });
    }
    signInWithGoogle = () => {
        this.props.firebase.auth()
            .signInWithPopup(googleProvider)
            .then(auth => {
                console.log(auth)
                //    history.push('/');
                this.setState({ firstName: auth.profile.given_name, lastName: auth.profile.family_name, email: auth.profile.email, id: auth.profile.id });
            })
            .catch(err => {
                this.setState({ error: err.message });
            });

    }
    signInWithFacebook = () => {
        this.props.firebase.auth()
            .signInWithPopup(facebookProvider)
            .then(auth => {
                console.log(auth);
                this.setState({ ...INITIAL_STATE });
            })
            .catch(err => {
                this.setState({ error: err.message });
            })
    }
    renderPage1() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} ><Typography variant="h3" style={{ fontWeight: 'bold', color: '#8dc63f' }}>{this.props.title}</Typography></Grid>
                    <Grid item xs={12}>
                        {(this.state.error.length !== 0) ? <Typography style={{ color: 'red' }}>{this.state.error}</Typography> : <></>}
                    </Grid>
                    <Grid item xs={12} container spacing={2} direction="row" alignItems="center">
                        <Grid item container md={5} xs={12} alignItems="center" justify="center" >
                            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                                <Fields names={this.props.fieldsName} component={this.props.renderTextFields} />
                            </form>
                        </Grid>
                        <Grid item container justify="center" xs={12} md={1} style={{ color: 'grey', fontFamily: 'sans-serif', fontSize: '5vh', margin: '0vh 2vh' }}>or</Grid>
                        <Grid item xs={12} md={5} direction="column" container>
                            <Grid item >
                                <Button onClick={e => this.onSignUpSubmit('facebook', null)}>Continue with Facebook</Button>
                            </Grid>
                            <Grid item >
                                <Button onClick={e => this.onSignUpSubmit('google', null)}>Continue with Google</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* reuse code */}
                    <Grid item xs={12} >{this.props.question} <Link to={this.props.linkTo}>{this.props.buttonText}</Link></Grid>
                </Grid>
            </Paper>


        );
    }
    renderPage2() {
        const { classes } = this.props;
        if (!this.props.firebase.auth().currentUser.emailVerified) {
            return (
                <Paper className={classes.root}>
                    <Grid container alignItems="center" justify="center" spacing={2}>
                        <Grid item container justify="center" xs={12}>
                            <Typography style={{ fontSize: '3vh' }}>
                                We sent a link to your email address. Please verify your email and sign in to continue.
                            </Typography>
                        </Grid>
                        <Grid container item xs={12} justify="center" direction="row" spacing={2}>
                            <Grid item><Button style={{ color: 'white', backgroundColor: '#8dc63f' }} type="button" onClick={e => this.sendVerificationEmail()}>Resend Verification Email</Button></Grid>
                            <Grid item><Button style={{ backgroundColor: '#8dc63f' }} onClick={() => this.props.firebase.auth().signOut()}><Link style={{ textDecoration: 'none', color: 'white' }} to="/login">Sign In</Link></Button></Grid>
                        </Grid>
                    </Grid>
                </Paper>
            );
        } else {
            return (
                <form>
                    <Fields names={this.props.fieldsName} component={this.props.renderTextFields} />
                    <Button type="submit">Finish Creating Account</Button>
                    <Button onClick={this.deleteFirebaseAccount}>Cancel</Button>
                </form>
            );
        }
    }
    onReCaptchaChange = (value) => {
        if (!value) {
            this.setState({ captchaConfirmed: false });
        }
        console.log(postJson(VERIFY, { 'captchaString': value }))
        // .then(response => {
        //     console.log(response)
        //     if (response.success && response.data.success) this.setState({ 'captchaConfirmed': true });
        // })
    }

    deleteFirebaseAccount = () => {
        this.props.firebase.auth().currentUser.delete();
        this.props.firebase.auth().signOut();
    }

    render() {
        if (!this.props.auth) return <CircularProgress />
        if (this.props.auth.isEmpty || this.props.tryingSignIn) {
            return (
                <div>
                    {this.renderPage1()}
                </div>
            );
        } else {
            return (
                <div>
                    {this.renderPage2()}
                </div>
            );
        }
    }
}


const validate = (formValues) => {
    const errors = {};

    if (!formValues.email) {
        errors.email = 'You must enter an email';
    }

    if (!formValues.password) {
        errors.password = 'You must enter a password';
    }

    if (!formValues.passwordOne) {
        errors.passwordOne = 'You must enter a password';
    }

    if (formValues.passwordTwo !== formValues.passwordOne) {
        errors.passwordTwo = 'The passwords you entered is not match';
    }

    if (!formValues.firstName) {
        errors.firstName = 'You must enter your first name';
    }

    if (!formValues.lastName) {
        errors.lastName = 'You must enter your last name';
    }

    if (!formValues.group) {
        errors.group = 'You must select a group';
    }

    return errors;

}
const mapStateToProps = state => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: 'signUpForm',
    validate,
})(withFirebase(withStyles(style)(SignUpForm))));