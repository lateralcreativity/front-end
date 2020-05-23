import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
     icon: {
       marginRight: theme.spacing(2),
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
     },
   }));

   const NavBar = () => {
     const classes = useStyles();


        return (
          <React.Fragment>
          <CssBaseline />
          <AppBar position="relative">
            <Toolbar>
              <CameraIcon className={classes.icon} />
              <Typography variant="h6" color="inherit" noWrap>
                NavBar
              </Typography>
            </Toolbar>
          </AppBar>
          </React.Fragment>
        )
   }

   export default NavBar