import React, { useEffect } from 'react';
import Button from '../UI/Buttons/Buttons';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import translations from "../../Translation";

export default function Agreement(lang) {
   const [open, setOpen] = React.useState(false);
   const [lan, setLang] = React.useState(lang.lang);
   
   useEffect(()=>{
      setLang(lang.lang)
   },[lang.lang])
   const handleClickOpen = () => {
      setOpen(true);
   };
   
   const handleClose = () => {
      setOpen(false);
   };
   
   return (
       <div>
          <span>
             {translations.agreeTerms[lan]}
             <span  style={{color: '#FFD600',cursor:'pointer'}}
                onClick={handleClickOpen}>{translations.agreeTerms.yellow[lan]} </span>
             {translations.agreeTerms.parts[lan]}
          </span>
          <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
          >
             <DialogTitle
                 id="alert-dialog-title"><b>{translations.agreementTitle[lan]}</b></DialogTitle>
             <DialogContent>
                <DialogContentText id="alert-dialog-description">
                   <p>{translations.agreementCon1[lan]}
                   </p>
                   <p>{translations.agreementCon2[lan]}</p>
                  <p>{translations.agreementCon3[lan]}</p> 
                </DialogContentText>
             </DialogContent>
             <DialogActions>
                <Button clicked={handleClose} btnType="Grey7">
                   {translations.readAgreement[lan]}
                </Button>
             </DialogActions>
          </Dialog>
       </div>
   );
}