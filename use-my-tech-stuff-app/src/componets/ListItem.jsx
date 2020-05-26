import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
     card: {
       height: '100%',
       display: 'flex',
       flexDirection: 'column',
     },
     cardMedia: {
       paddingTop: '56.25%', // 16:9
     },
     cardContent: {
       flexGrow: 1,
     },
   }));



const ListItem = props => {
     const {
          listItem
     } = props

     const classes = useStyles();
     const history = useHistory()

     const viewDetails = e => {
       e.preventDefault()
       history.push(`/rentals/${listItem.id}`)
     }


return (
<Grid item key={listItem.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {listItem.name}
                    </Typography>
                    <Typography>
                      {listItem.description}
                    </Typography>
                    <Typography>
                      Price/Day: ${listItem.price_per_day_in_dollars}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" id={listItem.id} variant='contained' onClick={viewDetails}>
                      <span id={listItem.id}>
                        View
                      </span>
                    </Button>
                    <Button size="small" color="primary">
                    <span>
                      Edit
                    </span>
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

     )
}

export default ListItem