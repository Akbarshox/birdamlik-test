import React, { useState, useEffect } from 'react';
import style from './CardNoFound.module.css';
import Aux from '../../hoc/Wrapper';
import rainy from '../../assets/icons/rainy.svg'
import Button from '../UI/Buttons/Buttons';


export default function CardNotFound(props) {
  return (
    <Aux>
      <div className={style.notfoundContent}>
        <img src={rainy} />
        <p >Тут у нас плохая погода...</p>
      </div>
    </Aux>
  )
}