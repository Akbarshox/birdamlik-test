import React, { useEffect, useState } from "react";
import Aux from '../../hoc/Wrapper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import style from './Group.module.css';
import Button from '../../Components/UI/Buttons/Buttons'
import Card from '../../Components/UI/Card/Card'
import Appbar from '../../Components/Appbar/Appbar'
import tick from '../../assets/icons/verified.svg'
import axios from '../../API/api';
import ShowMore from '../../Components/UI/ShowMore/ShowMore.js'
import translations from '../../Translation.json'
import Snackbar from '../../Components/UI/Snackbar/Snackbar';
import Alert from '@material-ui/lab/Alert';
import returnimg from '../../assets/icons/return.svg';
import { Link } from 'react-router-dom';
function ChooseGroup(props) {
  const appbarData = [
    {
      css: "Simple",
      link: 'auth',
      scroll: '',
      name: {
        en: "Back",
        ru: "Назад",
        uz: "Ortga"
      },
      icon1: null,
      icon2: null,
    },
    {
      css: "Yellow",
      link: `newgroup`,
      scroll: '',
      name: {
        en: "",
        ru: "Создать группу",
        uz: "Guruh yaratish	"
      },
      icon1: null,
      icon2: null,
    }
  ];

  const [dataGot, setDataGroups] = useState(false)
  const [grouplist, setGroupList] = useState([])
  const [lang, setLang] = useState(props.match.params.lang ? props.match.params.lang : 'ru');
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    if (!grouplist.length) {
      axios.get('/volunteers/group/list/', {
        headers: { Authorization: `Bearer ${localStorage.getItem('auth')}` }
      })
        .then((res) => {
          // console.log(res)
          setGroupList(res.data.results)
        })
        .catch(err => {

          setMessage(err.message);
          setError(true)
        })
    }
    setLang(props.match.params.lang ? props.match.params.lang : 'ru')

  }, [props.match.params.lang])
  const handleJoinReq = (id) => {
    axios.post('/volunteers/group/request/', { group: id }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('auth')}` }
    })
      .then(res => {
        axios.get('/volunteers/group/list/', {
          headers: { Authorization: `Bearer ${localStorage.getItem('auth')}` }
        })
          .then((res) => {
            // console.log(res)
            setGroupList(res.data.results)
          })
          .catch(err => {

            setMessage(err.message);
            setError(true)
          });
      })
      .catch(err => {
        setMessage(err.message);
        setError(true)
      })
  }
  const handleError = () => {
    setError(true)
  }
  const handleClose = () => {

    setError(false)
  };
  return (
    <Aux>
      <Appbar json={appbarData} {...props} />
      <Container maxWidth="lg">
        <div className={style.ChooseGroup}>
          <Grid container justify="center" alignItems="center">
            <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
              <h1 className={style.Header}> {translations.chooseGroup[lang]}</h1>
            </Grid>
          </Grid>
          <Grid container spacing={4} justify={grouplist.length > 4 ? "left" : "center"}>
            {
              grouplist.length == 0 ? <div className={style.nothingfound}>
                <Link to={`/${lang}/newgroup`} style={{ textDecoration: 'none', color: '#333' }}>  <p>{translations.nothingfound[lang]}
                  <img src={returnimg} alt="logo" className={style.retlogo} />
                </p></Link>
              </div> :
                grouplist.map((group, i) => {
                  return (<Grid key={i} item xl={3} lg={3} md={6} sm={6} xs={12}>
                    <Card cardType="col-3">
                      <img src={group.avatar} className={style.ava} />
                      <h3>{group.title} {group.is_verified?<img src={tick} style={{width:10,height:10}}/>:null}</h3>
                      <h6>
                        {group.staff_count} {translations.members[lang]} | {translations.rating[lang]}: {Math.round(group.rate)}
                      </h6>
                      <ShowMore moreType="chooseGroup" {...props}>
                        <p className={style.description}>{group.description}</p>
                      </ShowMore>
                      <Button clicked={() => handleJoinReq(group.id)} btnType={!group.requested ? "Grey" : "passiveButton"} disabled={group.requested}>
                        {group.requested ? translations.send[lang] : translations.enter[lang]}
                      </Button>
                    </Card>
                  </Grid>)
                })
            }

            {/* : <Redirect to={`/${props.match.params.lang}/auth`}/> */}
          </Grid>
        </div>
      </Container>
      <Snackbar open={error} handleOpen={handleError} handleClose={handleClose}>
        <Alert elevation={6} variant="filled" onClose={handleClose} severity="error">{translations.error[lang]}</Alert>
      </Snackbar>
    </Aux>
  );
}
export default (ChooseGroup);