import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import style from './ApplicationForm.module.css';
import Aux from '../../hoc/Wrapper';
import LeftSidebar from '../LeftSideBar/LeftSidebar'
import RightContent from '../RightContentInfo/ImgInfo';
import Form from '../Form/Form';
import translations from '../../Translation.json';
import axios from '../../API/api';
import {useDispatch} from 'react-redux';

export default function ApplicationForm(props) {
  const [matchParams, setMatchParams] = useState(props.match.params);
  const [lang, setLang] = useState(props.match.params?props.match.params.lang:'ru');
  const inputsForm= {
    headLine:{
      headLine:true,
      title:{
        ru:"Создать заявку",
      uz:"Yangi so'rovnoma"},
      contentText:null
    },
    title: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: translations.inputRequest[lang]
      },
      label: translations.requestTitle[lang],
      value: '',
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
        placeholder: translations.inputDescription[lang]
      },
      label: translations.describeDetail[lang],
      value: '',
      valid: true,
      touched: false,
      disabled: false
    },
    count: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: '0'
      },
      label: translations.numVolunteer[lang],
      value: 1,
      validation: {
        
        isNumeric: true
      },
      valid: true,
      touched: false,
      disabled: false
    },
    deadline: {
      elementType: 'date',
      elementConfig: {
        type: 'text',
        placeholder:translations.inputDate[lang]
      },
      label: translations.deadline[lang],
      value: new Date(),
     
      valid: true,
      touched: false,
      disabled: false
    }
  }
  
  useEffect(() => {
    setLang(props.match.params.lang)
  }, [props.match]);
  return (
    <Aux>
        <LeftSidebar matchParams={{...matchParams,contenttype:'application'}} {...props}/>
        <Grid item xl={4} lg={4} md={6} sm={12} xs={12} style={{justifyContent: 'center'}}>
                <Form application={true} url={'/requesters/post/create/'} inputsForm={inputsForm} {...props}/>
            </Grid>
        <RightContent {...props} matchParams={matchParams}/>
    </Aux>
  );
}