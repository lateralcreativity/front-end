import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import GitHubIcon from '@material-ui/icons/GitHub';
import { fetchRentalsList } from '../store/actions'
import { connect } from 'react-redux'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { deleteRentalItem } from '../store/actions'
import { useParams, useLocation } from 'react-router-dom'

 
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
    paper: {
        marginTop: theme.spacing(15)
    },
    listingContainer: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    root: {
        flexGrow: 1,
        margin: '5%',
    },
    title: {
        fontSize: 14,
    },
    container: {
        minWidth: '100%',
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 0
    },
    image: {
        width: 128,
        height: 128,
   },
   img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6)
    }
}));

const UserProfile = ({ fetchRentalsList }) => {
    const classes = useStyles();
    const params = useParams()
    const location = useLocation()
    const [userData, setUserData] = useState({})
    const [listingsData, setListingsData] = useState([])

    useEffect(() =>{
        const userToGet = location.pathname.includes('myprofile') ? localStorage.getItem(`userId`) : params.id
        axiosWithAuth()
        .get(`https://techpal.herokuapp.com/api/users/${userToGet}`)
        .then(resolve => {
            // console.log(resolve.data)
            setUserData(resolve.data.user)
            setListingsData(resolve.data.listings)
        })
        .catch(error => {
            console.log(error, 'Error')
        })
    }, [])

    const ownerId = localStorage.getItem('userId')

    const deleteHandler = e => {
        e.preventDefault()
   }

    return (
        <Container className={classes.container} component="main" maxWidth="xs">
            <CssBaseline />
            
            <div className={classes.paper}>
            <Typography component="p">
                My Listings
                <br/>
                <br/>
                {userData.username}
            </Typography>
            <br/>
            <Typography component="p">
                Account Type:
                <br/>
                {userData.type}
            </Typography>
            <br/>
            <Typography component="p">
                Contact:
                <br/>
                {userData.email}
            </Typography>
            
            {listingsData.map(listing => {
                return (
               <Container maxWidth='md' key={listing.id}>
                    <div className={classes.root}>
                         <Paper className={classes.listingContainer}>
                              <Grid container spacing={2}>
                                   <Grid item>
                                        <ButtonBase className={classes.image}>
                                             <img className={classes.img} alt="complex" src="https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" />
                                        </ButtonBase>
                                   </Grid>
                                   <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column" spacing={2}>
                                             <Grid item xs>
                                                  <Typography gutterBottom variant="subtitle1">
                                                      {listing.name}
                                                  </Typography>
                                                  <Typography variant="body2" gutterBottom>
                                                       {listing.description}
                                                  </Typography>
                                                  <Typography variant="body2" color="textSecondary">
                                                       {listing.exchange_method}
                                                  </Typography>
                                             </Grid>
                                        </Grid>
                                        <Grid item>
                                             <Typography variant="subtitle1">${listing.price_per_day_in_dollars}/day</Typography>
                                        </Grid>
                                        {
                                             ownerId == listing.owner_id ?
                                        <Button
                                             onClick={deleteHandler}
                                             id='deleteButton'
                                        >
                                             <span id='deleteButton'>
                                                  Delete Item
                                             </span>
                                        </Button> : null
                                        }
                                   </Grid>
                              </Grid>
                         </Paper>
                    </div>
               </Container>
                )
            })}
            </div>

            <footer className={classes.footer}>
                    <Typography variant="h6" align="center" gutterBottom>
                         Visit our project repo below.
                    </Typography>
                    <Link href="https://github.com/bw-use-my-tech-stuff-one" style={{textDecoration: 'none', color: 'inherit'}}>
                         <GitHubIcon style={{fontSize: '45px'}}></GitHubIcon>
                    </Link>
                    <Copyright />
            </footer>
        </Container>
    );
}


export default connect(
    null,
    { fetchRentalsList }
)(UserProfile)