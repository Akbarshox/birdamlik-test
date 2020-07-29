import React, { useEffect, useState } from "react";
import Aux from '../../hoc/Wrapper';
import Grid from '@material-ui/core/Grid';
import style from './ForVolunteers.module.css';
import Regform from '../Form/RegistrationForm'
import translations from '../../Translation.json';



function ForVolunteers(props) {
  const [lang, setLang] = useState(props.match.params.lang ? props.match.params.lang : 'ru')
  useEffect(() => {
    setLang(props.match.params.lang ? props.match.params.lang : 'ru')
  }, [props.match.params.lang]);
  return (
    <Aux>
      <Grid container justify="center" id="for_volunteer">
        <Grid item xl={8} lg={8} md={8} sm={12} xs={12} >
          <div className={style.forVolunteers}>
            <Grid container justify="center">
              <Grid item xl={7} lg={7} md={10} sm={10} xs={12} style={{ justifyContent: 'flex-end' }}>
                <div className={style.form}>
                  <h1>{translations.register[lang]}</h1>
                  {/* <p className={style.info}>Станьте волонтером за пару кликов!</p> */}
                  <Regform {...props} />
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Aux>
  );
}
export default ForVolunteers;