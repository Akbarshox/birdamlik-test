import React, {useState, useEffect} from 'react';
import Aux from '../../hoc/Wrapper';
import CardForGroupFeed from './GroupFeed/CardsForVolunteers';
import CardForMembers from './Members/CardsForMembers';
import CardsForNotifications from './Notifications/CardsForNotifications.js';
import CardsForProgress from './Progress/CardsForProgress';


export default function LoginForm(props) {
  const [params,setParams]=useState(props.matchParams)
  const [cards,setCards]=useState(props.cards);
  useEffect(() => {
    setCards(props.cardData);
    setParams(props.matchParams)
  }, [props.cardData, props.matchParams]);
   return (
       <Aux>
         {cards && cards.length ? cards.map((cardData) => 
            {
                if(params.contenttype==='groupfeed')
                return(<CardForGroupFeed matchParams={params} cardData={cardData}  key={cardData.id} />)
                else if(params.contenttype==='notification')
                return(<CardsForNotifications matchParams={params} cardData={cardData}  key={cardData.id}/>)
                else if(params.contenttype==='members')
                return(<CardForMembers matchParams={params} cardData={cardData}  key={cardData.id}/>)
                else
                return(<CardsForProgress matchParams={params} cardData={cardData} key={cardData.id} />)
            }
            ):' '
        }
       </Aux>
   );
}
