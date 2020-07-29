import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import Aux from '../../hoc/Wrapper'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Appbar from '../../Components/Appbar/Appbar';
import PaginationGrid from '../../Components/PaginationGrid/PaginationGrid'
import SettingsContent from '../../Components/SettingsContent/SettingsContent'
import ApplicationForm from '../../Components/ApplicationForm/ApplicationForm';
import { appbarData } from './AppbarJsonData';
import Nopage from '../404/404';
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import Footer from "../../Components/Footer/Footer";
import translations from "../../Translation.json";
import axios from '../../API/api';
import {
    useDispatch,
    useSelector,
    shallowEqual
} from 'react-redux'

function ProfileContent(props) {
    const [content, setContent] = useState(null);
    const [userType, setUserType] = useState(null);
    const [contentType, setContentType] = useState(null);
    const matches = useMediaQuery('(max-width:959px)');
    const {notificationStatus} =useSelector(state=>({
        ...state.mainData
    }),shallowEqual)
    const [lang, setLang] = useState(props.match.params.lang ? props.match.params.lang : 'ru');
    const paginationTypes = ['groupfeed', 'notification', 'members', 'progress', 'appsfeed', 'archivefeed', 'myapps'];
    const settingsTypes = ['settings', 'groupsettings'];
    const dispatch=useDispatch();

    useEffect(() => {
        axios.get(`/${props.match.params.user==='applicant'?'requester':props.match.params.user}s/notifications`,{
            headers: {Authorization:`Bearer ${localStorage.getItem('auth')}`}
        })
        .then(res=>{
            dispatch({
              type: "MAINDATA",
              info:{
                  notificationStatus:((res.data.ratings && res.data.ratings.length) || (res.data.requests && res.data.requests.length) || (res.data.invites && res.data.invites.length) || (res.data.assignments && res.data.assignments.length))
              }
            });
        })
        .catch(err=>{
            // console.log('Notification Error',err)
        });
        setLang(props.match.params.lang ? props.match.params.lang : 'ru');
        setContentType(props.match.params.contenttype);
        setUserType(props.match.params.user);
        const headers = {
            groupfeed: {
                ru: 'Лента группы',
                uz: 'Guruh yangiliklari',
                en: '',
                additional: {
                    "ru": "Открыть архив",
                    "uz": "Arxivni ochish"
                }
            },
            notification: {
                ru: 'Уведомления',
                uz: 'Bildirishnomalar',
                en: ''
            },
            members: {
                ru: 'Участники',
                uz: 'Ishtirokchilar',
                en: ''
            },
            progress: {
                ru: '',
                uz: '',
                en: ''
            },
            appsfeed: {
                ru: 'Лента заявок',
                uz: 'Arizalar',
                en: ''
            },
            archivefeed: {
                ru: 'Архив',
                uz: 'Arxiv',
                en: ''
            },
            myapps: {
                ru: 'Мои заявки',
                uz: 'Mening arizalarim',
                en: ''
            }
        }
        const newContent = {
            header: headers[props.match.params.contenttype]
        };
        setContent(newContent);
    }, [props.content, props.match.params]);
    return (
        <Aux>
            {appbarData.map((e,i) => userType === e.userType ? <Appbar key={i} json={e.data} matches={matches} {...props} /> : '')}
            <Container maxWidth="lg">
                <Grid container spacing={4} style={{ marginTop: '50px' }} justify="space-between">
                    {contentType ? paginationTypes.includes(contentType) ?
                        <Switch>
                            <Route exact path={'/:lang/:user/:contenttype/:page'} render={(props) => <PaginationGrid
                                content={content} {...props} />} /> {/* check page url params is only digits (/^\d+$/).test(URL)*/}
                            <Route path={'/:lang/:user/:contenttype'}
                                render={(props) => settingsTypes.includes(props.match.params.contenttype) || props.match.params.contenttype === 'application' ?
                                    <Redirect to={`${props.match.url}`} /> : <Redirect to={`${props.match.url}/1`} />} />
                        </Switch>
                        : settingsTypes.includes(contentType) ?
                            <Route path={'/:lang/:user/:contenttype'} render={(props) => <SettingsContent {...props} />} /> :
                            <Switch>
                                <Route exact path={'/:lang/:user/application'}
                                    render={(props) => <ApplicationForm {...props} />} />
                                
                            </Switch>
                        : <Route exact path={'/:lang/:user'} render={(props) => {
                            const { user } = props.match.params;
                            let url = user === 'volunteer' ? 'groupfeed' : user === 'coordinator' ? 'appsfeed' : 'myapps';
                            return (<Redirect to={`${props.match.url}/${url}`} />)
                        }} />
                    }
                </Grid>
            </Container>
            <Footer {...props} />
        </Aux>
);
}

export default ProfileContent;