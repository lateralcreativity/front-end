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
       alignItems: 'center',
       justifyContent: 'center'
     },
     cardMedia: {
       paddingTop: '56.25%', // 16:9
       boxShadow: '0 4px 12px 0px rgba(0,0,0,.25)',
       width: '98%',
       border: '1px',
       borderRadius: '5px',
     },
     cardContent: {
       flexGrow: 1,
     },
     cardActions: {
       display: 'flex',
       justifyContent: 'center',
       marginBottom: '2%',
     }
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
                    image='https://icons.iconarchive.com/icons/martz90/circle-addon2/512/computer-icon.png'
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h4" component="h2">
                      {listItem.name}
                    </Typography>
                    <Typography gutterBottom variant='h6'>
                      {listItem.description}
                    </Typography>
                    <Typography>
                      Price/Day: ${listItem.price_per_day_in_dollars}
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.cardActions}>
                    <Button size="large" color="secondary" id={listItem.id} variant='contained' onClick={viewDetails}>
                      <span id={listItem.id}>
                        View Item Details
                      </span>
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

     )
}

export default ListItem