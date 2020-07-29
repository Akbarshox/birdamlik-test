import React, { useState, useEffect } from 'react';
import Form from './Form';
import translations from '../../Translation.json';

export default function RegistrationForm(props) {
   const [lang, setLang] = useState(props.match.params.lang ? props.match.params.lang : 'ru')
   useEffect(() => {
      setLang(props.match.params.lang)
   }, [props.match.params.lang]);
   const inputsForm = {
      fio: {
         elementType: 'input',
         elementConfig: {
            type: 'text',
            placeholder: translations.fullName.placeolder[lang]
         },
         label:  translations.fullName.label[lang],
         value: '',
         validation: {
            required: true
         },
         valid: false,
         touched: false,
         disabled: false
      },
      username: {
         elementType: 'phone',
         elementConfig: {
            type: 'text',
            placeholder: translations.phone.placeolder[lang]
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
      password: {
         elementType: 'input',
         elementConfig: {
            type: 'password',
            placeholder: translations.password.placeolder[lang]
         },
         label: translations.password.label[lang],
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
            placeholder: translations.verifyPassword.placeolder[lang]
         },
         label: translations.verifyPassword.label[lang],
         value: '',
         validation: {
            required: true,
            match: "password"
         },
         valid: false,
         touched: false,
         disabled: false
      }
   }

   return (
      <div>
         <Form registration={true} inputsForm={inputsForm} {...props} url="/accounts/register/" />
      </div>
   );
}