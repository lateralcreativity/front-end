import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';

import ListItem from './ListItem'

import { connect } from 'react-redux'
import { fetchRentalsList } from '../store/actions'

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

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  topSection: {
    marginTop: '5%',
  }
}));

function RentalsList({ listings, isFetching, fetchRentalsList }) {
  const classes = useStyles();
  const [searchFormValues, setSearchFormValues] = useState('')
  let filteredArr = listings.filter(item => item.name.toLowerCase().includes(searchFormValues))

  function inputHandler( event ) {
    setSearchFormValues(event.target.value)
    // console.log(searchFormValues)
  }

  useEffect(() => {
    fetchRentalsList()
  }, [])

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm" className={classes.topSection}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
               Products for Rent
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              See tech products currently available to rent. View item details to add the item to your rentals list.
            </Typography>
            <TextField 
              id="filled-basic" 
              label="Search" 
              variant="filled"
              fullWidth
              onChange={inputHandler}
            />
          </Container>
        </div>
          {/* End hero unit */}

          
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>

            { searchFormValues === '' ?
              listings.map((listItem) => (
              <ListItem listItem={listItem} key={listItem.id} />
            ))
            :
              filteredArr.map(listItem => (
                <ListItem listItem={listItem} key={listItem.id} />
              ))
            }

          </Grid>
        </Container>
      </main>
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
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    listings: state.listings,
    isFetching: state.isFetching,
  }
}

export default connect(
  mapStateToProps,
  { fetchRentalsList }
)(RentalsList)