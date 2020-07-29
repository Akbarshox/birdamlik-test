import React, { useState, useEffect } from 'react';
import style from './CoordinatorArchive.module.css';
import Aux from '../../../hoc/Wrapper';
import Card from '../../UI/Card/Card';
import Button from '../../UI/Buttons/Buttons';
import ShowMore from '../../UI/ShowMore/ShowMore'
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import moment from "moment";
import translations from '../../../Translation.json'
import CardNotFound from '../../CardNotFound/CardNotFound'


export default function GroupFeedCoordinator(props) {
  const [lang, setLang] = useState(props.matchParams.lang ? props.matchParams.lang : 'ru')
  const [CardContent, setCardContent] = useState(null);
  const [checked, setChecked] = React.useState([0]);

  useEffect(() => {
    setCardContent(props.cardData);
    setLang(props.matchParams.lang ? props.matchParams.lang : 'ru')
  }, [props.cardData], [props.matchParams.lang]);

  const data = CardContent && CardContent.status === 'finished' ?
    <Card cardType="col-6">
      <h3>{CardContent.title}</h3>
      <p className={style.deadline}>{translations.cardDeadline[lang]}  {moment(CardContent.deadline).format('DD-MM-YYYY')}</p>
      <ShowMore {...props}>
        <p className={style.info}>
          {CardContent.description}
        </p>
      </ShowMore>
      <div className={style.bottomInfo}>
        <div>
          <p className={style.NumofVolunteers}>{translations.volunteers[lang]}<span> {CardContent.gathered}</span> / <span> {CardContent.count}</span></p>
          <p className={style.status + " " + style.Finished}> {translations.processFinished[lang]}</p>
        </div>
      </div>
    </Card> : ''

  // const filter = data.filter(data => data.status === 'finished'>0)

  return (
    <Aux>

      <section>

        {data}

        {/* {CardContent && CardContent.status === 'finished' ?
          <Card cardType="col-6">
            <h3>{CardContent.title}</h3>
            <p className={style.deadline}>{translations.cardDeadline[lang]}  {moment(CardContent.deadline).format('DD-MM-YYYY, h:mm a')}</p>
            <ShowMore {...props}>
              <p className={style.info}>
                {CardContent.description}
              </p>
            </ShowMore>
            <div className={style.bottomInfo}>
              <div>
                <p className={style.NumofVolunteers}>{translations.volunteers[lang]}<span> {CardContent.gathered}</span> / <span> {CardContent.count}</span></p>
                <p className={style.status + " " + style.Finished}> {translations.processFinished[lang]}</p>
              </div>
            </div>
          </Card> : <CardNotFound />} */}
      </section>
    </Aux>
  );
}