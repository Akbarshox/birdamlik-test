import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';


const useStyles = makeStyles((theme) => ({
   paper: {
      position: 'absolute',
      width: '40%',
      background: " #FFFFFF",
      boxShadow: "0px 5px 10px rgba(204, 204, 204, 0.5)",
      borderRadius: "4px",
      outline: 'none',
      top: '10%',
      left: "50%",
      transform: "translateX(-50%)",
      [theme.breakpoints.down('md')]: {
         width: '60%'
      },
      [theme.breakpoints.down('sm')]: {
         width: '70%'
      },
      [theme.breakpoints.down('xs')]: {
         width: 300,
         // left: 'calc(50% - 250px)'
      },
   },
   scroll: {
      overflowY: 'scroll',
   }
}));


export default function TransitionsModal(props) {
   const classes = useStyles();
   const [open, setOpen] = React.useState(props.open);
   
   useEffect(() => {
      setOpen(props.open)
   }, [props]);
   return (
       <div>
          <Modal
              open={open}
              onClose={props.handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              className={classes.scroll}
          >
             <div className={classes.paper}>
                {props.children}
             </div>
          </Modal>
       </div>
   );
}
