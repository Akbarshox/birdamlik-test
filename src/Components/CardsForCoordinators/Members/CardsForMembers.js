import React, { useState, useEffect } from 'react';
import style from './CardsForMembers.module.css';
import Aux from '../../../hoc/Wrapper';
import Card from '../../UI/Card/Card';
import stars from '../../../assets/icons/BlackStar.svg';
import Button from '../../UI/Buttons/Buttons'
import ShowMore from '../../UI/ShowMore/ShowMore.js'
import axios from '../../../API/api'
import userImg from '../../../assets/icons/user.svg';
import translation from '../../../Translation.json'
import Snackbar from '../../UI/Snackbar/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';

export default function CardsForMembers(props) {
  const [CardContent, setCardContent] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  const [ava, setAva] = useState(null);
  const [lang, setLang] = useState(props.matchParams.lang ? props.matchParams.lang : 'ru')
  const [open, setDialogOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setCardContent(props.cardData);
    setLang(props.matchParams.lang ? props.matchParams.lang : 'ru')

    if (props.cardData.avatar) {
      setAva(props.cardData.avatar)
    }
    else {
      setAva(userImg)
    }
  }, [props.cardData, props.matchParams.lang]);
  const handleRemove = () => {
    axios.post(`/coordinators/group/remove/${CardContent.id}/`, {},
      { headers: { Authorization: `Bearer ${localStorage.getItem('auth')}` } })
      .then(res => {
        // console.log(res)
        if (res.data.message === 'Success' && res.data.status) {
          setSuccess(true);
        }
        else {
          setError(true)
        }
        // res.data=  {message: "Success", status: true}
      })
      .catch(err => {
        setMessage(err.message)
        setError(true)
      })
  }
  const handleOpen = () => {
    setDialogOpen(true)
  }
  const handleSuccess = () => {
    setSuccess(true)
  }
  const handleError = () => {
    setError(true)
  }
  const handleClose = () => {
    setDialogOpen(false);
    setError(false);
    setSuccess(false)
    if (success)
      dispatch({
        type: "MAINDATA",
        info: {
          updateComponent: true
        }
      })
  }
  const handleImg = (e) => {
    let img = ''
    if (CardContent.avatar) {
      if ((CardContent.avatar).includes("http://api.birdamlik.uz")) {
        img = CardContent.avatar
      }
      else {
        img = `http://api.birdamlik.uz${CardContent.avatar}`
      }
    }
    else {
      img = userImg;
    }
    setAva(img)
  }
  const formatPhone = (phone) => {

  }
  return (
    <Aux>
      {CardContent ?
        <Card cardType="col-6">
          <div className={style.MembersInfo}>
            <img src={ava} onError={e => handleImg(this)} className={style.ava} />
            <div style={{ width: '100%' }}>
              <div className={style.top}>
                <div>
                  <h3>{CardContent.fio}</h3>
                  <p className={style.title}>
                    {/* Герой •  */}
                    <span className={style.stars}>
                      <img src={stars} /> {CardContent.star_total}
                    </span>
                  </p>

                </div>
                <Button btnType="Grey" clicked={handleOpen}>
                  {translation.remove[lang]}
                </Button>
              </div>
              <ShowMore {...props}>
                <p className={style.info}>
                  {CardContent.about}
                </p>
              </ShowMore>
              <div style={{ marginTop: '11px' }}>
                <p className={style.contacts} >
                  {CardContent.volunteer_email ? <div> <span> {translation.email[lang]}</span> : {CardContent.volunteer_email}</div> : ' '}
                </p>
                <p className={style.contacts} > <span> {translation.number[lang]}</span> : <a href={`tel: ${CardContent.requester_number}`}> {CardContent.volunteer_number.replace(/\D+/g, '').replace(/(\d{3})(\d{2})(\d{3})(\d{4})/, '+ ($1) $2 $3 $4')}</a></p>
              </div>
            </div>
          </div>
        </Card> : ' '}
      <Snackbar open={success} handleOpen={handleSuccess} handleClose={handleClose}>
      <Alert elevation={6} variant="filled" onClose={handleClose} severity="success">{translation.successfullyreistered[lang]}</Alert>
      </Snackbar>
      <Snackbar open={error} handleOpen={handleError} handleClose={handleClose}>
        <Alert elevation={6} variant="filled" onClose={handleClose} severity="error">{translation.error[lang]}</Alert>
      </Snackbar>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{translation.areYsureRemoveVolunteer[lang]}</DialogTitle>
        <DialogActions>
          <Button clicked={handleClose} btnType="Grey7">
            {translation.cancel[lang]}
          </Button>
          <Button clicked={handleRemove} btnType="Yellow">
            {translation.yes[lang]}
          </Button>
        </DialogActions>
      </Dialog>
    </Aux>
  );
}