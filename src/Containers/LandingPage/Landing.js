import React, {useEffect, useState} from "react";
import Aux from '../../hoc/Wrapper';
import Container from '@material-ui/core/Container';
import Appbar from '../../Components/Appbar/Appbar'
import BeHero from '../../Components/BeHero/BeHero'
import About from '../../Components/AboutProject/About'
import ForSponsors from '../../Components/ForSponsors/ForSponsors'
import OurVolunters from '../../Components/OurVolunters/OurVolunters'
import ForVolunteers from '../../Components/ForVolunteers/ForVolunteers'
import Footer from '../../Components/Footer/Footer'

function Landing(props) {
   const appbarData = [
    {
       css: "Simple",
       link: '',
       scroll: '#top',
       name: {
          en: "Main",
          ru: "Главная",
          uz: "Asosiy sahifa"
       },
       icon1: null,
       icon2: null,
    },
    {
       css: "Simple",
       link: '',
       scroll: '#about',
       name: {
          en: "About project",
          ru: "О проекте",
          uz: "Loyiha haqida"
       },
       icon1: null,
       icon2: null,
    },
    {
       css: "Simple",
       link: '',
       scroll: '#for_sponsors',
       name: {
          en: "",
          ru: "Спонсорам",
          uz: "Homiylar uchun"
       },
       icon1: null,
       icon2: null,
    },
    {
       css: "Simple",
       link: '',
       scroll: '#for_volunteer',
       name: {
          en: "",
          ru: "Волонтерам",
          uz: "Ko'ngillilar uchun"
       },
       icon1: null,
       icon2: null,
    },
    {
       css: "Yellow",
       link: `auth`,
       scroll: '',
       name: {
          en: "",
          ru: "+ Создать заявку",
          uz: "+ Ariza yaratish"
       },
       icon1: null,
       icon2: null,
    },
    {
       css: "Outlined",
       link: `auth`,
       scroll: '',
       name: {
          en: "",
          ru: "Авторизация",
          uz: "Ro'yxatdan o'tish"
       },
       icon1: null,
       icon2: null,
    },
 ];
   return (
       <Aux>
          <Appbar json={appbarData} {...props}/>
          <Container maxWidth="lg" id='top'>
             <BeHero  {...props}/>
             <About {...props}/>
             <ForSponsors {...props}/>
             <ForVolunteers {...props}/>
          </Container>
          {/* <OurVolunters {...props}/> */}
          <Footer {...props}/>
       </Aux>
   );
   
}

export default Landing;