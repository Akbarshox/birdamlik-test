import React, { useState, useEffect } from 'react';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import style from './PaginationContent.module.css';
import Aux from '../../hoc/Wrapper';
import FlatPagination from 'material-ui-flat-pagination';
import axios from '../../API/api';
import CardForApplicant from '../CardsForApplicant/CardsForApplicant'
import CardsForCoordinators from '../CardsForCoordinators/CardsForCoordinator'
import CardsForVolunteers from '../CardsForVolunteers/CardsForVolunteer'
import { toInteger } from 'lodash';
import CardNotFound from '../CardNotFound/CardNotFound'
import { Link, Redirect} from 'react-router-dom';
import Snackbar from '../UI/Snackbar/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import translations from '../../Translation.json'

const theme = createMuiTheme({
  overrides: {
    MuiFlatPagination: {
      root: {
        marginTop: '30px',
        textAlign: 'right',
      },
      rootStandard: {
        background: '#FFFFFF',
        boxShadow: '0px 5px 10px rgba(204, 204, 204, 0.5)',
        borderRadius: '4px'
      }
    },
    MuiFlatPageButton: {
      rootCurrent: {
        background: ' #FFD600',
        boxShadow: '0px 5px 10px rgba(204, 204, 204, 0.5)',
        borderRadius: ' 4px',
        color: '#000!important',
        '&:hover': {
          background: ' #FFD000',
        }
      },
      rootEnd: {
        background: '#E7E7E7',
        boxShadow: '0px 5px 10px rgba(204, 204, 204, 0.5)',
        borderRadius: '4px'
      }
    },
    MuiButton: {
      root: {
        color: '#777!important',
        margin: '3px'

      }
    }
  }
});

export default function FeedContent(props) {
  const [PaginateContent, setFeedContent] = useState(props.content);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [nextUrl, setUrl] = useState(props.match?props.match.url:null);
  const [redirect, setRedirect] = useState(false);
  const [cards, setCards] = useState(null);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  const { updateComponent,notificationStatus } = useSelector((state => ({...state.mainData})), shallowEqual);
 const dispatch=useDispatch()
  useEffect(() => {
    let url = '';
    const { user, contenttype,page} = props.matchParams;
    let index='';
    if(page==='1'){
      index=''
    }
    else if(contenttype === 'archivefeed'){
      index=`&page=${page}`
    }
    else{
      index=`?page=${page}`
    }
    if (user === 'applicant') {
      if (contenttype === 'myapps')
        url = `/requesters/posts/${index}`;
      else if (contenttype === 'progress')
        url = `/requesters/rating/archive${index}`;
      else if (contenttype === 'notification')
        url = `/requesters/notifications/`;
      else
        url = `/requesters/posts/${index}`
    }
    else if (user === 'coordinator') {
      if (contenttype === 'groupfeed')
        url = `/coordinators/group/posts/${index}`;
      else if (contenttype === 'members')
        url = `/coordinators/group/members/${index}`;
      else if (contenttype === 'notification')
        url = `/coordinators/notifications/`;
      else if (contenttype === 'appsfeed')
        url = `/coordinators/post/list/${index}`;
      else if (contenttype === 'progress')
        url = `/coordinators/rating/archive/${index}`;
      else if (contenttype === 'archivefeed')
        url = `/coordinators/group/posts/?status=finished${index}`;
    }
    else {
      if (contenttype === 'groupfeed')
        url = `/volunteers/group/posts/${index}`;
      else if (contenttype === 'members')
        url = `/volunteers/group/members/${index}`;
      else if (contenttype === 'notification')
        url = `/volunteers/notifications/`;
      else if (contenttype === 'progress')
        url = `/volunteers/rating/${index}`;
    }
    dispatch({
        type: "MAINDATA",
        info: {
          preloader:true
        }
    })
    axios.get(url, {
      headers: { Authorization: `Bearer ${localStorage.getItem('auth')}` }
    })
      .then(response => {
        
       
        if (user === 'coordinator' && contenttype === 'notification') {
          if (response.data.requests.length || response.data.ratings.length || response.data.assignments.length) {
            const { ratings } = response.data;
            const { requests } = response.data;
            const { assignments } = response.data;
            for (let i = 0; i < ratings.length; i++) {
              ratings[i]['note_type'] = 'rate'
            };
            for (let i = 0; i < requests.length; i++) {
              requests[i]['note_type'] = 'request'
            };
            for (let i = 0; i < assignments.length; i++) {
              assignments[i]['note_type'] = 'assignment'
            };
            let results = ratings.concat(requests);
            results = results.concat(assignments)
            results.sort(function (results, b) {
              return results.created_at > b.created_at
            });
            // console.log('after', results)
            setCards(results);
          }
        }
        else if (user === 'volunteer' && contenttype === 'notification') {
          if (response.data.ratings.length || response.data.invites.length) {
            const { ratings } = response.data;
            const { invites } = response.data;
            for (let i = 0; i < ratings.length; i++) {
              ratings[i]['note_type'] = 'rate'
            };
            for (let i = 0; i < invites.length; i++) {
              invites[i]['note_type'] = 'invite'
            };
            let results = ratings.concat(invites);
            results.sort(function (results, b) {
              return results.created_at > b.created_at
            });
            
            setCards(results);
          }
        }
        else if (user === 'applicant' && contenttype === 'notification') {
          if (response.data.ratings.length || response.data.assignments.length){
            const { ratings } = response.data;
            const { assignments } = response.data;
            for (let i = 0; i < ratings.length; i++) {
              ratings[i]['note_type'] = 'rate'
            };
            for (let i = 0; i < assignments.length; i++) {
              assignments[i]['note_type'] = 'assignment'
            };
            let results = ratings.concat(assignments);
            results.sort(function (results, b) {
              return results.created_at > b.created_at
            });
           
            setCards(results);
          }
        }
        else
          setCards(response.data.results);
          setTotal(response.data.count)
          setOffset((toInteger(page)-1)*10);
          setRedirect(false);
          dispatch({
              type: "MAINDATA",
              info: {
                updateComponent:false,
                preloader:false
              }
          });
      })
      .catch(error => {
        dispatch({
            type: "MAINDATA",
            info: {
              preloader:false
            }
        });
        setMessage(error.message);
        setError(true)
      });

    setFeedContent(props.content);
  }, [props.content,updateComponent]);

  function handleClick(offset) {
    let pageCount=offset===0?1:Math.ceil(total/offset)
    setUrl(`/${props.matchParams.lang}/${props.matchParams.user}/${props.matchParams.contenttype}/${pageCount}`)
    setRedirect(true)
}
const handleError=()=>{
  setError(true)
}
const handleClose = () => {
  
  setError(false)
};
if(redirect){
  return(<Redirect to={nextUrl}/>)
}
else
  return (
    <Aux>
      {PaginateContent ?
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12} style={{ minHeight: '70vh' }}>
          <h1 className={style.header}>{PaginateContent.header[props.matchParams.lang]}</h1>
          {PaginateContent.header.additional && props.matchParams.user === 'coordinator' ? <Link to={`/${props.matchParams.lang}/coordinator/archivefeed`} className={style.archive}>{PaginateContent.header.additional[props.matchParams.lang]}</Link> : ' '}
          {
            cards && cards.length ?
              <div>
                {
                  props.matchParams.user === 'volunteer' ?
                    <CardsForVolunteers matchParams={props.matchParams} cardData={cards} />
                    :
                    props.matchParams.user === 'coordinator' ?
                      <CardsForCoordinators matchParams={props.matchParams} cardData={cards} />
                      :
                      props.matchParams.user === 'applicant' ?
                        (<CardForApplicant matchParams={props.matchParams} cards={cards} {...props}/>)
                        : ('')
                }
                < MuiThemeProvider theme={theme}>
                  <FlatPagination
                    offset={offset}
                    limit={10}
                    total={total}
                    onClick={(e, offset) => handleClick(offset)}
                    nextPageLabel='»'
                    previousPageLabel='«'
                  /></MuiThemeProvider>
                   <Snackbar open={error} handleOpen={handleError} handleClose={handleClose}>
                  <Alert elevation={6} variant="filled" onClose={handleClose} severity="error">{translations.error[props.matchParams.lang]}</Alert>
                  </Snackbar>
              </div> : <CardNotFound />

          }
        </Grid> : ' '
      }

    </Aux >
  );
}