import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { fetchRentalsList } from '../store/actions'
import { connect } from 'react-redux'

 
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
        marginTop: theme.spacing(15),
        display: 'flex',
        flexDirection: 'column'
    },
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    container: {
        minWidth: '100%'
    },
    listsContainer: {
        display: 'flex',
        justifyContent: 'space-around'
    }
}));

const UserProfile = ({ fetchRentalsList }) => {
    const classes = useStyles();

    useEffect(() =>{
        fetchRentalsList()
    })

    return (
        <Container className={classes.container} component="main" maxWidth="xs">
            <CssBaseline />
            
            <div className={classes.paper}>

            <Typography component="p">
            Username
            </Typography>

            <div className={classes.listsContainer}>
                <div className={'rentalHistory'}>
                        <Typography component="h2">
                            Rental History
                        </Typography>
                        <Card className={classes.root} variant="outlined">
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Item Name
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    Item price per day
                                </Typography>
                                <Typography variant="body2" component="p">
                                    Availability
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">View Listing</Button>
                            </CardActions>
                        </Card>
                    </div>

                    <div className={'watchList'}>
                        <Typography component="h2">
                        Watch List
                        </Typography>
                        <Card className={classes.root} variant="outlined">
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Item Name
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    Item price per day
                                </Typography>
                                <Typography variant="body2" component="p">
                                    Availability
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">View Listing</Button>
                            </CardActions>
                        </Card>
                    </div>
                </div>
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