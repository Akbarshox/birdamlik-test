import React, { useState, useEffect } from "react";
import Aux from '../../hoc/Wrapper';
import FormCss from './Form.module.css';
import Input from '../UI/Input/Input';
import Button from '../UI/Buttons/Buttons';
import {useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Redirect } from "react-router-dom";
import axios from '../../API/api';
import Snackbar from '../UI/Snackbar/Snackbar';
import Alert from '@material-ui/lab/Alert';
import translations from '../../Translation.json';
import img from '../../assets/icons/user.svg';
import Agreement from "./Agreement";


function Form(props) {
   const dispatch = useDispatch();
   const [userType, setUsertype] = useState('volunteer');
   const [nextUrl, setNextUrl] = useState(props.match.url);
   const [lang, setLang] = useState(props.match.params.lang ? props.match.params.lang : 'ru');
   const [message, setMessage] = useState(null);
   const [formData, setFormData] = useState({
      inputsForm: props.inputsForm,
      formIsValid: false,
      regSuccess: false,
      error: false,
      regError: false,
      redirect: false
   });
   useEffect(() => {
      setFormData({
         ...formData, inputsForm: props.inputsForm
      });
      setNextUrl(props.match.url);
      setLang(props.match.params.lang ? props.match.params.lang : 'ru')
   },[props.match.params,props.inputsForm]);

   const handleUserType = (user) => {
      setUsertype(user);
   };
   const handleSuccess=()=>{
      setFormData({...formData,regSuccess:true})
    }
    const handleError=()=>{
      setFormData({...formData,error:true})
    }
    const  handleClose=()=>{
      setFormData({...formData,regSuccess:false,error:false})
      if(formData.regSuccess && (!props.login && !props.registration && !props.application))
      window.location.reload();
    }
   const formHandler = (event) => {
      event.preventDefault();
      const {inputsForm}=formData
      const Data ={};
      const DataForm= new FormData();
     

      if (inputsForm["username"]) {
         Data["username"] = inputsForm["username"].value.replace("+", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "");
      }
      if (inputsForm["phone"]){
         Data["phone"] = inputsForm["phone"].value.replace("+", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "");
      }
      if(props.registration){
            Data["profile"]={};
            Data["password"] = inputsForm["password"].value;
            Data.profile["fio"]=inputsForm["fio"].value;
            Data.profile["role"]=userType;
            Data.profile=JSON.stringify(Data.profile)
         }
         else if(props.personal){
            Data["profile"]={};
            Data["email"] = inputsForm["email"].value;
            Data.profile["fio"]=inputsForm["fio"].value;
            // Data.profile["username"]=inputsForm["username"].value.replace("+", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "");
            Data.profile["about"]=inputsForm["about"].value;
            Data.profile=JSON.stringify(Data.profile)
         }
         else if(props.safety){
            Data["old_password"] = inputsForm["old_password"].value;
            Data["new_password"] = inputsForm["new_password"].value;
           
         }
         else if(props.makegroup){
         for (let formElementIdentifier in inputsForm) {
            if (!inputsForm[formElementIdentifier].headLine)
               if (inputsForm[formElementIdentifier].elementConfig && inputsForm[formElementIdentifier].elementConfig.type === 'file') {
                  // console.log("image:", inputsForm[formElementIdentifier].value[0]);
                  DataForm.append(formElementIdentifier, inputsForm[formElementIdentifier].value[0]);
               }
               else {
                  if (formElementIdentifier === 'phone')
                     DataForm.append(formElementIdentifier, inputsForm[formElementIdentifier].value.replace("+","").replace(" ","").replace(" ","").replace(" ","").replace(" ",""));
                  else
                     DataForm.append(formElementIdentifier, inputsForm[formElementIdentifier].value);
               }
            }
         }
         else
         for (let formElementIdentifier in inputsForm) {
            if (!Data[formElementIdentifier] && !inputsForm[formElementIdentifier].headLine)
               Data[formElementIdentifier] = inputsForm[formElementIdentifier].value;
         }
         if(props.registration || props.login)
         axios.post( props.url, Data)
            .then( response => {
               if(props.registration){
                  // setFormData({...formData,regSuccess:true});
                  axios.post('/accounts/login/',{username:Data.username,password:Data.password})
                  .then(response=>{
                     localStorage.setItem('auth',response.data.token);
                  let user=response.data.role==='requester'?'applicant':response.data.role;
                  if(user==='applicant' || (user==='volunteer' && response.data.has_group) || (user==='coordinator' && response.data.has_group && response.data.group_activated))
                  {
                     if(user!=='applicant'){
                        axios.get(`/${user}s/group/info/`,{
                           headers: {Authorization:`Bearer ${localStorage.getItem('auth')}`}
                        })
                        .then(res=>{
                           // console.log(res.data)
                           dispatch({
                              type: "MAINDATA",
                              info:{
                                 groupInfo:res.data,
                                 groupEdit:res.data
                              }
                           });
                        })
                        .catch(err=>{
                           // console.log('group Error',err)
                        });
                     }
                     let data={...response.data}
                     if(data.avatar)
                     {
                        if(!(data.avatar).includes("https://api.birdamlik.uz"))
                        data.avatar=`https://api.birdamlik.uz${data.avatar}`;
                     }
                     else{
                     data.avatar=img
                     }
                     dispatch({
                        type: "MAINDATA",
                        info:{
                           currentUser:{...data},
                           editProfile:{...data}
                        }
                     });
                   setNextUrl(`/${props.match.params.lang}/${user}`);
                  
                  }
               else{
                     setNextUrl(`/${props.match.params.lang}/groups`);
                   
                  }
                  
                  })
                  .catch(err=>{
                     setMessage(err.message)
                     setFormData({...formData,error:true})
                  })
               }
               if(props.login)
               {
                  localStorage.setItem('auth',response.data.token);
                  let user=response.data.role==='requester'?'applicant':response.data.role;
                  if(user==='applicant' || (user==='volunteer' && response.data.has_group) || (user==='coordinator' && response.data.has_group && response.data.group_activated))
                  {
                     if(user!=='applicant')
                     axios.get(`/${user}s/group/info/`,{
                        headers: {Authorization:`Bearer ${localStorage.getItem('auth')}`}
                     })
                     .then(res=>{
                        dispatch({
                           type: "MAINDATA",
                           info:{
                              groupInfo:res.data,
                              groupEdit:res.data
                           }
                        });
                     })
                     .catch(err=>{
                        // console.log('group Error',err)
                     });
                     setNextUrl(`/${props.match.params.lang}/${user}`);
                     let data={...response.data}
                     if(data.avatar)
                     {
                         if(!(data.avatar).includes("https://api.birdamlik.uz"))
                         data.avatar=`https://api.birdamlik.uz${data.avatar}`;
                     }
                     else{
                       data.avatar=img
                     }
                     dispatch({
                        type: "MAINDATA",
                        info:{
                           currentUser:{...data},
                           editProfile:{...data}
                        }
                     });
                  }
                  else{
                     setNextUrl(`/${props.match.params.lang}/groups`);
                  }
               }
               setFormData({...formData,redirect:true})
               setUsertype(response.data.role)
            })
            .catch( error => {
               setMessage(error.message)
               setFormData({...formData,error:true})
            } );
         else if(props.makegroup){
            axios.post('/coordinators/group/create/',DataForm,{
                  headers: {
                     Authorization: `Bearer ${localStorage.getItem('auth')}`,
                     'Content-Type': 'multipart/form-data'
                  }
               }
            )
               .then( response => {
                  // console.log(response)
                  setFormData({...formData,regSuccess:true})
               } )
               .catch( error => {
                  setFormData({...formData,error:true})
               } );
         }
         else if(props.personal || props.safety || props.groupInfo || props.applicationEdit){
            axios.patch(props.url,Data,{
               headers: {
                  Authorization: `Bearer ${localStorage.getItem('auth')}`
               }
            })
            .then(res=>{
               if((res.data.message==="Success" && res.data.status && (props.safety)) || props.groupInfo || props.personal || props.applicationEdit)
               setFormData({...formData,regSuccess:true})
               else
              {
               setMessage(res.data.message)
               setFormData({...formData,error:true})
            }
            })
            .catch(err=>{
               setMessage(err.message)
                     setFormData({...formData,error:true})
            })
         }
         else if(props.application){
            axios.post(props.url,Data,
             {headers: {
                  Authorization: `Bearer ${localStorage.getItem('auth')}`}})
                  .then(res=>{
                     setNextUrl(`/${props.match.params.lang}/${props.match.params.user}/myapps/1`);
                     setFormData({...formData,redirect:true});
                  })
                  .catch(err=>{
                     setFormData({...formData,error:true});
                  })
         }
   }

   const checkValidity = (value, rules) => {
      let isValid = true;
      if (!rules) {
         return true;
      }

      if (rules.required) {
         isValid = value.trim() !== '' && isValid;
      }

      if (rules.minLength) {
         isValid = value.length >= rules.minLength && isValid
      }

      if (rules.maxLength) {
         isValid = value.length <= rules.maxLength && isValid
      }

      if (rules.isNumeric) {
         const pattern = /^\d+$/;
         isValid = pattern.test(value) && isValid
      }
      if (rules.isEmail) {
         const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
         isValid = pattern.test(value) && isValid
      }
      if (rules.match) {
         isValid = value === formData.inputsForm[rules.match].value && isValid
      }

      return isValid;

   }
   const inputChangedHandler = (event, inputIdentifier) => {
      // console.log(event.target.files[0].name)
      const updatedOrderForm = {
         ...formData.inputsForm
      };
      const updatedFormElement = {
         ...updatedOrderForm[inputIdentifier]
      };
      if(updatedFormElement.elementConfig.type === 'file'){
         updatedFormElement.value = event.target.files;
      }
      else if(updatedFormElement.elementType === 'date')
      updatedFormElement.value = event;
      else
      updatedFormElement.value = event.target.value;
      updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
      updatedFormElement.touched = true;
      updatedOrderForm[inputIdentifier] = updatedFormElement;

      let formIsValid = true;
      for (let inputIdentifier in updatedOrderForm) {
         if (!updatedOrderForm[inputIdentifier].headLine)
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
      }
      if(props.groupInfo || props.personal || props.applicationEdit)
      formIsValid=true
      setFormData({ ...formData, inputsForm: updatedOrderForm, formIsValid: formIsValid });
   }

   const formElementsArray = [];
   for (let key in formData.inputsForm) {
      formElementsArray.push({
         id: key,
         config: formData.inputsForm[key]
      });
   }
   let form = (
       <form onSubmit={formHandler} encType='multipart/form-data'>
          <Grid container spacing={2}>
             {formElementsArray.map(formElement => {
                if(formElement.config.headLine)
                return(<Grid key={formElement.config} item xs={12}><div className={FormCss.ConfigTitle}> {formElement.config.title[lang]}
               { formElement.config.contentText?<p className={FormCss.contextText}>{formElement.config.contentText}</p>:null}
                </div></Grid>)
                else
                return (<Input
                     lang={lang}
                    key={formElement.id}
                    inputs={formElement.config.inputs}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    label={formElement.config.label}
                    value={formElement.config.elementConfig.type==='file' && formElement.config.value!==''?formElement.config.value.name:formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    disabled={formElement.config.disabled}
                    files={formElement.config.elementConfig.type==='file'}
                    changed={(event) => inputChangedHandler(event, formElement.id)}/>)
             })}
          </Grid>
          {props.registration ?
              <div style={{marginTop: '10px'}}>
                 <label className={FormCss.labelF}>{translations.accountType[lang]}</label>
                 <Grid container spacing={2}>
                    <Grid item xs={6}>
                       <Button  btnType={userType === 'volunteer' ? 'activeButton' : 'passiveButton'}
                               clicked={(e) =>{e.preventDefault();handleUserType('volunteer')}}>
                          {translations.volunteer[lang]}
                       </Button>
                  </Grid>
                  <Grid item xs={6}>
                     <Button btnType={userType === 'requester' ? 'activeButton' : 'passiveButton'}
                        clicked={(e) => { e.preventDefault(); handleUserType('requester') }}>
                        {translations.applicant[lang]}
                       </Button>
                  </Grid>
               </Grid>
            </div>
            : ''}
         <div style={{ marginTop: '10px' }} className={FormCss.agree}>
            <p className={FormCss.label}>
         {props.login ? ''
         // <a href="#" style={{ color: '#000', fontWeight: 'bold', textDecoration: 'none' }}>{translations.forgotPass[lang]}</a>
                  :
                  props.registration || props.makegroup ?
                      <Agreement lang={lang} />  : ''
                      }
            </p>
            {props.applicationEdit?
            <div >
               <Button btnType="Simple" clicked={props.handleClose}>
               {translations.cancel[lang]}
               </Button>
               <Button btnType="Yellow" >
               {translations.toSend[lang]}
               </Button>
            </div>
            :<Button btnType={formData.formIsValid ? 'Yellow' : 'Grey7'} disabled={!formData.formIsValid}>
               {props.application?translations.makeApplication[lang]:translations.ready[lang]}
            </Button>}

         </div>
      </form>
   );
   if (formData.redirect && (props.login  || props.registration || props.application)) {
   
      return (<Redirect to={nextUrl} />)
   }
   return (
      <Aux>
         {form}
         <Snackbar open={formData.regSuccess} handleOpen={handleSuccess} handleClose={handleClose}>
            <Alert elevation={6} variant="filled" onClose={handleClose} severity="success">{translations.successfullyreistered[lang]}</Alert>
         </Snackbar>
         <Snackbar open={formData.error} handleOpen={handleError} handleClose={handleClose}>
            <Alert elevation={6} variant="filled" onClose={handleClose} severity="error">{translations.wrong[lang]}</Alert>
            {/* {message} */}
         </Snackbar>
      </Aux>
   );
}

export default (Form);
