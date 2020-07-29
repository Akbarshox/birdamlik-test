import oem from "../../assets/icons/oem.svg";
import ring from "../../assets/icons/Ringer.svg";
import ellipse from "../../assets/icons/Ellipse.svg";
import feed from '../../assets/icons/oem.svg';


export const appbarData = [
   {
      userType: 'coordinator',
      data: [
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
         // {
         //    css: "Yellow",
         //    active: "Yellow",
         //    link: 'application',
         //    scroll: '',
         //    name: {
         //       en: "Main",
         //       ru: "+ Создать заявку",
         //       uz: "+ Yangi ariza"
         //    },
         //    icon1: null,
         //    icon2: null,
         // },
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
      ]
   },
   {
      userType: 'volunteer',
      data: [
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
      ]
   }
];
