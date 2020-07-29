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
import translation from '../../../Translation.json'
import Snackbar from '../../UI/Snackbar/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {useDispatch} from 'react-redux'
export default function CardsForVolunteers(props) {
  const [CardContent, setCardContent] = useState(null);
  const [lang, setLang] = useState(props.matchParams.lang ? props.matchParams.lang : 'ru')
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  const [ava, setAva] = useState(null);
  const [approveVol, setVolApprove] = useState(false)
  const [approveRate, setRateApprove] = useState(false)
  const [notStat,setStatNotification]=useState('not set')
  const dispatch=useDispatch();
  useEffect(() => {
    setCardContent(props.cardData);
    setLang(props.matchParams.lang ? props.matchParams.lang : 'ru')

    if (props.cardData.avatar) {
      setAva(props.cardData.avatar)
    }
    else {
      setAva(userImg)
    }
  }, [props.cardData], [props.matchParams.lang]);
 const handleError=()=>{
    setError(true)
  }
 const handleClose = () => {
    
    setError(false)
  };
  const handleAcceptComment = () => {
    axios.post(`/volunteers/notifications/rating/${CardContent.id}`, {}, {
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
  const handleAccept = (status) => {
    axios.post(`/volunteers/notifications/invite/${CardContent.id}`, {agree:status}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('auth')}` }
    })
      .then(res => {
        // alert(res.data);
        if(res.data.message && res.data.status && res.data.message==='Success')
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
        //setVolApprove(true);
      })
      .catch(err => {
        setMessage(err.message)
        setError(true)
      })
  }
 
  return (
    <Aux>
      {CardContent && CardContent.note_type === 'invite' ?
        <Card cardType="col-6">
          <div className={style.InfoStatus}>
            <p>{translation.coordinatorInvite[lang]}</p>
            <p className={style.deadline}>{moment(CardContent.deadline).format('DD-MM-YYYY ')}</p>
          </div>
          {/* <div className={style.MembersInfo}> */}
            <div style={{ width: '100%' }}>
              <h3>{CardContent.title}</h3>
              <ShowMore {...props}>
                <p className={style.info}>
                  {CardContent.description}
                </p>
              </ShowMore>
            </div>
          {/* </div> */}
          <div className={style.Buttons}>
            <Button btnType="Grey7" disabled={approveVol} clicked={()=>handleAccept(false)}>
              {translation.reject[lang]}
            </Button>
            {
              approveVol ?
                <Button btnType="Grey7" disabled={true}>
                  {translation.accepted[lang]}
                </Button> :
                <Button btnType="Yellow" clicked={()=>handleAccept(true)}>
                  {translation.accept[lang]}
                </Button>
            }
          </div>
        </Card> : CardContent && CardContent.note_type === 'rate' ?
          <Card cardType="col-6">
            <div className={style.InfoStatus}>
              <p>{translation.requesterRated[lang]}</p>
              <p className={style.deadline}> {moment(CardContent.deadline).format('DD-MM-YYYY ')}</p>
            </div>
            <h3>{CardContent.title}</h3>
            <div className={style.RateStat}>
              <Rated rate={CardContent.rate} size={35} />
            </div>
            <p className={style.commentTile}>{translation.comments[lang]}</p>
            <p className={style.comment}>{CardContent.comment}</p>
            <div className={style.AcceptBtn}>
              {approveRate ?
                <Button btnType="Grey7" disabled={true}>
                  {translation.accepted[lang]}
                </Button>
                : <Button btnType="Grey" clicked={handleAcceptComment}>
                  {translation.accept[lang]} 
                </Button>
              }
            </div>
          </Card> : ' '
      }
  <Snackbar open={error} handleOpen={handleError} handleClose={handleClose}>
          <Alert elevation={6} variant="filled" onClose={handleClose} severity="error">{translation.error[lang]}</Alert>
      </Snackbar>
    </Aux>
  );
}