import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia';
import profilePlaceholderImage from '../images/profile-pic-placeholder.png';


import NavBar from './NavBar'
import ListItem from './ListItem'

function Copyright() {
     return (
          <Typography variant="body2" color="textSecondary" align="center">
               {'Copyright © '}
               <Link color="inherit" href="/">
                    TechPal
      </Link>{' '}
               {new Date().getFullYear()}
               {'.'}
          </Typography>
     );
}

const HomePage = () => {
     const history = useHistory()
     const useStyles = makeStyles((theme) => ({
          icon: {
               marginRight: theme.spacing(2),
          },
          heroContent: {
               backgroundColor: theme.palette.background.paper,
               padding: theme.spacing(8, 0, 6),
               margin: '4%',
          },
          heroButtons: {
               marginTop: theme.spacing(4),
          },
          cardGrid: {
               paddingTop: theme.spacing(8),
               paddingBottom: theme.spacing(8),
               display: 'flex',
               flexDirection: 'column',
          },
          footer: {
               backgroundColor: theme.palette.background.paper,
               padding: theme.spacing(6),
          },
          card: {
               height: '100%',
               display: 'flex',
               margin: '2%',
               alignItems: 'center',
          },
          cardMedia: {
               maxWidth: '300px',
               height: '280px',
               border: '1px',
               borderRadius: '5px',
               boxShadow: '0 4px 12px 0px rgba(0,0,0,.25)',
               margin: '2%'
             },
     }));

     const classes = useStyles();


     const buttonLinkHandler = e => {
          e.preventDefault()
          history.push(`/${e.target.id}`)
     }

     return (
          <React.Fragment>
               <CssBaseline />
               <main>
                    {/* Hero unit */}
                    <div className={classes.heroContent}>
                         <Container maxWidth="sm">
                              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                   Home
                              </Typography>
                              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                                   Something short and leading about the collection below—its contents, the creator, etc.
                                   Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                                   entirely.
                              </Typography>
                         </Container>
                    </div>
                    {/* End hero unit */}


                    <Container className={classes.cardGrid} maxWidth="md">

                         <Card className={classes.card}>
                              <img 
                                   className={classes.cardMedia}
                                   src='https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png'
                                   title="Profile Pic Placeholder"
                              />
                              <Button
                                   type='submit'
                                   variant='contained'
                                   color='secondary'
                                   onClick={buttonLinkHandler}
                                   id='profile'
                                   size='large'
                                   text='Profile'
                              >
                                   <span id='profile'>
                                        Profile
                                   </span>
                              </Button>
                         </Card>
                         <Card className={classes.card}>
                              <img 
                                   className={classes.cardMedia}
                                   src='https://images.unsplash.com/photo-1577375774296-1480089cb555?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80'
                                   title="Profile Pic Placeholder"
                              />
                              <Button
                                   variant='contained'
                                   color='secondary'
                                   onClick={buttonLinkHandler}
                                   id='rentyourtech'
                                   size='large'
                              ><span id='rentyourtech'>
                              Rent Your Tech
          </span></Button>
                         </Card>
                         <Card className={classes.card}>
                              <img
                                   className={classes.cardMedia}
                                   src='https://images.unsplash.com/photo-1546624156-249875babb27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=799&q=80'
                                   title='computer desk setup'
                                   />
                              <Button
                                   size='large'
                                   variant='contained'
                                   color='secondary'
                                   onClick={buttonLinkHandler}
                                   id='rentals'
                              ><span id='rentals'>
                              Rentals List
          </span></Button>
                         </Card>
                    </Container>
               </main>
               {/* Footer */}
               <footer className={classes.footer}>
                    <Typography variant="h6" align="center" gutterBottom>
                         Footer
        </Typography>
                    <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                         Something here to give the footer a purpose!
        </Typography>
                    <Copyright />
               </footer>
               {/* End footer */}
          </React.Fragment>
     );
}


export default HomePage