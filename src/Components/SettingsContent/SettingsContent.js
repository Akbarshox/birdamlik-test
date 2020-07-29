import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import style from './SettingsContent.module.css';
import Aux from '../../hoc/Wrapper';
import LeftSidebar from '../LeftSideBar/LeftSidebar'
import RightContent from '../RightContentEdit/ImgEdit';
import Form from '../Form/Form';
import {sidebarJson} from '../LeftSideBar/LeftSidebarJson';
import translations from '../../Translation.json';
import { useSelector, useDispatch} from 'react-redux';
import axios from '../../API/api';
import img from '../../assets/icons/userAvatar.svg';
import Snackbar from '../UI/Snackbar/Snackbar';
import Alert from '@material-ui/lab/Alert';


export default function SettingsContent(props) {
  const [matchParams, setMatchParams] = useState(props.match.params?props.match.params:{lang:'ru'});
 const {groupEdit,editProfile} =useSelector(state=>({
   ...state.mainData
 }));
 const dispatch = useDispatch();
 const [groupValues, setGroupValues]=useState(groupEdit);
 const [profileValues, setProfileValues]=useState(editProfile);
 const [error, setError]=React.useState(false);
 const [message, setMessage]=React.useState(null);
  let profileUnputs= {
    headLine1:{
      headLine:true,
      title:{
        ru:"Персональные данные",
      uz:"Shaxsiy ma`lumotlar"},
      contentText:null
    },
    fio: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: translations.fullName.placeolder[matchParams.lang]
      },
      label: translations.fullName.label[matchParams.lang],
      value: profileValues?profileValues.fio:'',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      disabled: false
      },
  //   username: {
  //      elementType: 'phone',
  //      elementConfig: {
  //          type: 'text',
  //          placeholder: translations.phone.placeolder[matchParams.lang]
  //      },
  //      label:translations.phone.label[matchParams.lang],
  //      value: '',
  //      validation: {
  //          required: true
  //      },
  //      valid: false,
  //      touched: false,
  //      disabled:false
  //  },
   email: {
    elementType: 'input',
    elementConfig: {
      type: 'email',
      placeholder: translations.emailInput.placeolder[matchParams.lang]
    },
    label: translations.emailInput.label[matchParams.lang],
    value: profileValues?profileValues.email:'',
    validation: {
      required: true,
      isEmail:true
    },
    valid: false,
    touched: false,
    disabled: false
  },
  about: {
      elementType: 'textareaBig',
      elementConfig: {
        type: 'textarea',
        placeholder: ''
      },
      label: translations.aboutMe[matchParams.lang],
      value: profileValues?profileValues.about:'',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      disabled: false
      }
  }
  let PasswordInputs={
    headLine1:{
      headLine:true,
      title:{
        ru:"Безопасность",
      uz:"Xavfsizlik"},
      contentText:null
    },
    old_password: {
      elementType: 'input',
      elementConfig: {
         type: 'password',
         placeholder: translations.password.placeolder[matchParams.lang]
      },
      label: translations.currentPassword[matchParams.lang],
      value: '',
      validation: {
         required: true
      },
      valid: false,
      touched: false,
      disabled: false
   },
    new_password: {
      elementType: 'input',
      elementConfig: {
         type: 'password',
         placeholder: translations.password.placeolder[matchParams.lang]
      },
      label: translations.newPassword[matchParams.lang],
      value: '',
      validation: {
         required: true
      },
      valid: false,
      touched: false,
      disabled: false
   },
   repeatPassword: {
      elementType: 'input',
      elementConfig: {
         type: 'password',
         placeholder: translations.verifyPassword.placeolder[matchParams.lang]
      },
      label: translations.verifyPassword.label[matchParams.lang],
      value: '',
      validation: {
         required: true,
         match: "new_password"
      },
      valid: false,
      touched: false,
      disabled: false
   }
  }
  let groupInputs={
    headLine1:{
      headLine:true,
      title:{
        ru:translations.groupInfo.ru,
      uz:translations.groupInfo.uz},
      contentText:null
    },
    title: {
      elementType: 'input',
      elementConfig: {
         type: 'text',
         placeholder: ''
      },
      label: translations.groupName[matchParams.lang],
      value: groupValues?groupValues.title:'',
      validation: {
         required: true
      },
      valid: false,
      touched: false,
      disabled: false
   },
    description: {
      elementType: 'textareaBig',
      elementConfig: {
         type: 'text',
         placeholder: ''
      },
      label: translations.aboutGroup[matchParams.lang],
      value: groupValues?groupValues.description:'',
      validation: {
         required: true
      },
      valid: false,
      touched: false,
      disabled: false
   }
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
           data.avatar=img
         }
          profileUnputs= {
            headLine1:{
              headLine:true,
              title:{
                ru:"Персональные данные",
              uz:"Shaxsiy ma`lumotlar"},
              contentText:null
            },
            fio: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                placeholder: translations.fullName.placeolder[matchParams.lang]
              },
              label: translations.fullName.label[matchParams.lang],
              value: data.fio,
              validation: {
                required: true
              },
              valid: false,
              touched: false,
              disabled: false
              },
          //   username: {
          //      elementType: 'phone',
          //      elementConfig: {
          //          type: 'text',
          //          placeholder: translations.phone.placeolder[matchParams.lang]
          //      },
          //      label:translations.phone.label[matchParams.lang],
          //      value: '',
          //      validation: {
          //          required: true
          //      },
          //      valid: false,
          //      touched: false,
          //      disabled:false
          //  },
           email: {
            elementType: 'input',
            elementConfig: {
              type: 'email',
              placeholder: translations.emailInput.placeolder[matchParams.lang]
            },
            label: translations.emailInput.label[matchParams.lang],
            value: data.email,
            validation: {
              required: true,
              isEmail:true
            },
            valid: false,
            touched: false,
            disabled: false
          },
            about: {
               elementType: 'input',
               elementConfig: {
                 type: 'textarea',
                 placeholder: ''
               },
               label: translations.aboutMe[matchParams.lang],
               value: data.about,
               validation: {
                 required: true
               },
               valid: false,
               touched: false,
               disabled: false
               }
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
       setMessage(err.message);
       setError(true)
      })
    }
    if(!groupValues && ["coordinator","volunteer"].includes(props.match.params.user)){
      axios.get(`/${props.match.params.user}s/group/info/`,{
        headers:{
           Authorization:`Bearer ${localStorage.getItem('auth')}`
        }
     })
     .then(res=>{
        groupInputs={
          headLine1:{
            headLine:true,
            title:{
              ru:translations.groupInfo.ru,
            uz:translations.groupInfo.uz},
            contentText:null
          },
          title: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: ''
            },
            label: translations.groupName[matchParams.lang],
            value: res.data.title,
            validation: {
              required: true
            },
            valid: false,
            touched: false,
            disabled: false
        },
          description: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: ''
            },
            label: translations.aboutGroup[matchParams.lang],
            value: res.data.description,
            validation: {
              required: true
            },
            valid: false,
            touched: false,
            disabled: false
        }
        }
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
      setMessage(err.message);
      setError(true)
     })
    }
    
  }, [props.match.params]);

  const handleError=()=>{
    setError(true)
  }
  const  handleClose=()=>{
    setError(false)
  }

  return (
    <Aux>
        <Grid row xl={12} lg={12} md={12} sm={12} xs={12} >
            <h2 className={style.header}>{translations.myProfile[matchParams.lang]}</h2>
        </Grid>
        {sidebarJson.map(e =>matchParams.user && matchParams.contenttype? matchParams.user=== e.userType && e.contentType.includes(matchParams.contenttype) ? <LeftSidebar matchParams={matchParams} sidebarData={e.data} {...props}/> : '':'')}
        {/* <Grid container justify="center"> */}
            {matchParams.contenttype==='settings'?
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12} style={{justifyContent: 'center', minHeight: '70vh'}}>
                <Form url='/profile/' personal={true} inputsForm={profileUnputs} {...props}/>
                <div className={style.line}></div> 
                <Form url='/profile/password/' safety={true} inputsForm={PasswordInputs}  {...props}/>
            </Grid>:
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12} style={{justifyContent: 'center', minHeight: '70vh'}}>
                
                <Form groupInfo={true} url='/coordinators/group/info/' inputsForm={groupInputs} {...props}/>
            </Grid>
            }
        {/* </Grid> */}
        <RightContent   {...props} matchParams={matchParams}/>
        <Snackbar open={error} handleOpen={handleError} handleClose={handleClose}>
          <Alert elevation={6} variant="filled" onClose={handleClose} severity="error">{translations.error[matchParams.lang]}</Alert>
        {/* {message} */}
      </Snackbar>
    </Aux>
  );
}