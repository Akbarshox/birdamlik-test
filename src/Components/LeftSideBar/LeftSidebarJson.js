import StarGrey from "../../assets/icons/StarGrey.svg";
import Settings from "../../assets/icons/Settings.svg";
import feed from '../../assets/icons/oem.svg';
import users from '../../assets/icons/uchastniki.svg';
import logout from '../../assets/logout.svg';
import back from '../../assets/back_vector.svg';

export const sidebarJson = [
   {
      contentType: ['groupfeed','notification','members','appsfeed','archivefeed'],
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
            link: 'out',
            scroll: '',
            name: {
               en: "Members",
               ru: "Выход",
               uz: "Chiqish"
            },
            icon1: logout,
            icon2: null,
         }
      ]
   },
   {
    contentType: ['settings','groupsettings','progress'],
    userType: 'coordinator',
    data: [
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
       {
         css: "Simple",
         link: 'out',
         scroll: '',
         name: {
            en: "Members",
            ru: "Выход",
            uz: "Chiqish"
         },
         icon1: logout,
         icon2: null,
      }
    ]
   },
  { contentType: ['groupfeed','notification','members'],
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
            link: 'out',
            scroll: '',
            name: {
               en: "Members",
               ru: "Выход",
               uz: "Chiqish"
            },
            icon1: logout,
            icon2: null,
         }
      ]
   },
   {
    contentType: ['settings','groupsettings','progress'],
    userType: 'volunteer',
    data: [
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
       {
         css: "Simple",
         link: 'out',
         scroll: '',
         name: {
            en: "Members",
            ru: "Выход",
            uz: "Chiqish"
         },
         icon1: logout,
         icon2: null,
      }
    ]
   },
   { 
       contentType: ['myapps','notification','progress','settings'],
      userType: 'applicant',
      data: [
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
            link: 'out',
            scroll: '',
            name: {
               en: "Members",
               ru: "Выход",
               uz: "Chiqish"
            },
            icon1: logout,
            icon2: null,
         }        
      ]
   },
];