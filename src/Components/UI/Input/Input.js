import React, {useEffect, useState} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Input1 from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {TextField} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import {makeStyles, withStyles, createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import classes1 from './Input.module.css';
import InputMask from 'react-input-mask';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import yellow from '@material-ui/core/colors/yellow';
import {ru, uz} from "date-fns/locale";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
const theme = createMuiTheme({
   overrides: {
      MuiInput: {
         root: {
            height: 40,            
            fontSize: '14px',
            boxSizing: 'border-box',
         },
         underline: {
            borderBottom: 'none',
            '&::before': {
               borderBottom: 'none!important'
            },
            '&::after': {
               borderBottom: 'none!important'
            }
         },
         input: {
            height: 40,
            fontFamily: "OpenSans",
            borderRadius: '2px',
            padding: '6px 10px',
            boxSizing: 'border-box',
            fontSize: '14px!important',
            '&::placeholder': {
               fontSize: '14px!important',
               color: '#333!important',
               boxSizing: 'border-box',
               fontFamily: "OpenSans",
            },
         }
      },
      MuiInputBase:{
         input: {
            height: 40,
            fontFamily: "OpenSans",
            borderRadius: '2px',
            padding: '6px 10px',
            fontSize: '14px!important',
            boxSizing: 'border-box',
            '&::placeholder': {
               fontSize: '14px!important',
               color: '#333!important',
               
               fontFamily: "OpenSans",
            },
         }
      }
   },
});
const defaultMaterialTheme = createMuiTheme({
   overrides: {
      MuiInput: {
         root: {
            height: 40,            
            fontSize: '14px',
            boxSizing: 'border-box',
         },
         underline: {
            borderBottom: 'none',
            '&::before': {
               borderBottom: 'none!important'
            },
            '&::after': {
               borderBottom: 'none!important'
            }
         },
         input: {
            height: 40,
            fontFamily: "OpenSans",
            borderRadius: '2px',
            padding: '6px 10px',
            boxSizing: 'border-box',
            fontSize: '14px!important',
            '&::placeholder': {
               fontSize: '14px!important',
               color: '#333!important',
               boxSizing: 'border-box',
               fontFamily: "OpenSans",
            },
         }
      },
      MuiInputBase:{
         input: {
            height: 40,
            fontFamily: "OpenSans",
            borderRadius: '2px',
            padding: '6px 10px',
            fontSize: '14px!important',
            boxSizing: 'border-box',
            '&::placeholder': {
               fontSize: '14px!important',
               color: '#333!important',
               
               fontFamily: "OpenSans",
            },
         }
      }
   },
   palette: {
     primary: {
      main: yellow.A700,
    },
   }
 });

const useStyles = makeStyles((theme) => ({
 
   formControl: {
      margin: theme.spacing(0),
      minWidth: "100%",
      maxWidth: "100%",
      marginLeft: 0
   },
   root: {
      margin: '0!important',
      fontSize: '14px',
      boxSizing: 'border-box',
   }
}));

const InputMaskStyled = withStyles({
   root: {
      margin: '0!important',
      paddingLeft: '6px 10px',
      boxSizing: 'border-box',
      fontSize: '14px',
      height: 40,
      background: '#E7E7E7',
   },
   
})(InputMask);
const TextfieldStyled = withStyles({
   root: {
      margin: '0!important',
      border: '1px solid #ccc',
      fontFamily: "OpenSans",
      fontSize: '14px',
   },
   input: {
      height: '40px',
      fontSize: '14px',
      boxSizing: 'border-box',
      '&::before': {
         borderBottom: 'none!important'
      },
      '&::after': {
         borderBottom: 'none!important'
      },
      
   },
   
})(TextField);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
   PaperProps: {
      style: {
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         width: 250,
      },
   },
};

function Input(props) {
  
   const classes = useStyles();
   let inputElement = null;
   const inputClasses = [classes1.InputElement];
   const [multiSelectVal, setMultiSelect] = useState(props.value)
   const [lang, setLangLocale] = useState(ru)
   if (props.invalid && props.shouldValidate && props.touched) {
      inputClasses.push(classes1.Invalid);
   }
   if(props.files){
      inputClasses.push(classes1.file);
   }
   if(props.elementType === 'textareaBig'){
      inputClasses.push(classes1.textareaBig)
   }
   useEffect(() => {
      setMultiSelect(props.value)
      if(props.lang==='ru')
      setLangLocale(ru)
      else
      setLangLocale(uz)
   }, [props.value,props.lang]);
   switch (props.elementType) { 
      case ('phone'):
         inputElement = <div className={classes.formControl}>
            <ThemeProvider theme={theme}>
               <InputMaskStyled
                   mask="+\9\98 99 999 99 99"
                   onChange={props.changed}
                   className={classes.root}
               >{() => <TextfieldStyled
                   className={inputClasses.join(' ')}
                   {...props.elementConfig}
                   type="text"
                   onChange={props.changed}
               />}
               </InputMaskStyled>
            </ThemeProvider>
         </div>;
         break;
      case ('date'):
         inputElement = <div className={classes.formControl}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={lang}>
                  <ThemeProvider theme={defaultMaterialTheme}>
                     <KeyboardDatePicker
                        format="dd-MM-yyyy"
                        margin="normal"
                        id="date-picker-dialog"
                        
                        value={props.value}
                        onChange={props.changed}
                        KeyboardButtonProps={{
                           'aria-label': 'change date',
                        }}
                        className={inputClasses.join(' ')}
                           {...props.elementConfig}
                     />
                  </ThemeProvider>
                  </MuiPickersUtilsProvider>
               </div>;
         break;
      case ('input'):
         inputElement = <input
             className={inputClasses.join(' ')}
             {...props.elementConfig}
             value={props.value}
             onChange={props.changed}/>;
         break;
      
      case ('inputgroup'):
         inputElement = props.inputs.map(el=>{
            return(<input
             className={inputClasses.join(' ')}
             {...el.elementConfig}
             value={el.value}
             onChange={(e)=>props.changed(e,el.name)}/>)});
         break;
      case ('textarea'):
         inputElement = <textarea
             className={inputClasses.join(' ')}
             {...props.elementConfig}
             value={props.value}
             onChange={props.changed}
            />;
         break;
         case ('textareaBig'):
         inputElement = <textarea style={{height:100}}
             className={inputClasses.join(' ')}
             {...props.elementConfig}
             value={props.value}
             onChange={props.changed}
            />;
         break;
      case ('select'):
         inputElement = (
             <select
                 className={inputClasses.join(' ')}
                 value={props.value}
                 onChange={props.changed}
                 disabled={props.disabled}
             >
                {props.elementConfig.options.map(option => {
                       if (option.selected) {
                          return (<option key={option.value} value={option.value} disabled defaultValue>
                             {option.displayValue}
                          </option>)
                       } else {
                          return (<option key={option.value} value={option.displayValue}>
                             {option.displayValue}
                          </option>)
                       }
                    }
                )}
             </select>
         );
         break;
      case ('helpSelect'):
         inputElement = (
             <select
                 className={inputClasses.join(' ')}
                 value={props.value}
                 onChange={props.changed}
                 disabled={props.disabled}
             >
                {props.elementConfig.options.map(option => {
                       return (<option key={option.value} value={option.value}>
                          {option.displayValue}
                       </option>)
                    }
                )}
             </select>
         );
         break;
      case ('multiSelect'):
         inputElement = (
             <FormControl className={classes.formControl}>
                <Select
                    id="demo-mutiple-checkbox"
                    multiple
                    value={multiSelectVal}
                    onChange={props.changed}
                    input={<Input1 className={inputClasses.join(' ')}/>}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                   {props.elementConfig.options.map((option) => (
                       <MenuItem key={option.displayValue} value={option.displayValue}>
                          <Checkbox checked={multiSelectVal.indexOf(option.displayValue) > -1}/>
                          <ListItemText primary={option.displayValue}/>
                       </MenuItem>
                   ))}
                </Select>
             </FormControl>
         );
         break;
      default:
         inputElement = <input
             className={inputClasses.join(' ')}
             {...props.elementConfig}
             value={props.value}
             onChange={props.changed}
            />;
   }
   
   return (
      <Grid item xs={12}>
         <label className={classes1.label}>{props.label}
            {inputElement}
         </label>
      </Grid>
   );
   
};

export default Input;