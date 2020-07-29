import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
    width: '100%',
    textTransform: 'capitalize',
    fontFamily: 'Raleway',
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  }}));
export default function TransitionsModal(props) {
  const [open, setOpen] = React.useState(props.open);
  const classes = useStyles();
  useEffect(() => {
    setOpen(props.open)
  }, [props])
  return (
    <div className={classes.root}>
      <Snackbar open={open} anchorOrigin={{vertical:'top', horizontal:'center'}}  autoHideDuration={3000} onClose={props.handleClose}>
        {props.children}
      </Snackbar>
    </div >
  );
}
