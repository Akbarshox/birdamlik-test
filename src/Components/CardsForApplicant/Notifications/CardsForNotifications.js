import React, { useState, useEffect } from 'react';
import style from './CardsForNotifications.module.css';
import Aux from '../../../hoc/Wrapper';
import Card from '../../UI/Card/Card';
import Button from '../../UI/Buttons/Buttons';
import ShowMore from '../../UI/ShowMore/ShowMore'
import translations from '../../../Translation.json'
import Rated from '../../StarRating/Rated'
import userImg from '../../../assets/icons/user.svg';
import axios from '../../../API/api'
import moment from 'moment'
import Snackbar from '../../UI/Snackbar/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {useDispatch} from 'react-redux'

export default function CardsForNotifications(props) {
  const [CardContent, setCardContent] = useState(null);
  const [lang, setLang] = useState(props.matchParams.lang ? props.matchParams.lang : 'ru')

  const [ava, setAva] = useState(null);
  const [approveAssign, setApproveAssign] = useState(false)
  const [approveRate, setRateApprove] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState(null);
  const [notStat,setStatNotification]=useState('not set')
  const dispatch=useDispatch();
  
  useEffect(() => {
    setCardContent(props.cardData);
    setLang(props.matchParams.lang ? props.matchParams.lang : 'ru')
    if (props.cardData.avatar ) {
      if((props.cardData.avatar).includes('https://api.birdamlik.uz'))
      setAva(props.cardData.avatar)
      else{
        setAva(`https://api.birdamlik.uz${props.cardData.avatar}`)
      }
    }
    else if(props.cardData.group_avatar){
      if((props.cardData.group_avatar).includes('https://api.birdamlik.uz'))
      setAva(props.cardData.group_avatar)
      else{
        setAva(`https://api.birdamlik.uz${props.cardData.group_avatar}`)
      }
    }
    else {
      setAva(userImg)
    }
  }, [props.cardData], [props.matchParams.lang]);

  const handleAcceptComment = () => {
    axios.post(`/requesters/notifications/rating/${CardContent.id}`, {}, {
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
        setRateApprove(true);
      })
      .catch(err => {
       setMessage(err.message)
        setError(true)
      })

  }
  const handleAccept = () => {
    axios.post(`/requesters/notifications/assignment/${CardContent.id}`, {}, {
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

  const handleError=()=>{
    setError(true)
  }
  const handleClose = () => {
    setError(false)
  };
  return (
    <Aux>
      {CardContent && CardContent.note_type === 'assignment' ?
        <Card cardType="col-6">
          <div className={style.InfoStatus}>
            {/* <p>{translations.acceptfromvol[lang]}</p> */}
            <p className={style.deadline}>{moment(CardContent.deadline).format('DD-MM-YYYY ')}</p>
          </div>
          <div className={style.MembersInfo}>
            <img src={ava}  className={style.ava} />
            <div style={{ width: '100%' }}>
              <h3>{CardContent.group_title}</h3>
              <ShowMore {...props}>
                <p className={style.info}>
                  {CardContent.group_description}
                </p>
              </ShowMore>
              <div >
                <p className={style.contacts} > <span> {translations.fio[lang]}</span> : {CardContent.coordinator_fio}</p>
                <p className={style.contacts} >
                  {CardContent.coordinator_email ? <div> <span> {translations.email[lang]}</span> : {CardContent.coordinator_email}</div> : ' '}
                </p>
                <p className={style.contacts} > <span> {translations.number[lang]}</span> : <a href={`tel: ${CardContent.coordinator_number}`}> {CardContent.coordinator_number.replace(/\D+/g, '').replace(/(\d{3})(\d{2})(\d{3})(\d{4})/, '+ ($1) $2 $3 $4')}</a> </p>
              </div>
            </div>
          </div>
          <div className={style.Buttons}>
            {
              approveAssign ?
                <Button btnType="Grey7" disabled={true}>
                  {translations.accepted[lang]}
                </Button> :
                <Button btnType="Grey" clicked={handleAccept} >
                  {translations.accept[lang]}
                </Button>
            }
          </div>
        </Card> : CardContent && CardContent.note_type === 'rate' ?
          <Card cardType="col-6">
            <div className={style.InfoStatus}>
              <p>{translations.coordinatorRated[lang]}</p>
              <p className={style.deadline}> {moment(CardContent.deadline).format('DD-MM-YYYY')}</p>
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
              <Snackbar open={error} handleOpen={handleError} handleClose={handleClose}>
                <Alert elevation={6} variant="filled" onClose={handleClose} severity="error">{translations.error[lang]}</Alert>
            </Snackbar> 
            </div>
          </Card> : ' '
      }

    </Aux>
  );
}