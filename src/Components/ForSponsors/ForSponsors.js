import React, { useEffect, useState } from "react";
import Aux from '../../hoc/Wrapper';
import Grid from '@material-ui/core/Grid';
import style from './ForSponsors.module.css';
import Button from '../UI/Buttons/Buttons'
import translations from '../../Translation.json'

function ForSponsors(props) {
  const [lang, setLang] = useState(props.match.params.lang ? props.match.params.lang : 'ru')
  useEffect(() => {
    setLang(props.match.params.lang ? props.match.params.lang : 'ru')
  }, [props.match.params.lang]);
  return (
    <Aux>
      <Grid container justify="center" id="for_sponsors">
        <Grid item xl={6} lg={6} md={8} sm={12} xs={12} >
          <div className={style.forSponsors}>
            <h1>{translations.forSponsors[lang]}</h1>
            <p>{translations.helpVolunteers[lang]}</p>
            {/* <Button btnType="Yellow">
              {translations.rules[lang]}
            </Button> */}
          </div>
        </Grid>
      </Grid>
    </Aux>
  );
}
export default ForSponsors;