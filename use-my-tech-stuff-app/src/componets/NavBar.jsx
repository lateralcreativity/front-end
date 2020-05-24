import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
     icon: {
       marginRight: theme.spacing(2),
       verticalAlign: 'middle'
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
     }
   }));

   const NavBar = () => {
     const classes = useStyles();


        return (
          <React.Fragment>
          <CssBaseline />
          <AppBar>
            <Toolbar style={{width: '100%', justifyContent: 'space-between'}}>
              <Typography variant="h6" color="inherit">
              <CameraIcon className={classes.icon}/>
                NavBar
              </Typography>
              <Typography>
                <Button color="inherit" href="/login">Login</Button>
                <Button color="inherit" href="/register">Register</Button>
              </Typography>
            </Toolbar>
          </AppBar>
          </React.Fragment>
        )
   }

   export default NavBar