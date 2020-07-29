import oem from "../../assets/icons/oem.svg";
import ring from "../../assets/icons/Ringer.svg";
import ellipse from "../../assets/icons/Ellipse.svg";
import feed from '../../assets/icons/oem.svg';

import StarGrey from "../../assets/icons/star_sd.svg";
import Settings from "../../assets/icons/Settings.svg";
import users from '../../assets/icons/uchastniki.svg';
import back from '../../assets/back_vector.svg';


export const bottomData = [
    {
       userType: 'coordinator',
       data: [
          {
             css: "Simple",
             link: 'groupfeed',
             scroll: '',
             name: {
                en: "Group Feeds",
                ru: "Лента группы",
                uz: "Guruh yangiliklari"
             },
             icon1: feed,
             icon2: null,
          },
          {
             css: "Simple",
             link: 'members',
             scroll: '',
             name: {
                en: "Members",
                ru: "Участники",
                uz: "Guruh a'zolari"
             },
             icon1: users,
             icon2: null,
          },
          {
             css: "Simple",
             active: 'ActiveSimple',
             link: 'notification',
             scroll: '',
             name: {
                en: "Main",
                ru: "Уведомления",
                uz: "Bildirishnomalar"
             },
             icon1: ring,
             icon2: ellipse,
          },
          {
             css: "Simple",
             active: 'ActiveSimple',
             link: 'appsfeed',
             scroll: '',
             name: {
                en: "Main",
                ru: "Лента заявок",
                uz: "Arizalar"
             },
             icon1: oem,
             icon2: null,
          },
          {
             css: "Simple",
             link: 'groupsettings',
             scroll: '',
             name: {
                en: "Group settings",
                ru: "Настройки группы",
                uz: "Guruh sozlamalari"
             },
             icon1: Settings,
             icon2: null,
          },
          {
             css: "Simple",
             link: 'progress',
             scroll: '',
             name: {
                en: "Performence",
                ru: "Достижения группы",
                uz: "Yutuqlar"
             },
             icon1: StarGrey,
             icon2: null,
          },   
          {
             css: "Simple",
             link: 'back',
             scroll: '',
             name: {
                en: "Back",
                ru: "Назад",
                uz: "Ortga"
             },
             icon1: back,
             icon2: null,
          },     
       ]
    },
    {
       userType: 'volunteer',
       data: [
          {
             css: "Simple",
             link: 'groupfeed',
             scroll: '',
             name: {
                en: "Group Feeds",
                ru: "Лента группы",
                uz: "Guruh yangiliklari"
             },
             icon1: feed,
             icon2: null,
          },
          {
             css: "Simple",
             link: 'members',
             scroll: '',
             name: {
                en: "Members",
                ru: "Участники",
                uz: "Guruh a'zolari"
             },
             icon1: users,
             icon2: null,
          },
          {
             css: "Simple",
             active: 'ActiveSimple',
             link: 'notification',
             scroll: '',
             name: {
                en: "Main",
                ru: "Уведомления",
                uz: "Bildirishnomalar"
             },
             icon1: ring,
             icon2: ellipse,
          },
          {
             css: "Outlined2",
             active: 'Outlined2',
             link: 'settings',
             scroll: '',
             name: {
                en: "Main",
                ru: "Мой профиль",
                uz: "Mening profilim"
             },
             icon1: null,
             icon2: null,
          },
          {
             css: "Simple",
             link: 'settings',
             scroll: '',
             name: {
                en: "Settings",
                ru: "Настройки",
                uz: "Sozlamalar"
             },
             icon1: Settings,
             icon2: null,
          },
          {
             css: "Simple",
             link: 'progress',
             scroll: '',
             name: {
                en: "Performence",
                ru: "Мои достижения",
                uz: "Yutuqlar"
             },
             icon1: StarGrey,
             icon2: null,
          },
          {
               css: "Simple",
               link: 'back',
               scroll: '',
               name: {
                  en: "Back",
                  ru: "Назад",
                  uz: "Ortga"
               },
               icon1: back,
               icon2: null,
            },
       ]
    },
    {
       userType: 'applicant',
       data: [
          {
             css: "Simple",
             active: 'ActiveSimple',
             link: 'myapps',
             scroll: '',
             name: {
                en: "My applications",
                ru: "Мои заявки",
                uz: "Mening arizalarim"
             },
             icon1: feed,
             icon2: null,
          },
          {
             css: "Simple",
             active: 'ActiveSimple',
             link: 'notification',
             scroll: '',
             name: {
                en: "Main",
                ru: "Уведомления",
                uz: "Bildirishnomalar"
             },
             icon1: ring,
             icon2: ellipse,
          },
          
          {
             css: "Simple",
             link: 'progress',
             scroll: '',
             name: {
                en: "Performence",
                ru: "Мои достижения",
                uz: "Yutuqlar"
             },
             icon1: StarGrey,
             icon2: null,
          },
          {
             css: "Yellow",
             active: "Yellow",
             link: 'application',
             scroll: '',
             name: {
                en: "Main",
                ru: "+ Создать заявку",
                uz: "+ Yangi ariza"
             },
             icon1: null,
             icon2: null,
          },
          {
             css: "Outlined2",
             active: 'Outlined2',
             link: 'settings',
             scroll: '',
             name: {
                en: "Main",
                ru: "Мой профиль",
                uz: "Mening profilim"
             },
             icon1: null,
             icon2: null,
          },
          {
             css: "Simple",
             link: 'settings',
             scroll: '',
             name: {
                en: "Settings",
                ru: "Настройки",
                uz: "Sozlamalar"
             },
             icon1: Settings,
             icon2: null,
          },
       ]
    }
 ];