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
import { fetchSingleItem, deleteRentalItem } from '../store/actions'
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
}));


function ListItemDetails(props) {
     const params = useParams()
     const { isFetching, singleItem, fetchSingleItem, deleteRentalItem } = props
     const classes = useStyles();
     const history = useHistory()


     useEffect(() =>{
          console.log(params.id)
          fetchSingleItem(params.id)
     }, [])

          //capture 
     const ownerId = parseInt(localStorage.getItem('userId'))
     console.log(ownerId)
     console.log(typeof(singleItem.owner_id))

     const deleteHandler = e => {
          e.preventDefault()
          deleteRentalItem(params.id)
          history.push('/rentals')
     }

     return (
          <React.Fragment>
               <CssBaseline />
               <NavBar />
               <Container maxWidth='md'>
                    <div className={classes.root}>
                         <Paper className={classes.paper}>
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
                                        {
                                             ownerId === singleItem.owner_id ?
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
     { fetchSingleItem, deleteRentalItem }
)(ListItemDetails)