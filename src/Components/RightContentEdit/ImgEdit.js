import React, {useState,useEffect} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Aux from '../../hoc/Wrapper';
import blackstar from '../../assets/icons/BlackStar.svg';
import camera from '../../assets/icons/camera.svg';
import userAva from '../../assets/icons/user.svg';
import tick from '../../assets/icons/verified.svg';
import style from './RightSideBar.module.css';
import axios from '../../API/api'
import Snackbar from '../UI/Snackbar/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {useSelector, useDispatch} from 'react-redux';
import translations from '../../Translation.json';

const useStyles = makeStyles((theme) => ({
  camera: {
    marginTop: '-90px',
    zIndex: 100,
    position: 'absolute',
    marginLeft: '-20px',
    cursor: 'pointer'
  },
}));

export default function RightSideBar(props) {
  const classes = useStyles();
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  const [success, setSuccess]=React.useState(false);
  const [error, setError]=React.useState(false);
  const [message, setMessage]=React.useState(null);
  const [avatarError, setAva]=React.useState(null);
  const [matchParams, setMatchParams]=React.useState(props.match.params);
  const {groupEdit,editProfile} =useSelector(state=>({
    ...state.mainData
  }));
  const dispatch = useDispatch();
  const [groupValues, setGroupValues]=useState(groupEdit);
  const [profileValues, setProfileValues]=useState(editProfile);
  const handleSuccess=()=>{
    setSuccess(true)
  }
  const handleError=()=>{
    setError(true)
  }
  const  handleClose=()=>{
    setSuccess(false)
    setError(false)
  }
  const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    const data= new FormData();
    data.append('avatar',e.target.files[0]);
    if(props.matchParams.contenttype==='settings'){
      axios.patch('/profile/avatar/',data,{
              headers: {
                Authorization: `Bearer ${localStorage.getItem('auth')}`,
                'Content-Type': 'multipart/form-data'
              }
          })
          .then( response => {
            setSuccess(true);
            // console.log(response)
            
          } )
          .catch( error => {
            setMessage(error.message)
            setError(true)
          } );
      }    
    else{
      axios.patch(`/coordinators/group/avatar/`,data,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem('auth')}`,
              'Content-Type': 'multipart/form-data'
            }
        })
        .then( response => {
          setSuccess(true);
        } )
        .catch( error => {
          setMessage(error.message)
            setError(true)
          
        } );
    };}
    
  const handleImg = (img) => {
    img.src=userAva;
    setAva(userAva)
  }
  useEffect(() => {
    setMatchParams(props.match.params);
    if(!profileValues){
      axios.get('/profile/',{
        headers:{ Authorization: `Bearer ${localStorage.getItem('auth')}` }
      })
      .then(res=>{
         let data={...res.data.profile,email:res.data.email,has_group:res.data.has_group}  
         if(data.avatar)
         {
             if(!(data.avatar).includes("https://api.birdamlik.uz"))
             data.avatar=`https://api.birdamlik.uz${data.avatar}`;
         }
         else{
           data.avatar=userAva
         }
          
          setProfileValues(data)
          dispatch({
            type:"MAINDATA",
            info:{
              currentUser:{...data},
              editProfile:{...data}
            }
          })
      })
      .catch(err=>{
        setMessage(error.message)
            setError(true)
      })
    }
    if(!groupValues && ["coordinator"].includes(props.match.params.user)){
      axios.get(`/coordinators/group/info/`,{
        headers:{
           Authorization:`Bearer ${localStorage.getItem('auth')}`
        }
     })
     .then(res=>{
         setGroupValues(res.data);
         dispatch({
            type:"MAINDATA",
            info:{
               groupInfo:res.data,
               groupEdit:res.data
            }
         })
     })
     .catch(err=>{
      setMessage(error.message)
      setError(true)
     })
    }
  },[props.match.params]);

  return (
    <Aux>
      {props.match.params.contenttype==='settings' && profileValues?
      <Grid item xl={3} lg={3} md={3} sm={12} xs={12} style={{justifyItems:"center", alignItems:"center"}}>
        <div className={classes.paper3}>
          <ul className={style.rightgrid}>
            <li>
              <div className={style.circle}>
                <img className={style.large} ref={uploadedImage} onError={()=>handleImg(this)} src={profileValues.avatar}/>
                <div className={style.overlay}>
                  <label for="file-input">
                    <img src={camera} className={classes.camera} alt="img" />
                  </label>
                  <input style={{ display: 'none' }} type="file" id="file-input"
                    onChange={handleImageUpload} ref={imageUploader} />
                </div>
              </div>
            </li>
            <li>
              <p className={style.name}>{profileValues.fio}</p>
            </li>
            <li>
              <p className={style.title}>{profileValues.role==='coordinator'?translations.coordinator[matchParams.lang]:profileValues.role==='volunteer'?translations.volunteer[matchParams.lang]:translations.requester[matchParams.lang]}</p>
            </li>
            <li>
              <p className={style.rank}><img src={blackstar} alt="blackstar"  /> {profileValues.star_total} {translations.stars[matchParams.lang]}</p>
            </li>
            <li>
              <p className={style.bio}>{profileValues.about}</p>
            </li>
          </ul>
        </div>
      </Grid>:groupValues?
      <Grid item xl={3} lg={3} md={3} sm={12} xs={12} style={{justifyItems:"center", alignItems:"center"}}>
      <div className={classes.paper3}>
        <ul className={style.rightgrid}>
          <li>
            <div className={style.circle}>
              <img className={style.large} ref={uploadedImage} onError={()=>handleImg(this)} src={groupValues.avatar}/>
              <div className={style.overlay}>
                <label for="file-input">
                  <img src={camera} className={classes.camera} alt="img" />
                </label>
                <input style={{ display: 'none' }} type="file" id="file-input"
                  onChange={handleImageUpload} ref={imageUploader} />
              </div>
            </div>
          </li>
          <li>
            <p className={style.name}>{groupValues.title} {groupValues.is_verified?<img src={tick} style={{width:10,height:10}}/>:null}</p>
          </li>
          <li>
            <p className={style.rank}><img src={blackstar} alt="blackstar"  /> {groupValues.stars} {translations.stars[matchParams.lang]}</p>
          </li>
          <li>
            <p className={style.bio}>{groupValues.description}</p>
          </li>
        </ul>
      </div>
    </Grid>:''}
      <Snackbar open={success} handleOpen={handleSuccess} handleClose={handleClose}>
  <Alert elevation={6} variant="filled" onClose={handleClose} severity="success">{translations.successfullyreistered[matchParams.lang]}</Alert>
      </Snackbar>
      <Snackbar open={error} handleOpen={handleError} handleClose={handleClose}>
  <Alert elevation={6} variant="filled" onClose={handleClose} severity="error">{translations.error[matchParams.lang]}</Alert>
        {/* {message} */}
      </Snackbar>
    </Aux>
  );
}