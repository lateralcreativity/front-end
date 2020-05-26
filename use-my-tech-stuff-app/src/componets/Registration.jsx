import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import formSchema from '../validation/formSchema';
import * as yup from 'yup';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Techpal
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: 'red',
    fontWeight: 'bold'
  }
}));

// -------- Initial Form Values -------- 
const initialFormErrors = {
  username: '',
  email: '',
  password: '',
  type: ''
}

const initialFormValues = {
  username: '',
  email: '',
  password: '',
  type: ''
}

const initialDisabled = true;
// -------- Initial Form Values End -------- 

const techPalURL = "https://techpal.herokuapp.com"

export default function Registration() {
  const classes = useStyles();
  const history = useHistory();
  
  // -------- State -------- 
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [disabled, setDisabled] = useState(initialDisabled)
  // -------- State Ends -------- 

  // -------- Handlers -------- 
  function registrationHandler(event) {
    event.preventDefault();
    axios
      .create({ headers: {'Content-Type': 'application/json'} })
      .post(`${techPalURL}/api/auth/register`, formValues)
      .then(response => {
        console.log(response)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userId', response.data.data.id)
        history.push(`/`)
      })
      .catch(err => {
        console.log(err)
      })
    setFormValues(initialFormValues)
  }

  useEffect(() => {
    console.log(formValues)
  },[formValues])

  function inputHandler(event) {
    const name = event.target.name;
    const value = event.target.value;

    yup
    .reach(formSchema, name)
    .validate(value)
    .then(valid => {
      setFormErrors({
        ...formErrors,
        [name]: ''
      })
    })
    .catch(error => {
      setFormErrors({
        ...formErrors,
        [name]: error.errors[0]
      })
    })

    setFormValues({
      ...formValues,
      [name]: value
    })
  }
  // -------- Handlers End -------- 

  // -------- Disable Submit Checker -------- 
  useEffect(() => {
    formSchema.isValid(formValues)
      .then(valid => {
        setDisabled(!valid)
      })
  }, [formValues])
  // ---------------------------------------- 

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>

        {/* -------- Form Errors Render --------  */}
        <Typography className={classes.error} component="p">
          {formErrors.username}
        </Typography>
        <Typography className={classes.error} component="p">
          {formErrors.email}
        </Typography>
        <Typography className={classes.error} component="p">
          {formErrors.password}
        </Typography>
        {/* -------- Form Errors Render Ends --------  */}

        <form className={classes.form} onSubmit={registrationHandler} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                value={formValues.username}
                onInput={inputHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formValues.email}
                onInput={inputHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formValues.password}
                onInput={inputHandler}
              />
            </Grid>
            <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Account Type</FormLabel>
              <RadioGroup aria-label="type" name="type" value={formValues.type} onChange={inputHandler}>
                <FormControlLabel value="owner" control={<Radio />} label="Owner" />
                <FormControlLabel value="renter" control={<Radio />} label="Renter" />
              </RadioGroup>
            </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={disabled}
          >
            Sign Up
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}