import React from 'react';
import style from "./Appbar.module.css";
import img from "../../assets/icons/circleMan.png";
import group from "../../assets/icons/Group.svg";
import blackstar from "../../assets/icons/BlackStar.svg";
import Grid from "@material-ui/core/Grid";

export default function Groups() {
   return(
       <ul className={style.socialCareList}>
          <li>
             <img src={group} alt="group"/>
             <p><span className={style.Socialcare}>Social Care </span> <br/>
                <img src={blackstar} alt="starYell" style={{marginRight: '5px', marginLeft: '-5px'}}/>
                <span className={style.titleStar}>263 звезд </span>
             </p>
          </li>
       </ul>
   )
}