import React, { useState, useEffect } from 'react';
import style from './CardsForVolunteers.module.css';
import Aux from '../../../hoc/Wrapper';
import Card from '../../UI/Card/Card';
import Button from '../../UI/Buttons/Buttons';
import ShowMore from '../../UI/ShowMore/ShowMore.js'
import moment from "moment";
import Snackbar from '../../UI/Snackbar/Snackbar'
import Alert from '@material-ui/lab/Alert';
import axios from '../../../API/api';
import translation from '../../../Translation.json'
import {useDispatch} from 'react-redux'
export default function CardsForVolunteers(props) {
  const [CardContent, setCardContent] = useState(null);
  const [lang, setLang] = useState(props.matchParams.lang ? props.matchParams.lang : 'ru')
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [join, setJoin] = useState(false);
  const dispatch=useDispatch();
  // const [StatusType, setStatusType]=useState(null)
  useEffect(() => {
    setCardContent(props.cardData);
    setLang(props.matchParams.lang ? props.matchParams.lang : 'ru')

  }, [props.cardData], [props.matchParams.lang]);

  const handleError = () => {
    setError(true)
  }
  const handleSuccess = () => {
    setSuccess(true)
  }

  const handleClose = () => {
  
    setError(false);
    setSuccess(false);
  }
  const handleJoin = () => {
    axios.post(`/volunteers/group/post/${CardContent.id}`,{},{
      headers: { Authorization: `Bearer ${localStorage.getItem('auth') }`}
      })
      .then(res=>{
        // console.log(res)
        setJoin(true);
        dispatch({
          type: "MAINDATA",
          info: {
            updateComponent:true
          }
      });
      })
      .catch(err=>{
        setMessage(err.message)
        setError(true)
      })
  }
  const handleCancelJoin = () =>{
    axios.post(`/volunteers/group/post/refuse/${CardContent.id}`,{},{
      headers: { Authorization: `Bearer ${localStorage.getItem('auth') }`}
      })
      .then(res=>{
        // console.log(res)
        setJoin(false);
        dispatch({
          type: "MAINDATA",
          info: {
            updateComponent:true
          }
      });
      })
      .catch(err=>{
        setMessage(err.message)
        setError(true)
      })
  }
  return (
    <Aux>
      {CardContent ?
        <Card cardType="col-6">
          <h3>{CardContent.title}</h3>
          <p className={style.deadline}>{translation.cardDeadline[lang]} {moment(CardContent.deadline).format('DD-MM-YYYY')}</p>
          <ShowMore {...props}>
            <p className={style.info}>
              {CardContent.description}
            </p>
          </ShowMore>
          {CardContent.status === 'pending' ?
            <div className={style.bottomInfo}>
              <div>
                <p className={style.NumofVolunteers}>{translation.volunteers[lang]}<span> {CardContent.gathered}</span> / <span> {CardContent.count}</span></p>
                <p className={style.status + " " + style.InProccess}>  {translation.inProcess[lang]}</p>
              </div>
              <div>
                {
                  CardContent.invited || join ?
                    <Button btnType='Grey7' disabled={true} >
                      {translation.cancelRequest[lang]}
                    </Button> :
                    <Button btnType={CardContent.gathered === CardContent.count ? 'Grey7' : 'Grey'} disabled={CardContent.gathered === CardContent.count} clicked={handleJoin} >
                      {translation.subscribe[lang]}
                    </Button>
                }
              </div>
            </div> : CardContent.status === 'gathering' ?
              <div className={style.bottomInfo}>
                <div>
                  <p className={style.NumofVolunteers}>{translation.volunteers[lang]}<span> {CardContent.gathered}</span> / <span> {CardContent.count}</span></p>
              <p className={style.status + " " + style.InProccess}> {translation.inProcess[lang]}</p>
                </div>
                <div>
                  {
                    CardContent.invited || join ?
                      <Button btnType='Grey7' clicked={handleCancelJoin} disabled={CardContent.gathered === CardContent.count}>
                        {translation.cancelRequest[lang]}
                      </Button> :
                      <Button btnType={CardContent.gathered === CardContent.count ? 'Grey7' : 'Grey'} disabled={CardContent.gathered === CardContent.count} clicked={handleJoin} >
                        {translation.subscribe[lang]}
                      </Button>
                  }
                </div>
              </div> :
              <div className={style.bottomInfo}>
                <div>
                <p className={style.NumofVolunteers}>{translation.finished[lang]}</p>
                </div>
                <div>
                  <Button btnType='Grey7' disabled={true} >
                    {translation.subscribe[lang]}
                  </Button>
                </div>
              </div>
          }
        </Card> : ' '}
      <Snackbar open={success} handleOpen={handleSuccess} handleClose={handleClose}>
        <Alert elevation={6} variant="filled" onClose={handleClose} severity="success">{translation.successfullyreistered[lang]}</Alert>
      </Snackbar>
      <Snackbar open={error} handleOpen={handleError} handleClose={handleClose}>
        <Alert elevation={6} variant="filled" onClose={handleClose} severity="error">{translation.error[lang]}</Alert>
      </Snackbar>
    </Aux>
  );
}