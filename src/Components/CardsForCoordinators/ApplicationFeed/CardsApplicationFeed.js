import React, { useState, useEffect } from 'react';
import style from './CardsForApplicationFeed.module.css';
import Aux from '../../../hoc/Wrapper';
import Card from '../../UI/Card/Card';
import Button from '../../UI/Buttons/Buttons';
import ShowMore from '../../UI/ShowMore/ShowMore'
import Snackbar from '../../UI/Snackbar/Snackbar'
import Alert from '@material-ui/lab/Alert';
import axios from '../../../API/api';
import moment from "moment";
import { toInteger } from 'lodash';
import translations from '../../../Translation.json'
import {useDispatch} from 'react-redux'

export default function AppsFeedCoordinator(props) {
  const [CardContent, setCardContent] = useState(null);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [lang, setLang] = useState(props.matchParams.lang ? props.matchParams.lang : 'ru')
  const dispatch=useDispatch();
  useEffect(() => {
    setCardContent(props.cardData);
    setLang(props.matchParams.lang ? props.matchParams.lang : 'ru')

  }, [props.cardData], [props.matchParams.lang]);
  const handleShared = () => {
    if (!CardContent.shared) {
      let Data = {};
      Data.post = toInteger(CardContent.id);
      axios.post('/coordinators/post/share/', Data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('auth')}` }
        })
        .then(res => {
          // console.log(res)
          dispatch({
            type: "MAINDATA",
            info: {
              updateComponent:true
            }
         })
          setSuccess(true)
        })
        .catch(err => {
          setMessage(err.message)
          setError(true)

        })
    }
  }
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
  return (
    <Aux>
      {CardContent ?
        <Card cardType="col-6">
          <h3>{CardContent.title}</h3>
          <p className={style.deadline}>{translations.cardDeadline[lang]}  {moment(CardContent.deadline).format('DD-MM-YYYY')}</p>
          <ShowMore {...props}>
            <p className={style.info}>
              {CardContent.description}
            </p>
          </ShowMore>
          <div style={{ marginTop: '11px' }}>
              <p className={style.contacts} > <span> {translations.fio[lang]}</span> : {CardContent.fio}</p>

              <p className={style.contacts} >
                {CardContent.volunteer_email ? <div> <span> {translations.email[lang]}</span> : {CardContent.requester_email}</div> : ' '}
              </p>
              <p className={style.contacts} > <span> {translations.number[lang]}</span> : <a href={`tel: ${CardContent.requester_number}`}> {CardContent.requester_number.replace(/\D+/g, '').replace(/(\d{3})(\d{2})(\d{3})(\d{4})/, '+ ($1) $2 $3 $4')}</a> </p>
            </div>
          {
            CardContent.status === 'finished' ?
              <div className={style.bottomInfo}>
                <div>
                  <p className={style.NumofVolunteers}>{translations.volunteers[lang]} {CardContent.count}</p>
                  <p className={style.status + " " + style.Finished}> {translations.hasSend[lang]}</p>
                </div>
                <div>
                  {
                    CardContent.shared ?
                      <Button btnType="passiveButton" disabled={true} >
                        {translations.posted[lang]}
                      </Button> :
                      <Button btnType={(CardContent.gathered === CardContent.count) ? "Grey7" : 'Grey'} disabled={CardContent.gathered === CardContent.count} >
                        {translations.postbyme[lang]}
                      </Button>
                  }
                </div>
              </div> :
              // gathering or pending
              <div className={style.bottomInfo}>
                <div>
                  <p className={style.NumofVolunteers}>{translations.volunteers[lang]}  <span>{CardContent.gathered} </span>/ <span>{CardContent.count}</span></p>
                  <p className={style.status + " " + style.InProccess}> {translations.inProcess[lang]}</p>
                </div>
                <div>
                  {
                    CardContent.shared ?
                      <Button btnType="Grey7" disabled={true} >
                        {translations.posted[lang]}
                      </Button> :
                      CardContent.gathered === CardContent.count ?
                        <Button btnType={'Grey7'} disabled={true} >
                          {translations.postbyme[lang]}
                        </Button> :
                        <Button btnType={'Grey'} clicked={handleShared}>
                          {translations.postbyme[lang]}
                        </Button>
                  }
                </div>
              </div>
          }
        </Card> : ' '}
      <Snackbar open={success} handleOpen={handleSuccess} handleClose={handleClose}>
        <Alert elevation={6} variant="filled" onClose={handleClose} severity="success">{translations.shared[lang]}</Alert>
      </Snackbar>
      <Snackbar open={error} handleOpen={handleError} handleClose={handleClose}>
        <Alert elevation={6} variant="filled" onClose={handleClose} severity="error">{translations.error[lang]}</Alert>
      </Snackbar>
    </Aux>
  );
}