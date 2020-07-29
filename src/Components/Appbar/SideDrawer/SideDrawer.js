import React, { useState, useEffect } from 'react';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import style from "./SideDrawer.module.css";
import blackstar from "../../../assets/icons/BlackStar.svg";
import logout from "../../../assets/icons/logout.svg";
import settings from "../../../assets/icons/Settings.svg";
import img from "../../../assets/icons/user.svg";
import Button from "../../UI/Buttons/Buttons";
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../../API/api';
import Aux from '../../../hoc/Wrapper';
import translate from '../../../Translation.json';
import ScrollTo from "react-scroll-into-view";
import Snackbar from '../../UI/Snackbar/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Redirect } from 'react-router-dom';
import translations from '../../../Translation.json'

const drawerWidth = 240;


const theme = createMuiTheme({
  overrides: {
    MuiDrawer: {
      paper: {
        background: '#FFD600',
        overflowX: 'hidden'
      }
    },
    MuiExpansionPanelSummary: {
      root: {
        height: 44,
        minHeight: 44,
        padding: 0,
      }
    },
    MuiPaper: {
      elevation1: {
        boxShadow: 'none'
      }
    },
    MuiExpansionPanel: {
      rounded: {
        background: '#FFD600',
      }
    },
    MuiIconButton: {
      root: {
        color: "#333!important"
      }
    },
    MuiButtonBase: {
      root: {
        color: "#333",
      }
    }
  }
});


const muiStyles = theme => ({

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    background: '#FFD600',
    color: '#333',
    height: '100%',
    paddingRight: 10,
    paddingLeft: 10,
  },
  langList: {
    display: 'flex',
  },
  langText: {
    fontSize: '0.88em!important'
  },
  navLinks: {
    paddingTop: 12,
    paddingBottom: 12,
    fontWeight: '600'
  },
  navList: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.5)'
  },
  menuLinks: {
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: '0.88em!important'
  },
  mail: {
    display: 'flex',
    opacity: '0.7'
  },
  phone: {
    opacity: '0.7',
    alignItems: 'center'
  },
  paragraph: {
    marginLeft: 10,
    marginBottom: '0px',
    marginTop: '0px',
    display: 'inline-block',
    opacity: '0.7'
  }
});

function TemporaryDrawer(props) {
  const { classes } = props;
  const [lang, setLang] = useState(props.match.params.lang);
  const [params, setParams] = useState(null);
  const [right, setRight] = useState(props.right);
  const { currentUser } = useSelector(state => ({
    ...state.mainData
  }));
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(currentUser);
  const [jsonSide, setSidebar] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [open, setDialogOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errMessage, setErrorMess] = useState(null);
  const handleError = () => {
    setError(true)
  }
  const handleOpen = () => {
    setDialogOpen(true)
  }
  const handleClose = () => {
    setDialogOpen(false);
    setError(false)
  }
  useEffect(() => {
    setSidebar(props.json)
    if (right != props.right)
      setRight(props.right)

    if (props.match.params.lang != lang)
      setLang(props.match.params.lang);
    if (props.match.params != params)
      setParams(props.match.params);
    if (currentUser) {
      setUserData(currentUser);
    }
    else if (props.match.params.use) {
      axios.get('/profile/', {
        headers: { Authorization: `Bearer ${localStorage.getItem('auth')}` }
      })
        .then(res => {
          let data = { ...res.data.profile, email: res.data.email, has_group: res.data.has_group }
          if (data.avatar) {
            if (!(data.avatar).includes("https://api.birdamlik.uz"))
              data.avatar = `https://api.birdamlik.uz${data.avatar}`;
          }
          else {
            data.avatar = img
          }
          if (props.match.params.user === 'applicant' || (res.data.has_group && res.data.group_activated && props.match.params.user === 'coordinator') || (res.data.has_group && props.match.params.user === 'volunteer')) {
            if (userData !== data) {
              setUserData(data)
              setRedirect(false)
            }
          }
          else {
            setRedirect(`/${props.match.params.lang}/groups`);
          }
          dispatch({
            type: "MAINDATA",
            info: {
              currentUser: data,
              editProfile: data
            }
          })
        })
        .catch(err => {
          setErrorMess(err)
          setError(true)
          setRedirect(`/${props.match.params.lang}/auth`);
        })
    }
  }, [props.match, props.right, props.json]);
  const handleLang = () => {
    if (lang === 'ru')
      setLang('uz');
    else
      setLang('ru')
  }
  const handleLogOut = () => {
    setRedirect(`/${props.match.params.lang}/auth`);
    setDialogOpen(false)
  }
  const handleBack = () => {
    props.history.goBack();
    props.toggleDrawer('right', false)
  }
  if (redirect)
    return (<Redirect to={redirect} />)
  else
    return (
      <MuiThemeProvider theme={theme}>
        <Drawer anchor="right" open={props.right} onClose={() => props.toggleDrawer('right', false)}>
          <div
            className={classes.drawer}
            role="presentation"
          >
            <Grid container spacing={1} className={style.gridCenter} justify="center">
              <Grid item xs={12}>
                {params ? <Link
                  to={params.user && params.contenttype ? lang === 'ru' ? `/uz/${params.user}/${params.contenttype}` : `/ru/${params.user}/${params.contenttype}` : lang === 'ru' ? '/uz' : '/ru'}
                  className={style.lang} onClick={handleLang}> {translate.changeLang[lang]}</Link>
                  : 'No data1'}</Grid>
              {params && !params.user ?
                jsonSide.map((n, i) => {
                  return (
                    <Grid key={i} item xs={12} className={style.myProfile} >
                      <ScrollTo selector={n.scroll}>
                        <Link to={`/${lang}/${n.link}`}>
                          <Button btnType="sideBarButton">
                            <img src={n.icon1} alt="" /> <span> {n.name[lang]}</span>
                          </Button>
                        </Link></ScrollTo>
                    </Grid>
                  )
                }
                ) : ''}
              {params && params.user ?
                <Aux>
                  {userData ? <Grid item xs={12} style={{ justifyItems: "center", alignItems: "center" }} className={classes.Block}>
                    <div className={classes.paper3}>
                      <ul className={style.rightgrid}>
                        <li>
                          <div className={style.circle}>
                            <img className={style.large} src={userData.avatar} />
                          </div>
                        </li>
                        <li>
                          <p className={style.name}>{userData.fio}</p>
                        </li>
                        {/* <li>
                                    <p className={style.title}>Рядовой</p>
                                 </li> */}
                        <li>
                          <p className={style.rank}><img src={blackstar} alt="blackstar" /> {userData.star_total}</p>
                        </li>
                        <li>
                          <p className={style.bio}>{userData.about}</p>
                        </li>
                      </ul>
                    </div>
                  </Grid> : ''}
                  {jsonSide.map(el => el.userType === params.user ? el.data ?
                    el.data.slice(3, el.data.length).map((n, i) => {
                      if (n.link === 'back') {
                        return (
                          <Grid key={i} item xs={12} className={style.myProfile} onClick={handleBack}>
                            <Button btnType="sideBarButton">
                              <img src={n.icon1} alt="" style={{ verticalAlign: 'middle' }} /> <span> {n.name[lang]}</span>
                            </Button>

                          </Grid>)
                      }
                      else if (n.link !== 'settings' && n.link !== 'out')
                        return (
                          <Grid key={i} item xs={12} className={style.myProfile} onClick={() => props.toggleDrawer('right', false)}>
                            <Link to={`/${lang}/${params.user}/${n.link}`}>
                              <Button btnType="sideBarButton">
                                <img src={n.icon1} alt="" /> <span> {n.name[lang]}</span>
                              </Button>
                            </Link>
                          </Grid>)
                    }
                    ) : ''
                    : '')}
                  <Grid item xs={12} className={style.settings} onClick={() => props.toggleDrawer('right', false)}>
                    <Link to={`/${lang}/${params.user}/settings`}>
                      <Button btnType="sideBarButtonBold">
                        <img src={settings} alt="" /> <span> {translate.settings[lang]}</span>
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item xs={12} className={style.logOut} onClick={handleOpen}>
                    <Button btnType="sideBarButtonBold">
                      <img src={logout} alt="" /><span> {translations.log_out[lang]}</span>
                    </Button>
                  </Grid>
                </Aux> : ''}
            </Grid>
          </div>
          <Snackbar open={error} handleOpen={handleError} handleClose={handleClose}>
            <Alert elevation={6} variant="filled" onClose={handleClose} severity="error">{translations.error[lang]}</Alert>
          </Snackbar>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{translations.wannaleave[lang]}</DialogTitle>
            <DialogActions>
              <Button clicked={handleClose} btnType="Grey">
                {translations.cancel[lang]}
              </Button>
              <Button clicked={handleLogOut} btnType="Yellow">
                {translations.yes[lang]}
              </Button>
            </DialogActions>
          </Dialog>
        </Drawer>
      </MuiThemeProvider>
    );
}


export default (withStyles(muiStyles)(TemporaryDrawer));