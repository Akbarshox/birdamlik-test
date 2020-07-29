import React, {useEffect, useState} from "react";
import Aux from '../../hoc/Wrapper';
import Grid from '@material-ui/core/Grid';
import style from './About.module.css';
import image1 from '../../assets/icons/help.svg'
import image2 from '../../assets/icons/bonus.svg'
import image3 from '../../assets/icons/gifts.svg'
import Button from '../UI/Buttons/Buttons'
import {Link} from 'react-router-dom'
import translations from '../../Translation.json';


function About(props) {
   const [lang, setLang] = useState(props.match.params.lang ? props.match.params.lang : 'ru')
   useEffect(() => {
      setLang(props.match.params.lang ? props.match.params.lang : 'ru')
   }, [props.match.params.lang]);
   return (
       <Aux>
          <div id="about">
             <Grid container justify="center">
                <Grid item xl={6} lg={6} md={8} sm={12} xs={12}>
                   <div className={style.aboutUs}>
                      <h1>{translations.aboutProject[lang]}</h1>
                      <p>{translations.platformProvides[lang]}</p>
                   </div>
                </Grid>
             </Grid>
             <Grid container justify="center" spacing={4}>
                <Grid item xl={3} lg={3} md={4} sm={8} xs={12}>
                   <div className={style.card}>
                      <img src={image1}/>
                      <h3>{translations.help[lang]}</h3>
                      <p>{translations.getTasks[lang]}</p>
                      {/* <Button btnType="Grey"> {translations.tryBtn[lang]}</Button> */}
                   </div>
                </Grid>
                <Grid item xl={3} lg={3} md={4} sm={8} xs={12}>
                   <div className={style.card}>
                      <img src={image2}/>
                      <h3>{translations.getPoints[lang]} </h3>
                      <p>{translations.increasePoints[lang]}</p>
                      {/* <Button btnType="Grey">{translations.learnMore[lang]}  </Button> */}
                   </div>
                </Grid>
                <Grid item xl={3} lg={3} md={4} sm={8} xs={12}>
                   <div className={style.card}>
                      <img src={image3}/>
                      <h3>{translations.getPrizes[lang]}</h3>
                      <p>{translations.getCoupon[lang]}</p>
                      <div className={style.cardBtn}>
                         <Link to={`/${lang}/sponsors`}><Button
                             btnType="Grey">{translations.openListofSpon[lang]} </Button></Link>
                      </div>
                   </div>
                </Grid>
             </Grid>
          </div>
       </Aux>
   );
}

export default About;