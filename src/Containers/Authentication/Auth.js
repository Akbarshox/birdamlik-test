import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { MuiThemeProvider } from "@material-ui/core";
import { Link } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import RegistrationForm from "../../Components/Form/RegistrationForm";
import LoginForm from "../../Components/Form/LoginForm";
import Appstyle from "../../Components/Appbar/Appbar.module.css";
import logo from '../../assets/icons/logo.svg';
import FormCss from "../../Components/Form/Form.module.css";
import translations from '../../Translation.json'

const themeLight = createMuiTheme({
   palette: {
      background: {
         default: "#ffd600"
      }
   }
});
const useStyles = makeStyles((theme) => ({
   appBar: {
      paddingRight: 0,
      paddingLeft: 0,
      alignItems: 'center',
      backgroundColor: '#ffd600'
   },
   toolbar: {
      [theme.breakpoints.down(600)]: {
         marginTop: theme.spacing(5),
         marginBottom: theme.spacing(2)
      },
      paddingRight: 0,
      paddingLeft: 0,
      alignItems: 'center'
   },
   layout: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
         width: 500,
         marginLeft: 'auto',
         marginRight: 'auto',
      },
   },
   paper: {
      padding: theme.spacing(2),
      // marginBottom: theme.spacing(-20),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
         marginTop: theme.spacing(6),
         marginBottom: theme.spacing(6),
         padding: theme.spacing(3),
      },
      boxShadow: '0 0 0',
   },
   middle: {
      alignItems: 'center',
      verticalAlign: 'middle'
   },
   indicator: {
      backgroundColor: '#ffd600'
   },
   transform: {
      textTransform: 'none'
   }
}));

function TabPanel(props) {
   const { children, value, index, ...other } = props;
   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`wrapped-tabpanel-${index}`}
         aria-labelledby={`wrapped-tab-${index}`}
         {...other}
      >
         {value === index && (
            <Box p={3}>
               <Typography>{children}</Typography>
            </Box>
         )}
      </div>
   );
}

TabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.any.isRequired,
   value: PropTypes.any.isRequired,
};

function a11yProps(index) {
   return {
      id: `wrapped-tab-${index}`,
      'aria-controls': `wrapped-tabpanel-${index}`,
   };
}

export default function SignIn(props) {
   const classes = useStyles();
   const [value, setValue] = React.useState('one');
   const [lang, setLang] = useState('ru')

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };
   useEffect(() => {
      setLang(props.match.params.lang )
   }, [props.match.params.lang]);
   return (
      <div>
         <MuiThemeProvider theme={themeLight}>
            <CssBaseline />
         </MuiThemeProvider>
         <AppBar position="relative" color="inherit" elevation={0} className={classes.appBar}>
            <Container maxWidth="lg">
               <Toolbar className={classes.toolbar}>
                  <Grid container className={classes.middle}>
                     <Grid item xl={2} lg={2} md={3} sm={4} xs={4}>
                        <Link to={`/${props.match.params.lang}`}><img src={logo} /></Link>
                     </Grid>
                     <Grid item xl={2} lg={2} md={2} sm={4} xs={6}>
                        <Link to={props.match.params.lang === 'ru' ? `/uz/auth` : `/ru/auth`}
                           className={Appstyle.lang}> {translations.changeLang[lang]}</Link>
                     </Grid>
                  </Grid>
               </Toolbar>
            </Container>
         </AppBar>
         <main className={classes.layout}>
            <Paper className={classes.paper}>
               <AppBar position="static" elevation={0} color="inherit">
                  <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example"
                     classes={{ indicator: classes.indicator }}
                     className={FormCss.tabsHeight}>
                     <Tab
                        value="one"
                        label={<p className={value === 'one' ? FormCss.active : FormCss.nonActive}>{translations.register[lang]}</p>}
                        wrapped
                        {...a11yProps('one')}
                        disableRipple={true}
                        className={classes.transform}
                     />
                     <Tab
                        value="two"
                        label={<p className={value !== 'two' ? FormCss.nonActive : FormCss.active}>{translations.login[lang]}</p>}
                        {...a11yProps('two')}
                        disableRipple={true}
                        className={[classes.transform, value === 'two' ? FormCss.tabMargin : FormCss.tabLeft]}
                     />
                  </Tabs>
               </AppBar>
               <TabPanel value={value} index="one" className={FormCss.tabpanel}>
                  <RegistrationForm {...props} />
               </TabPanel>
               <TabPanel value={value} index="two" className={FormCss.tabpanel}>
                  <LoginForm {...props} />
               </TabPanel>
            </Paper>
         </main>
      </div>
   );
}