import React, { useState, useEffect } from 'react';
import style from './CardsForNotifications.module.css';
import Aux from '../../../hoc/Wrapper';
import Card from '../../UI/Card/Card';
import Button from '../../UI/Buttons/Buttons';
import ShowMore from '../../UI/ShowMore/ShowMore.js'
import moment from 'moment'
import Rated from '../../StarRating/Rated'
import userImg from '../../../assets/icons/user.svg';
import axios from '../../../API/api'
import translations from '../../../Translation.json'
import Snackbar from '../../UI/Snackbar/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {useDispatch} from 'react-redux';

export default function CardsForVolunteers(props) {
  const [CardContent, setCardContent] = useState(null);
  const [lang, setLang] = useState(props.matchParams.lang ? props.matchParams.lang : 'ru');
  const [ava, setAva] = useState(null);
  const [approveVol, setVolApprove] = useState(false)
  const [approveAssign, setApproveAssign] = useState(false)
  const [approveRate, setRateApprove] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  const [notStat,setStatNotification]=useState('not set')
  const dispatch=useDispatch();
  useEffect(() => {
    setCardContent(props.cardData);
    setLang(props.matchParams.lang ? props.matchParams.lang : 'ru')
    
    if (props.cardData.avatar) {
      if(CardContent.avatar.includes("https://api.birdamlik.uz"))
      setAva(props.cardData.avatar)
      else
      setAva(`https://api.birdamlik.uz${CardContent.avatar}`)
    }
    else {
      setAva(userImg)
    }
  }, [props.cardData,props.matchParams.lang]);

  const handleAcceptComment = () => {
    axios.post(`/coordinators/notifications/rating/${CardContent.id}`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('auth')}` }
    })
      .then(res => {
        // console.log(res);
          axios.get(`/${props.matchParams.user==='applicant'?'requester':props.matchParams.user}s/notifications`,{
            headers: {Authorization:`Bearer ${localStorage.getItem('auth')}`}
        })
        .then(res=>{
            dispatch({
              type: "MAINDATA",
              info:{
                  notificationStatus:((res.data.ratings && res.data.ratings.length) || (res.data.requests && res.data.requests.length) || (res.data.invites && res.data.invites.length) || (res.data.assignments && res.data.assignments.length))
              }
            });
            setStatNotification(((res.data.ratings && res.data.ratings.length) || (res.data.requests && res.data.requests.length) || (res.data.invites && res.data.invites.length) || (res.data.assignments && res.data.assignments.length)))
        })
        .catch(err=>{
            // console.log('Notification Error',err)
        });
        setRateApprove(true);

      })
      .catch(err => {
        setMessage(err.message);
       setError(true)
      })
  }
  const handleAccept = (status) => {
    axios.post(`/coordinators/notifications/request/${CardContent.id}`, { agree: status }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('auth')}` }
    })
      .then(res => {
        // console.log(res);
        axios.get(`/${props.matchParams.user==='applicant'?'requester':props.matchParams.user}s/notifications`,{
            headers: {Authorization:`Bearer ${localStorage.getItem('auth')}`}
        })
        .then(res=>{
            dispatch({
              type: "MAINDATA",
              info:{
                  notificationStatus:((res.data.ratings && res.data.ratings.length) || (res.data.requests && res.data.requests.length) || (res.data.invites && res.data.invites.length) || (res.data.assignments && res.data.assignments.length)),
                  updateComponent:true
              }
            });
            setStatNotification(((res.data.ratings && res.data.ratings.length) || (res.data.requests && res.data.requests.length) || (res.data.invites && res.data.invites.length) || (res.data.assignments && res.data.assignments.length)))
        })
        .catch(err=>{
            // console.log('Notification Error',err)
        });
        setVolApprove(true);

      })
      .catch(err => {
       setMessage(err.message);
       setError(true)
      })
  }
  const handleAcceptAssign = (status) => {
    axios.post(`/coordinators/notifications/assignment/${CardContent.id}`, { agree: status }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('auth')}` }
    })
      .then(res => {
        // console.log(res);
        axios.get(`/${props.matchParams.user==='applicant'?'requester':props.matchParams.user}s/notifications`,{
            headers: {Authorization:`Bearer ${localStorage.getItem('auth')}`}
        })
        .then(res=>{
            dispatch({
              type: "MAINDATA",
              info:{
                  notificationStatus:((res.data.ratings && res.data.ratings.length) || (res.data.requests && res.data.requests.length) || (res.data.invites && res.data.invites.length) || (res.data.assignments && res.data.assignments.length)),
                  updateComponent:true
              }
            });
            setStatNotification(((res.data.ratings && res.data.ratings.length) || (res.data.requests && res.data.requests.length) || (res.data.invites && res.data.invites.length) || (res.data.assignments && res.data.assignments.length)))
        })
        .catch(err=>{
            // console.log('Notification Error',err)
        });
        setApproveAssign(true);
      })
      .catch(err => {
       setMessage(err.message);
       setError(true)
      })
  }
  const handleError = () => {
    setError(true)
  }
  const handleClose = () => {
    setError(false);
  }
  
  return (
    <Aux>
      {CardContent && CardContent.note_type === 'request' ?
        <Card cardType="col-6">
          <div className={style.InfoStatus}>
            <p>{translations.acceptfromvol[lang]}</p>
            <p className={style.deadline}>{moment(CardContent.deadline).format('DD-MM-YYYY | h:mm a')}</p>
          </div>
          <div className={style.MembersInfo}>
            <img src={ava}  className={style.ava} />
            <div style={{ width: '100%' }}>
              <h3>{CardContent.fio}</h3>
              <ShowMore {...props}>
                <p className={style.info}>
                  {CardContent.about}
                </p>
              </ShowMore>
            </div>
          </div>
          <div className={style.Buttons}>
            {!approveVol?<Button btnType="Grey7" disabled={approveVol} clicked={() => handleAccept(false)}>
              {translations.reject[lang]}
            </Button>:''}
            {
              approveVol ?
                <Button btnType="Grey7" disabled={true}>
                  {translations.accepted[lang]}
                </Button> :
                <Button btnType="Yellow" clicked={() => handleAccept(true)} >
                  {translations.accept[lang]}
                </Button>
            }
          </div>
          <Snackbar open={error} handleOpen={handleError} handleClose={handleClose}>
              <Alert elevation={6} variant="filled" onClose={handleClose} severity="error">{translations.error[lang]}</Alert>
            </Snackbar>
        </Card> : CardContent && CardContent.note_type === 'rate' ?
          <Card cardType="col-6">
            <div className={style.InfoStatus}>
              <p>{translations.requesterRated[lang]}</p>
              <p className={style.deadline}> {moment(CardContent.deadline).format('DD-MM-YYYY ')}</p>
            </div>
            <h3>{CardContent.title}</h3>
            <div className={style.RateStat}>
              <Rated rate={CardContent.rate} size={35} />
            </div>
            <p className={style.commentTile}>{translations.comments[lang]}</p>
            <p className={style.comment}>{CardContent.comment}</p>
            <div className={style.AcceptBtn}>
              {approveRate ?
                <Button btnType="Grey7" disabled={true}>
                  {translations.accepted[lang]}
                </Button>
                : <Button btnType="Grey" clicked={handleAcceptComment} >
                  {translations.accept[lang]}
                </Button>
              }

            </div>
            <Snackbar open={error} handleOpen={handleError} handleClose={handleClose}>
              <Alert elevation={6} variant="filled" onClose={handleClose} severity="error">{translations.error[lang]}</Alert>
            </Snackbar>
          </Card> :CardContent && CardContent.note_type === 'assignment' ?
        <Card cardType="col-6">
          <div className={style.InfoStatus}>
            <p className={style.deadline}>{moment(CardContent.deadline).format('DD-MM-YYYY')}</p>
          </div>
          <div className={style.MembersInfo}>
            <div style={{ width: '100%' }}>
              <h3>{CardContent.title}</h3>
              <ShowMore {...props}>
                <p className={style.info}>
                  {CardContent.description}
                </p>
              </ShowMore>
              <div style={{ marginTop: '11px' }}>
                  <p className={style.contacts} > <span> {translations.fio[lang]}</span> : {CardContent.requester_fio}</p>
                  <p className={style.contacts} >
                    {CardContent.requester_email ? <div> <span> {translations.email[lang]}</span> : {CardContent.requester_email}</div> : ' '}
                  </p>
                  <p className={style.contacts} > <span> {translations.number[lang]}</span> : <a href={`tel: ${CardContent.requester_number}`}> {CardContent.requester_number.replace(/\D+/g, '').replace(/(\d{3})(\d{2})(\d{3})(\d{4})/, '+ ($1) $2 $3 $4')}</a> </p>
            </div>
            </div>
          </div>
          <div className={style.Buttons}>
          {!approveAssign ?<Button btnType="Grey7" disabled={approveAssign} clicked={() => handleAcceptAssign(false)}>
              {translations.reject[lang]}
            </Button>:''}
            {
              approveAssign ?
                <Button btnType="Grey7" disabled={true}>
                  {translations.accepted[lang]}
                </Button> :
                <Button btnType="Yellow" clicked={() => handleAcceptAssign(true)} >
                  {translations.accept[lang]}
                </Button>
            }
          </div>
          <Snackbar open={error} handleOpen={handleError} handleClose={handleClose}>
              <Alert elevation={6} variant="filled" onClose={handleClose} severity="error">{translations.error[lang]}</Alert>
            </Snackbar>
        </Card> : ' '
      }

    </Aux>
  );
}