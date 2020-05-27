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
import { fetchRentalsList } from '../store/actions'
import { connect } from 'react-redux'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { deleteRentalItem } from '../store/actions'
import { useParams } from 'react-router-dom'

 
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
        marginTop: theme.spacing(2),
    },
    listingContainer: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    root: {
        flexGrow: 1,
        margin: '20%',
    },
    title: {
        fontSize: 14,
    },
    container: {
        minWidth: '100%',
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
}));

const UserProfile = ({ fetchRentalsList }) => {
    const classes = useStyles();
    const params = useParams()
    const [userData,setUserData] = useState([])

    useEffect(() =>{
        const userId = localStorage.getItem(`userId`)
        axiosWithAuth()
        .get(`https://techpal.herokuapp.com/api/users/${userId}`)
        .then(resolve => {
            // console.log(resolve.data)
            setUserData(resolve.data.listings)
        })
        .catch(error => {
            console.log(error, 'Error')
        })
    }, [])

    const ownerId = localStorage.getItem('userId')

    const deleteHandler = e => {
        e.preventDefault()
        deleteRentalItem(params.id)
   }

    return (
        <Container className={classes.container} component="main" maxWidth="xs">
            <CssBaseline />
            
            <div className={classes.paper}>
            <Typography component="p">
                {userData.username}
            </Typography>
            {userData.map(listing => {
                console.log(listing)
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

            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}


export default connect(
    null,
    { fetchRentalsList }
)(UserProfile)