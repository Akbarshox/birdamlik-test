import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Link, Redirect } from 'react-router-dom';
import starYell from '../../assets/icons/StarYell.svg';
import style from './LeftSideBar.module.css';
import group from '../../assets/icons/Group.svg';
import tick from '../../assets/icons/verified.svg';
import Button from '../UI/Buttons/Buttons';
import Aux from '../../hoc/Wrapper';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../API/api';
import userImg from '../../assets/icons/user.svg';
import Snackbar from '../UI/Snackbar/Snackbar'
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import translations from '../../Translation.json'
const useStyles = makeStyles((theme) => ({
   Block: {
      [theme.breakpoints.down('md')]: {
         display: 'none',
      },
      [theme.breakpoints.up('md')]: {
         display: 'block',
      },
   }

}));
export default function ProfileLeft1(props) {
   const [lang, setLang] = useState(props.match.params.lang ? props.match.params.lang : 'ru')
   const classes = useStyles();
   const { groupInfo } = useSelector(state => ({
      ...state.mainData
   }));
   const dispatch = useDispatch();
   const [sidebarData, setSidebarContent] = useState(props.sidebarData);
   const [matchParams, setMatchParams] = useState(props.matchParams);
   const [redirect, setRedirect] = useState(false);
   const [groupData, setGroupData] = useState(groupInfo);
   const [ava, setAva] = useState(null)
   const [message, setMessage] = useState(null);
   const [error, setError] = useState(false);
   const [open, setDialogOpen] = useState(false);




   useEffect(() => {
      setSidebarContent(props.sidebarData);
      setLang(props.match.params.lang ? props.match.params.lang : 'ru')
      setMatchParams(props.matchParams);
      if (!groupData && ["coordinator", "volunteer"].includes(props.matchParams.user)) {
         axios.get(`/${props.matchParams.user}s/group/info/`, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('auth')}`
            }
         })
            .then(res => {
               let data = { ...res.data }
               if (data.avatar && !((data.avatar).includes("https://api.birdamlik.uz")))
                  data.avatar = `https://api.birdamlik.uz${data.avatar}`;
               else if (!data.avatar)
                  data.avatar = userImg
               setGroupData(data);
               dispatch({
                  type: "MAINDATA",
                  info: {
                     groupInfo: data,
                     groupEdit: data
                  }
               })
            })
            .catch(err => {
               setMessage(err.message)
               setError(true)
            })
      }
      if (groupData) {
         if (groupData.avatar) {
            setAva(groupData.avatar)
         }
         else {
            setAva(userImg)
         }
      }

   }, [props.sidebarData, props.matchParams], [props.match.params.lang]);
   const handleLogOut = () => {
      setRedirect(`/${matchParams.lang}/auth`);
      setDialogOpen(false)
   }
   const handleOpen = () => {
      setDialogOpen(true)
   }
   const handleBack = () => {
      props.history.goBack();
   }
   const handleError = () => {
      setError(true)
   }
   const handleClose = () => {
      setError(false);
      setDialogOpen(false);
   }
   if (redirect)
      return (<Redirect to={redirect} />)
   else
      return (
         <Aux>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12} className={classes.Block}>
               {props.matchParams.contenttype !== 'application' ? <ul className={style.socialCareList}>
                  {groupData ? props.matchParams && props.matchParams.user === 'volunteer' && props.matchParams.contenttype === 'settings' ?
                     <li className={style.groupList}>
                        <div>
                           <img className={style.ava} src={groupData.avatar} alt="ava" />
                           <p><span className={style.Socialcare}>{groupData.title} {groupData.is_verified?<img src={tick} style={{width:10,height:10}}/>:null}</span> <br />
                              <img src={starYell} alt="starYell" style={{ marginRight: '5px' }} /><span>{groupData.stars} звезд </span>
                           </p>
                        </div>
                        {/* <Button btnType="Grey" clicked={() => {
                     }}>Поменять</Button> */}
                  </li>
                  : props.matchParams && (props.matchParams.user === 'coordinator' || props.matchParams.user === 'volunteer') ? <li>
                     <img   className={style.ava}src={groupData.avatar} alt="ava" />
                     <p><span className={style.Socialcare}>{groupData.title} {groupData.is_verified?<img src={tick} style={{width:10,height:10}}/>:null}</span> <br />
                        <img src={starYell} alt="starYell" style={{ marginRight: '5px' }} /><span>{groupData.stars} звезд </span></p>
                  </li> : '' : ''}
               {sidebarData && sidebarData.length ? sidebarData.map((el, i) => {
                  if (el.link === 'out')
                     return (<li key={i} onClick={handleOpen} style={{cursor:'pointer'}}>
                           <p className={el.link === props.matchParams.contenttype ? style.active : style.nonActive}><img src={el.icon1} alt="settings" />{el.name[matchParams.lang]}</p>
                        
                     </li>)
                  else if (el.link === 'back')
                     return (<li key={i} onClick={handleBack} style={{ cursor: 'pointer' }}>
                        <p className={el.link === props.matchParams.contenttype ? style.active : style.nonActive}><img src={el.icon1} alt="settings" />{el.name[matchParams.lang]}</p>
                     </li>)
                  else
                     return (
                        <li key={i}>
                           <Link to={`/${matchParams.lang}/${matchParams.user}/${el.link}`} style={{ textDecoration: 'none' }}>
                              <p className={el.link === props.matchParams.contenttype ? style.active : style.nonActive}><img src={el.icon1} alt="settings" />{el.name[matchParams.lang]}</p>
                           </Link>
                        </li>)
               }
               ) : ''}

            </ul>
               : ''}
               <Snackbar open={error} handleOpen={handleError} handleClose={handleClose}>
                  <Alert elevation={6} variant="filled" onClose={handleClose} severity="error">{translations.error[lang]}</Alert>
               </Snackbar>
               <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">{translations.wannaleave[lang]}</DialogTitle>
                     <ul className={style.leave}>
                        <li>
                           <Button clicked={handleClose} btnType="Grey7">
                              {translations.cancel[lang]}
                           </Button>
                        </li>
                        <li>
                           <Button clicked={handleLogOut} btnType="Yellow">
                              {translations.yes[lang]}
                           </Button>
                        </li>
                     </ul>
               </Dialog>
            </Grid>

         </Aux>
      );
}