import React, { useState, useEffect } from 'react';
import Form from "./Form";
import style from './MakeGroup.module.css'
import Grid from '@material-ui/core/Grid';
import translations from '../../Translation.json';
import districts from '../../districts.json';

export default function MakeGroupForm(props) {
  const [lang,setLang]=useState(props.match?props.match.params.lang:'ru');
  const districtsOptions=[]
  districts.map(d=>{
    districtsOptions.push({value:d[lang],
    displayValue:d[lang]})
  })
  useEffect(()=>{
    setLang(props.match.params.lang)
  },[props.match.params])
  const inputsForm = {
    headLine:{
      headLine:true,
      title:{
        ru:"Основная информация",
      uz:"Asosiy ma’lumot"},
      contentText:null
    },
    title: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: translations.enterGroupName[lang]
      },
      label:translations.groupName[lang],
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      disabled: false
    },
    mission: {
      elementType: 'textarea',
      elementConfig: {
        type: 'text',
        placeholder: translations.inputDescription[lang]
      },
      label: translations.mission[lang],
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      disabled: false
    },
    avatar: {
      elementType: 'input',
      elementConfig: {
        type: 'file',
        accept:"image/*",
        title: translations.chooseFile[lang],
      },
      label: translations.avatarGroup[lang],
      value: '',
      validation: {
        //required: true
      },
      valid: false,
      touched: false,
      disabled: false
    },
    headLine1:{
      headLine:true,
      title:{
        ru:"Опыт и команда",
      uz:"Tajribangiz va jamoyingiz"},
      contentText:null
    },
    description: {
      elementType: 'textarea',
      elementConfig: {
        type: 'text',
        placeholder: translations.inputDescription[lang]
      },
      label: translations.inputDescription[lang],
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      disabled: false
    },
    experience: {
      elementType: 'textarea',
      elementConfig: {
        type: 'text',
        placeholder: translations.inputDescription[lang]
      },
      label: translations.prevExperience[lang],
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      disabled: false
    },
    about_team: {
      elementType: 'textarea',
      elementConfig: {
        type: 'text',
        placeholder: translations.inputDescription[lang]
      },
      label: translations.aboutTeam[lang],
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      disabled: false
    },
    headLine2:{
      headLine:true,
      title:{
        ru:"Реквизиты",
      uz:"Rekvizitlar"},
      contentText:null
    },
    city: {
      elementType: 'select',
      elementConfig: {
        options: [
            {value: '', displayValue: translations.chooseCity[lang],selected:true},
            ...districtsOptions
        ]
      },
      label: translations.city[lang],
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      disabled: false
    },
    address: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: translations.inputAddress[lang]
      },
      label: translations.address[lang],
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      disabled: false
    },
    passport_series:{
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: translations.passportSeries[lang]
      },
      label: "",
      value: '',
      validation: {
        required: true,
        minLength: 2,
        maxLength: 2,
      },
      valid: false,
      touched: false,
      disabled: false
    },
   passport_number:{
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: translations.passportNum[lang]
      },
      label: translations.passportSerie[lang],
      value: '',
      validation: {
        required: true,
        minLength: 7,
        maxLength: 7,
        isNumeric: true
      },
      valid: false,
      touched: false,
      disabled: false
    },
      // label: "Серия и Номер паспорта",
     
    passport_copy: {
      elementType: 'input',
      elementConfig: {
        type: 'file',
        accept:"image/*",
        placeholder: translations.chooseFile[lang]
      },
      label: translations.copyOfPassport[lang],
      value: '',
      validation: {
       // required: true
      },
      valid: false,
      touched: false,
      disabled: false
    },
    phone: {
      elementType: 'phone',
      elementConfig: {
        type: 'text',
        placeholder: '+ 998 (__) ___ - __ - __'
      },
      label: translations.phone.label[lang],
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      disabled: false
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: translations.emailInput.placeolder[lang]
      },
      label: translations.emailInput.label[lang],
      value: '',
      validation: {
        required: true,
        isEmail:true
      },
      valid: false,
      touched: false,
      disabled: false
    },
    headLine3:{
      headLine:true,
      title:{
        ru:"Завершить",
      uz:"Tugatish"},
      contentText:translations['48Hour'][lang]
    },
  }

  return (
    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
      <div className={style.makeGroup}>
        <Form makegroup={true} inputsForm={inputsForm} {...props} />
      </div>
    </Grid>
  );
}
