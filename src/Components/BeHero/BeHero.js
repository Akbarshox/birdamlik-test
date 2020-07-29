import React, {useEffect, useState} from "react";
import Aux from '../../hoc/Wrapper';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import Button from '../../Components/UI/Buttons/Buttons';
import helpinghands from '../../assets/helpinghands.svg';
import style from './BeHero.module.css'
import ScrollTo from 'react-scroll-into-view';
import translate from '../../Translation.json';

const styles = theme => ({
   imageBg: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    imageBgMedia:{
      [theme.breakpoints.down('sm')]: {
         display: 'block',
         marginTop: '7%'
       },
       [theme.breakpoints.up('md')]: {
         display: 'none',
       },
    },
    joinUs:{
      [theme.breakpoints.down('md')]: {
         textAlign: 'center'
       },
    }
});

function BeHero(props) {
   const {classes} = props;
    const [lang, setLang] = useState(props.match.params.lang?props.match.params.lang:'ru');
     useEffect(()=>{
       setLang(props.match.params.lang?props.match.params.lang:'ru')
     },[props.match.params.lang]);
   return (
       <Aux>
          <div  className={style.Content}>
             <Grid container spacing={4}>
             <Grid item xl={6} lg={6} md={6} sm={12} xs={12} style={{textAlign: 'center'}} className={classes.imageBgMedia}>
                   <img src={helpinghands}/>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12} style={{alignSelf: 'center'}} className={classes.joinUs}>
                   <h1 className={style.title}>
                     {translate.beHero[lang]}
                   </h1>
                   <p className={style.info}>
                      {translate.helpPeople[lang]}
                   </p>
                   <Link to={`${props.match.url}/auth`}>
                      <Button btnType="Yellow">
                           <ScrollTo selector={`#volunteer`}>
                              {translate.tryBtn[lang]}
                           </ScrollTo>
                        </Button>
                   </Link>                       
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12} style={{textAlign: 'center'}} className={classes.imageBg}>
                   <img src={helpinghands}/>
                </Grid>
             </Grid>
          </div>
       </Aux>
   );
   
}


export default (withStyles(styles)(BeHero));