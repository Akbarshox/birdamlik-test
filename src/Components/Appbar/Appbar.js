import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { withStyles, withTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ScrollTo from "react-scroll-into-view";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import Appstyle from './Appbar.module.css';
import Aux from '../../hoc/Wrapper';
import logo from '../../assets/icons/logo.svg';
import SidebarDrawer from './SideDrawer/SideDrawer';
import MenuIcon from '../../assets/icons/bars.svg';
import Button from '../UI/Buttons/Buttons';
import Elevation from './Elevation.js';
import tick from "../../assets/icons/verified.svg";
import img from "../../assets/icons/user.svg";
import star from "../../assets/icons/StarYell.svg";
import translate from '../../Translation.json'
import axios from '../../API/api';
import { bottombarData } from '../../API/api';
import Snackbar from '../../Components/UI/Snackbar/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useSelector, useDispatch } from 'react-redux'

const styles = theme => ({
  appBar: {
    paddingRight: 0,
    paddingLeft: 0,
    alignItems: 'center'
  },
  shadow: {
    boxShadow: '0 2px 3px -2px #ccc'
  },
  toolbar: {
    paddingRight: 0,
    paddingLeft: 0,
    alignItems: 'center'

  },
  Applink: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',

  },
  menu_media: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  menuButton: {
    padding: '10px',
    alignSelf: 'center',
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  menuIcon: {
    [theme.breakpoints.down('xs')]: {
      width: 19
    }
  },
  middle: {
    alignItems: 'center',
    verticalAlign: 'middle'
  }
});


function Appbar(props) {
  const { classes, window } = props;
  const { lang, user, contenttype } = props.match.params;
  const { json } = props;
  const [right, setRight] = useState(false)
  const [open, setOpen] = useState(false)
  const [matches, setMatches] = useState(window ? window.innerWidth : null)
  const { groupInfo,notificationStatus } = useSelector(state => ({
    ...state.mainData
  }));
  const dispatch = useDispatch();
  const [groupData, setGroupData] = useState(groupInfo);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    if (!groupData && ["coordinator", "volunteer"].includes(props.match.params.user)) {
      axios.get(`/${props.match.params.user}s/group/info/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth')}`
        }
      })
        .then(res => {
          let data = { ...res.data }
          if(data.avatar)
          {
              if(!(data.avatar).includes("https://api.birdamlik.uz"))
              data.avatar=`https://api.birdamlik.uz${data.avatar}`;
          }
          else{
            data.avatar=img
          }
          setGroupData(data);

          dispatch({
            type: "MAINDATA",
            info: {
              groupInfo: data,
              groupEdit: data
            }
          })
        })
        .catch(err => {
          setMessage(err.message);
          setError(true)
        })
    }
  }, [props])

  const toggleDrawer = (side, open) => {
    setRight(open);
  };
  const handleError=()=>{
    setError(true)
  }
  const handleClose = () => {
    
    setError(false)
  };

  return (
    <Aux>
      <Elevation>
        <AppBar position="sticky" color="inherit" className={classes.appBar} >
          <Container maxWidth="lg">
            <Toolbar className={classes.toolbar}>
              <Grid container className={classes.middle}>
                <Grid item xl={2} lg={2} md={3} sm={4} xs={4}>
                  <Link to={user && contenttype ? "coordinator"===user?`/${lang}/${user}/appsfeed`:"volunteer"===user?`/${lang}/${user}/groupfeed`:`/${lang}/${user}/myapps` : `/${props.match.params.lang}`}><img className={Appstyle.logo} src={logo} /></Link>
                </Grid>
                <Grid item xl={1} lg={1} md={2} sm={4} xs={6}>
                  <Link
                    to={user && contenttype ? lang === 'ru' ? `/uz/${user}/${contenttype}` : `/ru/${user}/${contenttype}` : lang === 'ru' ? (props.match.url).replace('/ru','/uz') : (props.match.url).replace('/uz','/ru')}
                    className={Appstyle.lang}> {translate.changeLang[lang]}</Link>
                </Grid>
                <Grid item xl={9} lg={9} md={7} sm={4} xs={2} className={classes.Applink}>
                  <ul className={Appstyle.menu + ' ' + classes.menu_media}>
                    {json.length !== 0 ? json.map((element, i) =>
                      <li key={i}>
                        <img src={element.icon1} className={Appstyle.ring} />
                        <ScrollTo selector={element.scroll}>
                          <Link
                            to={props.match.params.user ? `/${lang}/${props.match.params.user}/${element.link}` : `/${lang}/${element.link}`}>
                            <Button
                              btnType={contenttype === element.link ? element.active : element.css}>
                              {element.name[lang]}
                            </Button>
                          </Link>
                        </ScrollTo>
                        {notificationStatus!=='not set' && notificationStatus?<img src={element.icon2} className={Appstyle.ellipse} />:''}
                      </li>
                    ) : null}
                  </ul>
                  {props.match.path === '/:lang/:user/:contenttype' && props.matches === true && groupData ?
                    <ul className={Appstyle.socialCareList}>
                      <li>
                        <img src={groupData.avatar} className={Appstyle.avagr} alt="group"  />
                        <p><span className={Appstyle.Socialcare}>{groupData.title} {groupData.is_verified?<img src={tick} style={{width:10,height:10}}/>:null}</span> <br />
                          <img src={star} alt="starYell"
                            style={{ marginRight: '5px' }} />
                          <span className={Appstyle.titleStar}>{groupData.stars} звезд </span>
                        </p>
                      </li>
                    </ul>
                    : null}
                  {props.match.path !== '/:lang/:user/:contenttype' ?
                    <IconButton
                      onClick={() => toggleDrawer('right', true)}
                      className={classes.menuButton}>
                      <img src={MenuIcon} className={classes.menuIcon} />
                    </IconButton> : null}
                </Grid>
              </Grid>
              <SidebarDrawer json={json} {...props} right={right} toggleDrawer={toggleDrawer} />
            </Toolbar>
          </Container>
        </AppBar>
      </Elevation>
      <Snackbar open={error} handleOpen={handleError} handleClose={handleClose}>
          <Alert elevation={6} variant="filled" onClose={handleClose} severity="error">{translate.error[lang]}</Alert>
      </Snackbar> 
    </Aux>
  );

}

export default (withStyles(styles)(Appbar));