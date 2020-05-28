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
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { useParams, useLocation, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteRentalItem } from '../store/actions'


 
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
        alignItems: 'center',
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
        padding: theme.spacing(6),
        width: '100%,'
    },
    itemContainer: {
        display: 'flex',
        flexDirection: 'column',
        margin: '2%',
    },
    button: {
        margin: '5%',
        height: '50px',
    },
    itemDetails: {
        boxShadow: '0 1px 2px 1px rgba(0,0,0,.25)',
       border: '1px',
       borderRadius: '5px',
    },
    userDetailsContainer: {
        boxShadow: '0 1px 2px 1px rgba(0,0,0,.25)',
        border: '1px',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'space-evenly',
        margin: '3%',
    }
}));

const UserProfile = ({ fetchRentalsList, deleteRentalItem }) => {
    const classes = useStyles();
    const params = useParams()
    const location = useLocation()
    const history = useHistory()
    const [userData, setUserData] = useState({})
    const [listingsData, setListingsData] = useState([])

    useEffect(() =>{
        const userToGet = location.pathname.includes('myprofile') ? localStorage.getItem(`userId`) : params.id
        axiosWithAuth()
        .get(`https://techpal.herokuapp.com/api/users/${userToGet}`)
        .then(resolve => {
            console.log(resolve.data.listings)
            setUserData(resolve.data.user)
            setListingsData(resolve.data.listings)
        })
        .catch(error => {
            console.log(error, 'Error')
        })
    },[])



    const ownerId = localStorage.getItem('userId')

//     const deleteHandler = e => {
//         e.preventDefault()
//         deleteRentalItem()
//    }

    return (
        <Container className={classes.container} component="main" maxWidth="xs">
            <CssBaseline />
            
            <div className={classes.paper}>
                <h2>Profile</h2>
                <div className={classes.userDetailsContainer}>
                    <Typography component="p">
                        <h4>Username:</h4>
                        <h5>{`${userData.username}`.toUpperCase()}</h5>
                    </Typography>
                    <Typography component="p">
                        <h4>Account Type:</h4>
                        <h5>{`${userData.type}`.toUpperCase()}</h5>
                    </Typography>
                    <Typography component="p">
                        <h4>Contact:</h4>
                        <h5>{`${userData.email}`.toUpperCase()}</h5>
                    </Typography>
                </div>
            
            {listingsData.map(listing => {
                return (
               <Container maxWidth='xl' key={listing.id} className={classes.item}>
                    <div className={classes.root}>
                         <Paper className={classes.listingContainer}>
                              <Grid container spacing={2}>
                                   {/* <Grid item>
                                        <ButtonBase className={classes.image}>
                                             <img className={classes.img} alt="complex" src="https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" />
                                        </ButtonBase>
                                   </Grid> */}
                                   <Grid item xs={12} lg container>
                                            <Grid item xs container direction="column" spacing={2}>
                                                <Grid item xs className={classes.itemDetails}>
                                                    <Typography gutterBottom variant="h6">
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
                                        <Grid item className={classes.button}>
                                             <Typography variant="subtitle1">${listing.price_per_day_in_dollars}/day</Typography>
                                        </Grid>
                                        {
                                             ownerId == listing.owner_id ?
                                             <Button
                                            className={classes.button}
                                            variant='contained'
                                            color='secondary'
                                             onClick={e => {
                                                e.preventDefault() 
                                                deleteRentalItem(listing.id)
                                                history.push('/')
                                             }}
                                             id='deleteButton'
                                        >
                                             <span id='deleteButton'>
                                                  Delete Item
                                             </span>
                                        </Button>                                        
                                        : null
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
    { fetchRentalsList, deleteRentalItem }
)(UserProfile)