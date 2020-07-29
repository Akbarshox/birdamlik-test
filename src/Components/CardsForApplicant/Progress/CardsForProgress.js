import React, { useState, useEffect } from 'react';
import style from './CardsForProgress.module.css';
import Aux from '../../../hoc/Wrapper';
import Card from '../../UI/Card/Card';
import Rated from '../../StarRating/Rated'
import moment from "moment";
import translation from '../../../Translation.json'


export default function CardsForProgress(props) {
  const [CardContent, setCardContent] = useState(null);
  const [lang, setLang] = useState(props.matchParams.lang ? props.matchParams.lang : 'ru')

  useEffect(() => {
    setCardContent(props.cardData);
    setLang(props.matchParams.lang ? props.matchParams.lang : 'ru')
  }, [props.cardData], [props.matchParams.lang]);


  return (
    <Aux>
      {CardContent ?
        <Card cardType="col-6">
          <div className={style.InfoStatus}>
            <p>{translation.coordinatorMark[lang]}</p>
            <p className={style.deadline}> {moment(CardContent.deadline).format('DD-MM-YYYY')}</p>
          </div>
          <h3>{CardContent.title}</h3>
          <div className={style.RateStat}>
            <Rated rate={CardContent.rate} size={35} />
          </div>
          <p className={style.commentTile}>{translation.comments[lang]}</p>
          <p className={style.comment}>{CardContent.comment}</p>
        </Card> : ' '}

    </Aux>
  );
}