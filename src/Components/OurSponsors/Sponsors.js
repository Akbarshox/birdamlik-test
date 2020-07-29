import React, { useEffect, useState } from "react";
// import { sponsorsData } from "./sponsorsData";
import Aux from '../../hoc/Wrapper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import style from './Sponsors.module.css';
import Button from '../../Components/UI/Buttons/Buttons'
import Card from '../../Components/UI/Card/Card'
import Appbar from '../../Components/Appbar/Appbar'
import ShowMore from '../../Components/UI/ShowMore/ShowMore.js'
import translations from '../../Translation.json';
import axios from '../../API/api.js';
import returnimg from '../../assets/icons/return.svg';
import userImg from '../../assets/icons/user.svg';
import eco from "../../assets/icons/Eco.svg";
import Snackbar from '../UI/Snackbar/Snackbar';
import Alert from '@material-ui/lab/Alert';

function Sponsors(props) {
  const [lang, setLang] = useState(props.match.params.lang ? props.match.params.lang : 'ru')
  const [sponsorsData, setSponsorsData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLang(props.match.params.lang ? props.match.params.lang : 'ru');
     axios.get(`/misc/sponsors/`)
        .then(res => {
          let data = res.data.results ? res.data.results : [];
          for (let i = 0; i < data.length; i++) {
            if (data[i].logo) {
              if (!(data[i].logo).includes('https://api.birdamlik.uz'))
                data[i].logo = `https://api.birdamlik.uz${data[i].logo}`
            }
            else
              data[i].logo = eco
          }
          setSponsorsData(res.data.results);
        })
        .catch(err => {
          setError(true)
          // console.log(err);
        })
       
  }, [props.match]);
  const handleError = () => {
    setError(true)
  }
  const handleClose = () => {

    setError(false)
  };
  const appbarData = [
    {
      css: "Simple",
      link: ``,
      scroll: '',
      name: {
        en: "",
        ru: "Назад",
        uz: "Ortga"
      },
      icon1: null,
      icon2: null,
    }
    // ,
    // {
    //   css: "Yellow",
    //   link: ``,
    //   scroll: '',
    //   name: {
    //     en: "",
    //     ru: "Стать спонсором",
    //     uz: "Homiy bolish"
    //   },
    //   icon1: null,
    //   icon2: null,
    // }
  ];

  return (
    <Aux>
      <Appbar json={appbarData} {...props} />
      <Container maxWidth="lg">
        <div className={style.ChooseGroup}>
          <Grid container justify="center" alignItems="center">
            <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
              <h1 className={style.Header}> {translations.OurSponsors[lang]}</h1>
            </Grid>
          </Grid>
          <Grid container spacing={3} justify={sponsorsData && sponsorsData.length > 4 ? "left" : "center"}>
            {sponsorsData && sponsorsData.length ? sponsorsData.map((group, i) => {
              return (
                <Grid key={i} item xl={3} lg={3} md={6} sm={6} xs={12}>
                  <Card cardType="col-3">
                    <img src={group.logo} className={style.ava} alt="logo" />
                    <h3>{group.title}</h3>
                    <h6>
                      {group.offer}
                    </h6>
                    <ShowMore moreType="chooseGroup" {...props}>
                      <p className={style.description}>{group.description}</p>
                    </ShowMore>
                  </Card>
                </Grid>)
            }) : <div className={style.nothingfound}>
            <p>{translations.besponsor[lang]}
              <img src={returnimg} alt="logo" className={style.retlogo} />
            </p>
          </div>}
          </Grid>
        </div>
      </Container>
      <Snackbar open={error} handleOpen={handleError} handleClose={handleClose}>
        <Alert elevation={6} variant="filled" onClose={handleClose} severity="error">{translations.error[lang]}</Alert>
      </Snackbar>
    </Aux>
  );
}

export default Sponsors;