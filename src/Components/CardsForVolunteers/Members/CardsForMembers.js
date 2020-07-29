import React, { useState, useEffect } from 'react';
import style from './CardsForMembers.module.css';
import Aux from '../../../hoc/Wrapper';
import Card from '../../UI/Card/Card';
import stars from '../../../assets/icons/BlackStar.svg'
import ShowMore from '../../UI/ShowMore/ShowMore.js'
import userImg from '../../../assets/icons/user.svg';
import translation from '../../../Translation.json'

export default function CardsForMembers(props) {
  const [CardContent, setCardContent] = useState(null);
  const [ava, setAva] = useState(null)
  const [lang, setLang] = useState(props.matchParams.lang ? props.matchParams.lang : 'ru')

  useEffect(() => {
    setCardContent(props.cardData);
    setLang(props.matchParams.lang ? props.matchParams.lang : 'ru')

    if (props.cardData.avatar) {
      setAva(props.cardData.avatar)
    }
    else {
      setAva(userImg)
    }
  }, [props.cardData]);
  const handleImg = () => {
    let img = ''
    if (CardContent.avatar)
      if ((CardContent.avatar).includes("http://api.birdamlik.uz")) {
        img = CardContent.avatar
      }
      else {
        img = `http://api.birdamlik.uz${CardContent.avatar}`
      }
    else
      img = require('../../../assets/icons/user.svg');
    setAva(img)
  }
  return (
    <Aux>
      {CardContent ?
        <Card cardType="col-6">
          {
            CardContent.role === 'coordinator' ?
              <div className={style.MembersInfo}>
                <img src={ava} onError={e => handleImg(this)} className={style.ava} alt="ava" />
                <div style={{ width: '100%' }}>
                  <h3>{CardContent.fio}</h3>
                  <p className={style.title}>{translation.coordinator[lang]} • <span className={style.stars}>
                    <img src={stars} />  {CardContent.star_total}         </span></p>
                  <ShowMore {...props}>
                    <p className={style.info}>
                      {CardContent.about}
                    </p>
                  </ShowMore>
                   <div style={{ marginTop: '11px' }}>
                      <p className={style.contacts} >
                         {CardContent.email ? <div> <span> {translation.email[lang]}</span> : {CardContent.email}</div> : ' '}
                      </p>
                      <p className={style.contacts} > <span> {translation.number[lang]}</span> : <a href={`tel: ${CardContent.number}`}> {CardContent.number.replace(/\D+/g, '').replace(/(\d{3})(\d{2})(\d{3})(\d{4})/, '+ ($1) $2 $3 $4')}</a></p>
                   </div>
                </div>
              </div> :
              <div className={style.MembersInfo}>
                <img src={ava} onError={e => handleImg(this)} className={style.ava} alt="ava" />
                <div style={{ width: '100%' }}>
                  <h3>{CardContent.fio}</h3>
                  <p className={style.title}>{translation.volunteer[lang]} • <span className={style.stars}>
                    <img src={stars} />  {CardContent.star_total}         </span></p>
                  <ShowMore {...props}>
                    <p className={style.info}>
                      {CardContent.about}
                    </p>
                  </ShowMore>
                </div>
              </div>
          }

        </Card> : ' '}

    </Aux>
  );
}