import React, { useEffect, useState } from 'react';
import Aux from '../../hoc/Wrapper';
import style from './nf.module.css';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Button from '../../Components/UI/Buttons/Buttons'
import translations from '../../Translation.json'



function Nopage({ match }) {
  // console.log(match);
  const [lang, setLang] = useState(match.params.lang ? match.params.lang : 'ru')
  useEffect(() => {
    setLang(match.params.lang ? match.params.lang : 'ru')
  }, [match.params.lang]);
  return (
    <Aux>
      <div className={style.notFoundContent}>
        <Container maxWidth="lg">
          <Grid container>
            <Grid item xl={3} lg={3} md={4} sm={12} xs={12} >
              <p className={style.nfinfo}>{translations.notFound[lang]}</p>
              <h1>{translations.noPage[lang]}</h1>
              <p className={style.return}>{translations.goMainPage[lang]} <Link to="/">{translations.goMainPage.mainpage[lang]}</Link></p>
              <Link to={"/login"}><Button btnType="Yellow2" >{translations.getAuth[lang]}</Button></Link>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Aux>
  );
}

export default Nopage;