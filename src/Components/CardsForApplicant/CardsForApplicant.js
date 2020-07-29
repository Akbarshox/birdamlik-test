import React, {useState, useEffect} from 'react';
import Aux from '../../hoc/Wrapper';
import CardApplicantMyApps from './MyApps/CardsMyApplication';
import CardsForNotifications from './Notifications/CardsForNotifications';
import CardsForProgress from './Progress/CardsForProgress';


export default function CardsForApplicant(props) {
  const [params,setParams]=useState(props.matchParams);
  const [cards,setCards]=useState(props.cards);
  useEffect(() => {
    setCards(props.cards);
    setParams(props.matchParams)
  }, [props.cards, props.matchParams]);
   return (
       <Aux>
         {cards && cards.length ? cards.map((cardData) => 
            {
                if(params.contenttype==='myapps')
                return(<CardApplicantMyApps matchParams={params} cardData={cardData} key={cardData.id} {...props}/>)
                else if(params.contenttype==='notification')
                return(<CardsForNotifications matchParams={params} cardData={cardData} key={cardData.id} />)
                else
                return(<CardsForProgress matchParams={params} cardData={cardData} key={cardData.id} />)
            }
            ):' '
        }
       </Aux>
   );
}