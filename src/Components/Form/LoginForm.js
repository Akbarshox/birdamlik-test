import React, { useState, useEffect } from 'react';
import Form from "./Form";
import translations from '../../Translation.json';

export default function LoginForm(props) {
  const [lang, setLang] = useState(props.match.params.lang ? props.match.params.lang : 'ru')
  useEffect(() => {
    setLang(props.match.params.lang ? props.match.params.lang : 'ru')
 }, [props.match.params.lang]);
   const inputsForm= {
      username: {
         elementType: 'phone',
         elementConfig: {
             type: 'text',
             placeholder: translations.enterPhone.placeolder[lang]
         },
         label:translations.enterPhone.label[lang],
         value: '',
         validation: {
             required: true
         },
         valid: false,
         touched: false,
         disabled:false
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
         }
    }
   return (
       <div>
          <Form login={true} inputsForm={inputsForm} url="/accounts/login/" {...props}/>
       </div>
   );
}