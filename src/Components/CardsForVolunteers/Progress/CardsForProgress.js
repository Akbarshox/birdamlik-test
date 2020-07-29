import React, {useState, useEffect} from 'react';
import style from './CardsForProgress.module.css';
import Aux from '../../../hoc/Wrapper';
import Card from '../../UI/Card/Card';
import Rated from '../../StarRating/Rated'
import moment from "moment";


export default function CardsForMembers(props) {
   const [CardContent, setCardContent] = useState(null);
   useEffect(() => {
      setCardContent(props.cardData);
   }, [props.cardData]);
   
   
   return (
       <Aux>
          {CardContent ?
              <Card cardType="col-6">
                 <div className={style.InfoStatus}>
                    <p>Координатор оценил вас на:</p>
                    <p className={style.deadline}> {moment(CardContent.deadline).format('DD-MM-YYYY ')}</p>
                 </div>
                 <h3>{CardContent.title}</h3>
                 <div className={style.RateStat}>
                    <Rated rate={CardContent.rate} size={35} />
                 </div>
                 <p className={style.commentTile}>Комментарии</p>
                 <p className={style.comment}>{CardContent.comment}</p>
              </Card> : ' '
          }
       
       </Aux>
   );
}