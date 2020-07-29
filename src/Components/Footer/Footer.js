import React, { useEffect, useState } from "react";
import Aux from '../../hoc/Wrapper';
import style from './Footer.module.css'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import logo from '../../assets/icons/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import insta from '../../assets/icons/socialMedia/instagram.svg'
import fb from '../../assets/icons/socialMedia/facebook-f.svg'
import tg from '../../assets/icons/socialMedia/telegram-plane.svg'
import translations from '../../Translation.json';

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '30vh',
   },
   footer: {
      padding: theme.spacing(3, 2),
      marginTop: 'auto',
      backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
   },
}));

function Footer(props) {
   const classes = useStyles();
   const [lang, setLang] = useState(props.match.params.lang ? props.match.params.lang : 'ru')
   useEffect(() => {
      setLang(props.match.params.lang ? props.match.params.lang : 'ru')
   }, [props.match.params.lang]);
   // let loc = useLocation();
   // if (loc.pathname === `/${:}`){
   //    console.log(true)
   // }else {console.log(false)}
   // console.log(props.location.pathname);
   return (
      <Aux>
         <div className={classes.root}>
            <footer className={classes.footer}>
               <div className={style.Footer}>
                  <Container maxWidth="lg">
                     <Grid container direction="row" spacing={4} justify="space-between" style={{ alignItems: 'center' }}>
                        <Grid item xl={2} lg={2} md={4} sm={3} xs={12} style={{ alignSelf: 'center' }}>
                           <Link to="/"><img src={logo} /></Link>
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={5} xs={12}>
                           <p className={style.auth}>{translations.allrights[lang]} © 2020</p>
                        </Grid>
                        <Grid item xl={3} lg={3} md={4} sm={4} xs={12}>
                           <ul>
                              <li>
                                 <a href="https://www.instagram.com/birdamlik_uz/" target="_blank"><img src={insta} /></a>
                              </li>
                              <li>
                                 <a href="https://fb.com/birdamlik" target="_blank"><img src={fb} /></a>
                              </li>
                              <li>
                                 <a href="https://t.me/birdamlik_uz" target="_blank"><img src={tg} /></a>
                              </li>
                           </ul>
                        </Grid>
                     </Grid>
                  </Container>
               </div>
            </footer>
         </div>
      </Aux>
   );
}

export default (Footer);