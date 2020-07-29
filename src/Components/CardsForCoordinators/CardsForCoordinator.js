import React, {useState, useEffect} from 'react';
import Aux from '../../hoc/Wrapper';
import CardForProgress from './Progress/CardsForProgress';
import CardForGroupFeed from './GroupFeed/CardsForVolunteers';
import CardForMembers from './Members/CardsForMembers';
import CardForAppFeed from './ApplicationFeed/CardsApplicationFeed';
import CardsForNotifications from './Notifications/CardsForNotifications';
import CardsForArchive from './CoordinatorArchive/CoordinatoeArchive.js'


export default function LoginForm(props) {
  const [params,setParams]=useState(props.matchParams)
  const [cards,setCards]=useState(props.cards);
  useEffect(() => {
    setCards(props.cardData);
    setParams(props.matchParams);
  }, [props.cardData, props.matchParams]);
   return (
       <Aux>
         {cards && cards.length ? cards.map((cardData) => 
            {
                if(params.contenttype==='groupfeed')
                return(<CardForGroupFeed matchParams={params} cardData={cardData}  key={cardData.id} />)
                else if(params.contenttype==='notification'){
                  return(<CardsForNotifications matchParams={params} cardData={cardData} key={cardData.id} />)                 
                }
                else if(params.contenttype==='members')
                return(<CardForMembers matchParams={params} cardData={cardData}  key={cardData.id}/>)
                else if(params.contenttype==='progress')
                return(<CardForProgress matchParams={params} cardData={cardData}  key={cardData.id}/>)
                else if(params.contenttype==='appsfeed')
                return(<CardForAppFeed matchParams={params} cardData={cardData}  key={cardData.id}/>)                
                else 
                return(<CardsForArchive matchParams={params}  cardData={cardData}  key={cardData.id}/>)
            }
            ):''
        }
       </Aux>
   );
}
