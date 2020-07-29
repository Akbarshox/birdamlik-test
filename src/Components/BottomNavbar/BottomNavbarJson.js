import oem from '../../assets/icons/oem.svg';
import users from '../../assets/icons/uchastniki.svg';
import ring from '../../assets/icons/Ringer.svg';
import ellipse from '../../assets/icons/Ellipse.svg';
import settings from '../../assets/icons/Settings.svg';
import star from '../../assets/icons/StarGrey.svg';

export const bottomData = [
   {
      contentType: ['groupfeed','notification','members'],
      userType: 'volunteer',
      data: [
         {
            icon1: oem,
            icon2: null,
            link: 'groupfeed'
         },
         {
            icon1: users,
            icon2: null,
            link: 'members'
         },
         {
            icon1: ring,
            icon2: ellipse,
            link: 'notification'
         },
      ]
   },
   {
      contentType: ['settings','groupsettings','progress'],
      userType: 'volunteer',
      data: [
         {
            icon1: settings,
            icon2: null,
            link: 'settings'
         },
         {
            icon1: star,
            icon2: null,
            link: 'progress'
         },
         {
            icon1: ring,
            icon2: ellipse,
            link: 'notification'
         },
      ]
   },
   {
      contentType: ['groupfeed','notification','members','appsfeed','archivefeed'],
      userType: 'coordinator',
      data: [
         {
            icon1: oem,
            icon2: null,
            link: 'groupfeed'
         },
         {
            icon1: users,
            icon2: null,
            link: 'members'
         },
         {
            icon1: ring,
            icon2: ellipse,
            link: 'notification'
         },
      ]
   },
   {
      contentType: ['settings','groupsettings','progress'],
      userType: 'coordinator',
      data: [
         {
            icon1: settings,
            icon2: null,
            link: 'settings'
         },
         {
            icon1: star,
            icon2: null,
            link: 'progress'
         },
         {
            icon1: ring,
            icon2: ellipse,
            link: 'notification'
         },
      ]
   },
   {
      contentType: ['myapps','notification','progress','settings'],
      userType: 'applicant',
      data: [
         {
            icon1: oem,
            icon2: null,
            link: 'myapps'
         },
         {
            icon1: settings,
            icon2: null,
            link: 'settings'
         },
         {
            icon1: ring,
            icon2: ellipse,
            link: 'notification'
         },
      ]
   },
];