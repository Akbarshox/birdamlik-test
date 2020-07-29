import React, { useState, useEffect } from 'react';
import style from './CardsForVolunteers.module.css';
import Aux from '../../../hoc/Wrapper';
import Card from '../../UI/Card/Card';
import Button from '../../UI/Buttons/Buttons';
import ShowMore from '../../UI/ShowMore/ShowMore'
import Modal from '../../UI/Modal/Modal'
import Underlined from '../../UI/Underline/Underline'
import stars from '../../../assets/icons/BlackStar.svg';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import Rate from '../../StarRating/Rating'
import moment from "moment";
import translations from '../../../Translation.json'
import axios from '../../../API/api'
import userImg from '../../../assets/icons/user.svg';
import Snackbar from '../../UI/Snackbar/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useDispatch } from 'react-redux';
const YellowCheckbox = withStyles({
  root: {
    color: '#777',
    '&$checked': {
      color: '#FFD600',
    },
  },
  checked: {

  },
})((props) => <Checkbox color="default" {...props} />);

export default function GroupFeedCoordinator(props) {
  const [lang, setLang] = useState(props.matchParams.lang ? props.matchParams.lang : 'ru')
  const [CardContent, setCardContent] = useState(null);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState([]);
  const [rated, setRated] = useState({ requester: {}, volunteers: [] });
  const [members, setMembers] = useState(null);
  const [rating, setRating] = useState(null);
  const [requester, setRequester] = useState(null);
  const [ava, setAva] = useState(null);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    setCardContent(props.cardData);
    setLang(props.matchParams.lang ? props.matchParams.lang : 'ru')
  }, [props.cardData, props.matchParams.lang]);

  const handleError = () => {
    setError(true)
  }

  const handleOpen = () => {
    if (CardContent.status === 'graded') {

      axios.get(`/coordinators/post/rate/${CardContent.id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth')}`
        }
      })
        .then(res => {
          let req = { ...res.data.requester }
          if (req.avatar) {
            if (!(req.avatar).includes("https://api.birdamlik.uz"))
              req.avatar = `https://api.birdamlik.uz${req.avatar}`;
          }
          else {
            req.avatar = userImg
          }

          setRequester(req)
          let results = [...res.data.volunteers]
          for (let i = 0; i < results.length; i++) {
            let data = results[i];
            if (data.avatar) {
              if (!(data.avatar).includes("https://api.birdamlik.uz"))
                data.avatar = `https://api.birdamlik.uz${data.avatar}`;
            }
            else {
              data.avatar = userImg
            }
          }
          setMembers(results)
        })
        .catch(err => {
          setMessage(err.message)
          setError(true)
        })
    }
    else {
      axios.get(`/coordinators/group/members/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth')}`
        }
      })
        .then(res => {
          let results = [...res.data.results]
          for (let i = 0; i < results.length; i++) {
            let data = results[i];
            if (data.avatar) {
              if (!(data.avatar).includes("https://api.birdamlik.uz"))
                data.avatar = `https://api.birdamlik.uz${data.avatar}`;
            }
            else {
              data.avatar = userImg
            }
          }
          setMembers(results)
        })
        .catch(err => {
          setMessage(err.message)
          setError(true)
        })
    }

    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setError(false)
  };
  const handleInvite = () => {
    // alert(CardContent.id)
    let ids = ''
    if (checked.length) {
      for (let i = 0; i < checked.length; i++) {
        if (ids === '')
          ids = `${ids}${checked[i].id}`
        else
          ids = `${ids},${checked[i].id}`
        // ids.push(checked[i].id)
      }

      axios.post(`/coordinators/post/invite/${CardContent.id}/`, { volunteers: ids }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('auth')}` }
      })
        .then(res => {

          setOpen(false);
          dispatch({
            type: "MAINDATA",
            info: {
              updateComponent: true
            }
          })
        })
        .catch(err => {
          setMessage(err.message)
          setError(true)
        })
    }
  }
  const handleRateChange = (rating, user, id) => {
    let ratedNew = { ...rated }
    if (user === 'requester') {
      ratedNew.requester['rate'] = rating;
      ratedNew.requester['comment'] = 'Great Job!';
    }
    else {
      const currentIndex = ratedNew.volunteers.findIndex(obj => obj.pk === id);
      let data = {}
      if (currentIndex === -1) {
        data['pk'] = id;
        data['rate'] = rating;
        ratedNew.volunteers.push({ ...data })
      }
      else {
        ratedNew.volunteers[currentIndex]['pk'] = id;
        ratedNew.volunteers[currentIndex]['rate'] = rating
      }
    }

    setRated(ratedNew);
  }
  const handleCommentChange=(comment, user, id)=>{
    let ratedNew = { ...rated }
    if (user === 'requester') {
      ratedNew.requester['comment'] = comment.target.value;
    }
    else {
      const currentIndex = ratedNew.volunteers.findIndex(obj => obj.pk === id)
      let data = {}
      if (currentIndex === -1) {
        data['pk'] = id;
        data['comment'] = comment.target.value;
        ratedNew.volunteers.push({ ...data })
      }
      else {
        ratedNew.volunteers[currentIndex]['pk'] = id;
        ratedNew.volunteers[currentIndex]['comment'] = comment.target.value;
      }
    }
    setRated(ratedNew);
  }
  const handleRateSend = () => {
    if (!rated.requester.rate || !rated.volunteers.length) {
      alert('Please rate all participants!');
    }
    else {
     for(let i=0; i<rated.volunteers.length;i++){
          if(rated.volunteers[i]['comment']==="" || !rated.volunteers[i]['comment']){
            if(rated.volunteers[i]['rate']<4)
            rated.volunteers[i]['comment']="Try to be active!";
            else{
              rated.volunteers[i]['comment']="Good Job!";
            }
          }
     }
      axios.post(`/coordinators/post/rate/${CardContent.id}/`, rated, {
        headers: { Authorization: `Bearer ${localStorage.getItem('auth')}` }
      })
        .then(res => {
          setOpen(false);
          dispatch({
            type: "MAINDATA",
            info: {
              updateComponent: true
            }
          })
        })
        .catch(err => {
          setMessage(err.message)
          setError(true)
        })
    }
  }
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  return (
    <Aux>

      <section>
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
              <p className={style.contacts} > <span> {translations.number[lang]}</span> :  <a href={`tel: ${CardContent.requester_number}`}>{CardContent.requester_number.replace(/\D+/g, '').replace(/(\d{3})(\d{2})(\d{3})(\d{4})/, '+ ($1) $2 $3 $4')}</a></p>
            </div>
            {CardContent.status === 'pending' ?
              <div className={style.bottomInfo}>
                <div>
                  <p className={style.NumofVolunteers}>{translations.volunteers[lang]}<span> {CardContent.gathered}</span> / <span> {CardContent.count}</span></p>
                  <p className={style.status + " " + style.InProccess}> {translations.inProcess[lang]}</p>
                </div>
                <div>
                  <Button btnType='Grey' disabled={CardContent.gathered === CardContent.count} clicked={handleOpen} >
                    {translations.invite[lang]}
                  </Button>
                </div>
              </div> : CardContent.status === 'gathering' ?
                <div className={style.bottomInfo}>
                  <div>
                    <p className={style.NumofVolunteers}>{translations.volunteers[lang]}<span> {CardContent.gathered}</span> / <span> {CardContent.count}</span></p>
                    <p className={style.status + " " + style.InProccess}>{translations.inProcess[lang]}</p>
                  </div>
                  <div>
                    <Button btnType='Grey' disabled={CardContent.gathered === CardContent.count} clicked={handleOpen} >
                      {translations.invite[lang]}
                    </Button>
                  </div>
                </div> : CardContent.status === 'graded' ?
                  <div className={style.bottomInfo}>
                    <div>
                      <p className={style.NumofVolunteers}>{translations.finishedwaitingforRate[lang]}</p>
                    </div>
                    <div>
                      <Button btnType='Grey' clicked={handleOpen}>
                        {translations.estimate[lang]}
                      </Button>
                    </div>
                  </div> :
                  <div className={style.bottomInfo}>
                    <div>
                      <p className={style.NumofVolunteers}>{translations.processFinished[lang]}</p>
                    </div>
                    <div>
                      <Button btnType='Grey' clicked={handleOpen}>
                        {translations.estimate[lang]}
                      </Button>
                    </div>
                  </div>
            }
          </Card> : ' '}
        {
          CardContent && CardContent.status === 'graded' ?
            //modal to rATE CARD
            <Modal open={open} handleClose={handleClose} handleOpen={handleOpen}>
              <h3 className={style.modalHeader}>
                {translations.rateforRequester[lang]}
              </h3>
              {requester ? <Aux><div className={style.ListItemApplicant}>
                <div className={style.MembersInfo}>
                  <img src={requester.avatar} className={style.ava} />
                  <div>
                    <div className={style.header}>
                      <div>
                        <h3 className={style.volunteerName}>{requester.fio}</h3>
                        <p className={style.title}>Заявитель • <span className={style.stars}>
                          <img src={stars} /> {requester.star_total} звезд</span></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={style.rate}> <Rate rateChange={(rating) => handleRateChange(rating, 'requester', requester.id)} size={25} /></div>
               
              </div> 
               {/* <div>
                  <textarea onChange={(e)=>handleCommentChange(e, 'requester', requester.id)} className={style.comment} placeholder="Оставьте комментарии" />
                </div> */}
              </Aux>: ''}
              <h3 className={style.modalHeader}>
                {translations.rateforparticipant[lang]}
              </h3>
              <div className={style.List}>
                {members && members.length ? members.map((value, i) => {
                  return (
                    <Aux key={i}>
                      <div className={style.ListItem} >
                        <div className={style.MembersInfo}>

                          <img src={value.avatar} className={style.ava} />

                          <div className={style.why}>
                            <div className={style.header}>
                              <div>
                                <h3 className={style.volunteerName}>{value.fio}</h3>
                                <p className={style.title}>Волонтер • <span className={style.stars}>
                                  <img src={stars} /> {value.star_total}</span></p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={style.rate}>  <Rate rateChange={(rating) => handleRateChange(rating, 'volunteer', value.id)} size={25} /></div>

                      </div>
                        <textarea onChange={(e)=>{handleCommentChange(e, 'volunteer', value.id)}} className={style.comment} placeholder="Оставьте комментарии" />
                       <div>
                       </div>
                      <Underlined />
                    </Aux>
                  );
                }) : ''}
              </div>
              <div className={style.ButtonsBox}>
                <Button btnType="Simple" clicked={handleClose}>
                  {translations.cancel[lang]}
                </Button>
                <Button btnType="Yellow" clicked={handleRateSend}>
                  {translations.estimate[lang]}
                </Button>
              </div>
            </Modal> :
            //Modal to choose Voluunteer
            <Modal open={open} handleClose={handleClose} handleOpen={handleOpen}>
              <h3 className={style.modalHeader}>
                {translations.chooseVolunteer[lang]}
              </h3>
              <div className={style.List}>
                {members && members.length ? members.map((value, i) => {
                  const labelId = `checkbox-list-label-${value}`;
                  return (
                    <Aux key={i}>
                      <div className={style.ListItemChooseVolunteer} >
                        <div className={style.MembersInfo}>

                          <img src={value.avatar} className={style.ava} />

                          <div>
                            <div className={style.header}>
                              <div>
                                <h3 className={style.volunteerName}>{value.fio}</h3>
                                <p className={style.title}>Волонтер  • <span className={style.stars}>
                                  <img src={stars} />{value.star_total}</span></p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div><YellowCheckbox
                          edge="end"
                          onChange={handleToggle(value)}
                          checked={checked.indexOf(value) !== -1}
                          inputProps={{ 'aria-labelledby': labelId }} /></div>
                      </div>
                      <Underlined /></Aux>
                  );
                }) : ''}
              </div>
              <div className={style.ButtonsBox}>
                <Button btnType="Simple" clicked={handleClose}>
                  {translations.cancel[lang]}
                </Button>
                <Button btnType={checked.length ? "Yellow" : "Grey"} disabled={checked.length ? false : true} clicked={handleInvite}>
                  {translations.invite[lang]}
                </Button>
              </div>
            </Modal>
        }

      </section>
      <Snackbar open={error} handleOpen={handleError} handleClose={handleClose}>
        <Alert elevation={6} variant="filled" onClose={handleClose} severity="error">{translations.error[lang]}</Alert>
      </Snackbar>
    </Aux>
  );
}