import React, { useState, useEffect } from 'react';
import style from './CardsForMyApps.module.css';
import Aux from '../../../hoc/Wrapper';
import Card from '../../UI/Card/Card';
import Button from '../../UI/Buttons/Buttons';
import Modal from '../../UI/Modal/Modal'
import Rate from '../../StarRating/Rating'
import ShowMore from '../../UI/ShowMore/ShowMore';
import Rated from '../../StarRating/Rated';
import moment from "moment";
import axios from '../../../API/api'
import Snackbar from '../../UI/Snackbar/Snackbar'
import Alert from '@material-ui/lab/Alert';
import translation from '../../../Translation.json'
import Form from '../../Form/Form'
import { useDispatch } from 'react-redux';

export default function MyAppsApplicant(props) {
  const [CardContent, setCardContent] = useState(null);
  const [lang, setLang] = useState(props.matchParams.lang ? props.matchParams.lang : 'ru')

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
const dispatch=useDispatch();
  
  
  useEffect(() => {
    setCardContent(props.cardData);
    setLang(props.matchParams.lang ? props.matchParams.lang : 'ru')
  }, [props.cardData], [props.matchParams.lang]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setError(false);

     setSuccess(false)

  };
  const handleRateChange = (rating) => {
    setRating(rating);
  }
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  }
  const handleError = () => {
    setError(true)
  }
  const handleSuccess = () => {
    setSuccess(true)
  }
  const handleRate = () => {
    if (rating && comment) {
      axios.post(`/requesters/post/${CardContent.id}/rate/`, { rate: rating, comment },
        { headers: { Authorization: `Bearer ${localStorage.getItem('auth')}` } })
        .then(res => {
          // console.log(res)
          
          setOpen(false);
          dispatch({
            type: "MAINDATA",
            info: {
              updateComponent:true
            } });
            setSuccess(true)
        })
        .catch(err => {
          setMessage(err.message)
          setError(true)
        })
    }
    else {
      alert("Fill Rate and Comment");
    }
  }
  const inputsForm= CardContent && CardContent.status==='gathering'?{
  
    title: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: translation.inputRequest[lang]
      },
      label: translation.requestTitle[lang],
      value: CardContent.title,
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      disabled: false
    },
    description: {
      elementType: 'textarea',
      elementConfig: {
        type: 'text',
        placeholder: translation.inputDescription[lang]
      },
      label: translation.describeDetail[lang],
      value: CardContent.description,
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      disabled: false
    },
    count: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: '0'
      },
      label: translation.numVolunteer[lang],
      value: CardContent.count,
      validation: {
        required: true,
        isNumeric: true
      },
      valid: false,
      touched: false,
      disabled: false
    },
    deadline: {
      elementType: 'date',
      elementConfig: {
        type: 'text',
        placeholder:translation.inputDate[lang]
      },
      label: translation.deadline[lang],
      value: CardContent.deadline?CardContent.deadline:new Date(),
      validation: {
       
      },
      valid: false,
      touched: false,
      disabled: false
    }
  }:{}
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
          {CardContent.group?<div style={{ marginTop: '11px' }}>
                <p className={style.contacts} > <span> {translation.fio[lang]}</span> : {CardContent.coordinator_fio}</p>
                <p className={style.contacts} >
                  {CardContent.coordinator_email ? <div> <span> {translation.email[lang]}</span> : {CardContent.coordinator_email}</div> : ' '}
                </p>
                <p className={style.contacts} > <span> {translation.number[lang]}</span> : <a href={`tel: ${CardContent.coordinator_number}`}> {CardContent.coordinator_number.replace(/\D+/g, '').replace(/(\d{3})(\d{2})(\d{3})(\d{4})/, '+ ($1) $2 $3 $4')}</a> </p>
          </div>:''}
          {CardContent.status === 'finished' ?
            <div className={style.bottomInfo}>
              <div>
                <p className={style.NumofVolunteers}>{CardContent.group}</p>
                <p className={style.status + " " + style.Finished}>{translation.finished[lang]}</p>
              </div>
              <div>
                <Rated rate={CardContent.rate} size={25} />
              </div>
            </div> : CardContent.status === 'graded' ?
              <div className={style.bottomInfo}>
                <div>
                  <p className={style.NumofVolunteers}>{CardContent.group}</p>
                  <p className={style.status + " " + style.InProccess}> {translation.waitingRate[lang]}</p>
                </div>
                <div>
                  {/* <Button btnType='Grey' clicked={handleOpen} >
                    {translation.finishAndRate[lang]}
                  </Button> */}
                </div>
              </div> : CardContent.status === 'pending' ?
                <div className={style.bottomInfo}>
                  <div>
                    <p className={style.NumofVolunteers}>{CardContent.group}</p>
                    <p className={style.status + " " + style.InProccess}> {translation.inProcess[lang]}</p>
                  </div>
                  <div>
                    <Button btnType='Grey' clicked={handleOpen} >
                      {translation.finishAndRate[lang]}
                    </Button>
                  </div>
                </div> :
                <div className={style.bottomInfo}>
                  <div>
                    <p className={style.NumofVolunteers}>{translation.volunteers[lang]} {CardContent.count}</p>
                    <p className={style.status + " " + style.Waiting}>{translation.waiting[lang]}</p>
                  </div>
                  <div>
                    <Button btnType='Grey'  clicked={handleOpen}>
                      {translation.edit[lang]}
                    </Button>
                  </div>
                </div>}
        </Card> : ' '}
      {
        CardContent && CardContent.status === "gathering" ?
          <Modal open={open} handleClose={handleClose} handleOpen={handleOpen}>
            <div className={style.modal}>
            <Form applicationEdit={true} url={`/requesters/post/${CardContent.id}/update/`} inputsForm={inputsForm} {...props} handleClose={handleClose}/>
              
            </div>
          </Modal>
          : <Modal open={open} handleClose={handleClose} handleOpen={handleOpen}>
            <div className={style.modal}>
              <h3 className={style.modalHeader}>
                {translation.rateWork[lang]}
              </h3>
              <div className={style.rateBlock}>
                <Rate rateChange={handleRateChange} size={40} />
              </div>
              <div>
                <p className={style.leaveComment}>Оставьте отзыв</p>
                <textarea className={style.comment} placeholder="Напишите подробно" onChange={(e) => handleCommentChange(e)} />
              </div>
              <div className={style.ButtonsBox}>
                <Button btnType="Simple" clicked={handleClose}>
                  {translation.cancel[lang]}
                </Button>
                <Button btnType="Yellow" clicked={handleRate} >
                  {translation.toSend[lang]}
                </Button>
              </div>
            </div>
          </Modal>
      }

      <Snackbar open={success} handleOpen={handleSuccess} handleClose={handleClose}>
    <Alert elevation={6} variant="filled" onClose={handleClose} severity="success">{translation.success[lang]}</Alert>
      </Snackbar>
      <Snackbar open={error} handleOpen={handleError} handleClose={handleClose}>
        <Alert elevation={6} variant="filled" onClose={handleClose} severity="error">{translation.error[lang]}</Alert>
      </Snackbar>
    </Aux>
  );
}