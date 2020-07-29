import React, {useState, useEffect} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Aux from '../../hoc/Wrapper';
import blackstar from '../../assets/icons/BlackStar.svg';
import img from '../../assets/icons/user.svg';
import style from './RightSideBar.module.css';
import axios from '../../API/api';
import {Redirect} from 'react-router-dom';
import  {useSelector,useDispatch} from 'react-redux';
import Snackbar from '../UI/Snackbar/Snackbar';
import Alert from '@material-ui/lab/Alert';
import translations from '../../Translation.json';

const useStyles = makeStyles((theme) => ({
  Block:{
    [theme.breakpoints.down('md')]: {
       display: 'none',
    },
    [theme.breakpoints.up('md')]: {
       display: 'block',
    },
 }, 
  camera: {
    marginTop: '-90px',
    zIndex: 100,
    position: 'absolute',
    marginLeft: '-20px',
    cursor: 'pointer'
  },
}));

 function RightSideBar(props) {
  const classes = useStyles();
  const {currentUser} = useSelector(state=>({
    ...state.mainData
  }));
  const dispatch =useDispatch();
  const [userData, setUserData] = useState(props.currentUser);
  const [redirect, setRedirect] = useState(false);
  const [matchParams, setParams] = useState(props.matchParams);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setParams(props.matchParams)
    if(props.matchParams){
    if(currentUser)
   { 
    setUserData(currentUser);
    }
    else{
      axios.get('/profile/',{
        headers:{ Authorization: `Bearer ${localStorage.getItem('auth')}` }
      })
      .then(res=>{
        // console.log(res)
         let data={...res.data.profile,email:res.data.email,has_group:res.data.has_group}  
         if(data.avatar)
         {
             if(!(data.avatar).includes("https://api.birdamlik.uz"))
             data.avatar=`https://api.birdamlik.uz${data.avatar}`;
         }
         else{
           data.avatar=img
         }
        if(props.matchParams.user==='applicant' || (res.data.has_group && res.data.group_activated && props.matchParams.user==='coordinator') || (res.data.has_group && props.matchParams.user==='volunteer')){
          setUserData(data)
            setRedirect(false)
        }
        else{
          setRedirect(`/${props.matchParams.lang}/groups`);
        }
        dispatch({
          type:"MAINDATA",
          info:{
            currentUser:{...data},
            editProfile:{...data}
          }
        })
      })
      .catch(err=>{
        setMessage(error.message);
        setError(true)
        setRedirect(`/${props.matchParams.lang}/auth`);
      })
    }}
    
 }, [props.matchParams,props.match]);
 const handleError=()=>{
  setError(true)
}
const handleClose = () => {
  
  setError(false)
};

 if(redirect){
      return(<Redirect to={redirect}/>)
  }
  else
  return (
    <Aux>
      {userData?
      <Grid item xl={3} lg={3} md={3} sm={12} xs={12} style={{justifyItems:"center", alignItems:"center"}} className={classes.Block}>
        <div className={classes.paper3}>
          <ul className={style.rightgrid}>
            <li>
              <div className={style.circle}>
                <img className={style.large} src={userData.avatar?userData.avatar:img}  />
              </div>
            </li>
            <li>
            <p className={style.name}>{userData.fio}</p>
            </li>
            <li>
              <p className={style.title}>{userData.role==='coordinator'?translations.coordinator[matchParams.lang]:userData.role==='volunteer'?translations.volunteer[matchParams.lang]:translations.requester[matchParams.lang]}</p>
            </li>
            {/* <li>
              <p className={style.title}>Рядовой</p>
            </li> */}
            <li>
              <p className={style.rank}><img src={blackstar} alt="blackstar" /> {userData.star_total} {translations.stars[matchParams.lang]}</p>
            </li>
            <li>
          <p className={style.bio}>{userData.bio?userData.bio:''}</p>
            </li>
          </ul>
        </div>
      </Grid>:''}
      <Snackbar open={error} handleOpen={handleError} handleClose={handleClose}>
          <Alert elevation={6} variant="filled" onClose={handleClose} severity="error">{translations.error[matchParams.lang]}</Alert>
      </Snackbar> 
      </Aux>
  );
}

export default (RightSideBar)