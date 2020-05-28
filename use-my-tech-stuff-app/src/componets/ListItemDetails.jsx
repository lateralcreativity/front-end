import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'


import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button'

import NavBar from './NavBar'
import { fetchSingleItem, deleteRentalItem, setIsEditing, rentItem } from '../store/actions'
import { connect } from 'react-redux'


const useStyles = makeStyles((theme) => ({
     root: {
          flexGrow: 1,
          margin: '20%',
     },
     paper: {
          padding: theme.spacing(2),
          margin: 'auto',
          maxWidth: 500,
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
     button: {
          margin: '2%',
     },
     detailsContainer: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
     },
}));


function ListItemDetails(props) {
     const params = useParams()
     const { isFetching, singleItem, fetchSingleItem, deleteRentalItem, setIsEditing, rentItem } = props
     const classes = useStyles();
     const history = useHistory()


     useEffect(() =>{
          console.log(params.id)
          fetchSingleItem(params.id)
     }, [])

          //capture 
     const userId = parseInt(localStorage.getItem('userId'))
     console.log(userId)
     console.log(typeof(singleItem.owner_id))

     const userType = localStorage.getItem('userType')

     const deleteHandler = e => {
          e.preventDefault()
          deleteRentalItem(params.id)
          history.push('/rentals')
     }

     const goToEditing = e => {
          e.preventDefault()
          setIsEditing()
          history.push('/rentyourtech')
     }

     const rentItemHandler = e => {
          e.preventDefault()
          rentItem(userId, singleItem)
          history.push(`/`)
          alert('Item Rented!')
     }

     return (
          <React.Fragment>
               <CssBaseline />
               <Container maxWidth='md'>
                    <div className={classes.root}>
                         <Paper className={classes.paper}>
                              <Grid container spacing={2}>
                                   <Grid item>
                                        <ButtonBase className={classes.image}>
                                             <img className={classes.img} alt="complex" src="https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" />
                                        </ButtonBase>
                                   </Grid>
                                   <Grid item xs={12} sm container className={classes.detailsContainer}>
                                        <Grid item xs container direction="column" spacing={2}>
                                             <Grid item xs>
                                                  <Typography gutterBottom variant="subtitle1">
                                                      {singleItem.name}
                                                  </Typography>
                                                  <Typography variant="body2" gutterBottom>
                                                       {singleItem.description}
                                                  </Typography>
                                                  <Typography variant="body2" color="textSecondary">
                                                       {singleItem.exchange_method}
                                                  </Typography>
                                             </Grid>
                                             
                                        </Grid>
                                        <Grid item>
                                             <Typography variant="subtitle1">${singleItem.price_per_day_in_dollars}/day</Typography>
                                        </Grid>
                                        {//checking if the owner is logged in
                                             userId === singleItem.owner_id ?
                                             <div>
                                        <Button
                                        className={classes.button}
                                        variant='contained'
                                        color='secondary'
                                        onClick={deleteHandler}
                                        id='deleteButton'
                                        >
                                             <span id='deleteButton'>
                                                  Delete Item
                                             </span>
                                        </Button> 

                                        <Button
                                        className={classes.button}
                                        onClick={goToEditing}
                                        id='goToEditingButton'
                                        variant='contained'
                                        color='primary'
                                        >
                                        <span id='goToEditingButton'>
                                             Edit Item
                                        </span>
                                   </Button>
                                        </div>
                                        
                                        
                                        
                                        : null
                                        }
                                        {//check for if the user is a renter or owner
                                             userType === 'renter' ? <div className={classes.button}>
                                                  <Button
                                                       size='large'
                                                       onClick={rentItemHandler}
                                                       variant='contained'
                                                       id='rentItem'
                                                  >
                                                       <span
                                                            id='rentItem'
                                                       >
                                                            Rent Item
                                                       </span>
                                                  </Button>
                                             </div> : null
                                        }
                                   </Grid>
                              </Grid>
                         </Paper>
                    </div>
               </Container>
          </React.Fragment>
     );
}

const mapStateToProps = state => {
     return {
          singleItem: state.singleItem,
          isFetching: state.isFetching
     }
}

export default connect(
     mapStateToProps,
     { fetchSingleItem, deleteRentalItem, setIsEditing, rentItem }
)(ListItemDetails)