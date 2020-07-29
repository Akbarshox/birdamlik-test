import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {useSelector, shallowEqual} from 'react-redux';

const theme = createMuiTheme({
   palette: {
      primary: {
         main: '#FFD600',
      }
   }
})

const useStyles = makeStyles({
   root: {
      width: '100%',
      [theme.breakpoints.down(600)]: {
         position: 'absolute',
         zIndex: '10000'
      },
   },
   style: {
      backgroundColor: '#E7E7E7',
      color: '#FFD600',
   }
});

function LinearProgressWithLabel(props) {
   const classes = useStyles();
   return (
       <Box display="flex" alignItems="center">
          <Box width="100%">
             <MuiThemeProvider theme={theme}>
                <LinearProgress variant="determinate" className={classes.style} {...props} />
             </MuiThemeProvider>
          </Box>
       </Box>
   );
}

LinearProgressWithLabel.propTypes = {
   /**
    * The value of the progress indicator for the determinate and buffer variants.
    * Value between 0 and 100.
    */
   value: PropTypes.number.isRequired,
};

export default function Preloader() {
   const classes = useStyles();
   const [progress, setProgress] = React.useState(5);
   
   const { preloader } = useSelector((state => ({...state.mainData})), shallowEqual);
   React.useEffect(() => {
      let timer=null;
      if(preloader)
      {
         timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 5 : prevProgress + 5));
         }, 50);
      }
      else{
         setProgress(5);
      }
      return () => {
         clearInterval(timer);
      };
   }, [preloader]);

   return (
       preloader?<div className={classes.root}>
          <LinearProgressWithLabel value={progress}/>
       </div>:null
   );
}