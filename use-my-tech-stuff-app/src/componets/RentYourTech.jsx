import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import PlusOneOutlinedIcon from '@material-ui/icons/PlusOneOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import rentSchema from '../validation/rentSchema';
import * as yup from 'yup';

import { postItem } from '../store/actions'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'


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
  name:'',
  description:'',
  exchange_method:'',
  price_per_day_in_dollars: '',
}

const initialFormValues = {
  name: '',
  description: '',
  exchange_method: '',
  price_per_day_in_dollars: null,
}

const initialDisabled = true;
// -------- Initial Form Values End -------- 

function RentYourTech(props) {
  const { postItem } = props
  const classes = useStyles();
  const ownerId = localStorage.getItem('userId')
  const history = useHistory()
  
  // -------- State -------- 
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [disabled, setDisabled] = useState(initialDisabled)
  // -------- State Ends -------- 

  // -------- Handlers -------- 
  function submitHandler(event) {
    event.preventDefault();
    postItem(formValues, ownerId)
    history.push('/profile')
    setFormValues(initialFormValues)
  }

  function inputHandler(event) {
    const name = event.target.name;
    const value = event.target.value;

    yup
    .reach(rentSchema, name)
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
    rentSchema.isValid(formValues)
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
          <PlusOneOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add an item to rent out.
        </Typography>

        {/* -------- Form Errors Render --------  */}
        <Typography className={classes.error} component="p">
          {formErrors.name}
        </Typography>
        <Typography className={classes.error} component="p">
          {formErrors.description}
        </Typography>
        <Typography className={classes.error} component="p">
          {formErrors.exchange_method}
        </Typography>
        {/* -------- Form Errors Render Ends --------  */}

        <form className={classes.form} onSubmit={submitHandler} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Item Name"
                autoFocus
                value={formValues.name}
                onInput={inputHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                multiline
                rowsMax={10}
                id="description"
                label="Item Description"
                name="description"
                value={formValues.description}
                onInput={inputHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                multiline
                rowsMax={10}
                name="exchange_method"
                label="Exchange Method"
                id="exchange_method"
                value={formValues.exchange_method}
                onInput={inputHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="price_per_day_in_dollars"
                label="Price Per Day in $"
                id="price_per_day_in_dollars"
                type="number"
                value={formValues.price_per_day_in_dollars}
                onInput={inputHandler}
              />
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
            Submit
          </Button>
        </form>
      </div>
      <Box mt={2}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    state
  }
}

export default connect(
  null,
  { postItem }
)(RentYourTech)