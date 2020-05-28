import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'

//styling imports
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import backgroundImage from '../images/technology-hero-image.jpg';

//form validation imports
import * as yup from 'yup';
import loginSchema from '../validation/loginSchema';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/bw-use-my-tech-stuff-one/front-end/blob/master/LICENSE" target="_blank">
        TechPal
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

//material UI styling function
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url('${backgroundImage}')`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
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
  password: ''
}

const initialFormValues = {
  username: '',
  password: ''
}

const initialDisabled = true;
// -------- Initial Form Values End -------- 

export default function Login() {
  const classes = useStyles();
    //useHistory for .push
    let history = useHistory()
  // -------- State -------- 
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [disabled, setDisabled] = useState(initialDisabled)
  const [ isLoggingIn, setIsLoggingIn ] = useState(false)
  // -------- State Ends -------- 

  // -------- Handlers -------- 
  function loginHandler(event) {
    event.preventDefault();
    setIsLoggingIn(true)
         // make a POST request to the login endpoint
         // _if_ the creds match what's in the database, the server will return a JSON web token
         // set the token to localStorage (sessions)
         // navigate the user to the "/protected" route
    axiosWithAuth()
      .post('/api/auth/login', formValues)
      .then(response => {
        console.log(response)
          //response.data.payload is the key(token) that comes from server.js
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('userId', response.data.data.id)
          localStorage.setItem('userType', response.data.data.type)
          setIsLoggingIn(false)
          history.push('/')
      })
      .catch(err => {
        console.log(err)
        setIsLoggingIn(false)
      })
    setFormValues(initialFormValues)
  }

  function inputHandler(event) {
    const name = event.target.name;
    const value = event.target.value;

    yup
    .reach(loginSchema, name)
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
    loginSchema.isValid(formValues)
      .then(valid => {
        setDisabled(!valid)
      })
  }, [formValues])
  // ---------------------------------------- 
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          {/* -------- Login Errors Render --------  */}
          <Typography className={classes.error} component="p">
            {formErrors.username}
          </Typography>
          <Typography className={classes.error} component="p">
            {formErrors.password}
          </Typography>
          {/* -------- Login Errors Render Ends --------  */}

          <form className={classes.form} onSubmit={loginHandler} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={formValues.username}
              autoFocus
              onInput={inputHandler}
            />
            <TextField
              variant="outlined"
              margin="normal"
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={disabled}
              onClick={loginHandler}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>

            {isLoggingIn && <CircularProgress />}
            
            <Box mt={5}>
              {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
              Visit our project repo below.
        </Typography>
        <Link href="https://github.com/bw-use-my-tech-stuff-one" target="_blank" style={{textDecoration: 'none', color: 'inherit'}}>
              <GitHubIcon style={{fontSize: '45px'}}></GitHubIcon>
        </Link>
        <Copyright />
      </footer>
      {/* End footer */}
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}