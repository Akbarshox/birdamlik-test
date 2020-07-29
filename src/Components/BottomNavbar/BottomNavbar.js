import React, {useState} from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {Link} from "react-router-dom";
import {bottomData} from "./BottomBarJson";
import SidebarDrawer from "../Appbar/SideDrawer/SideDrawer";
import style from './BottomApbbar.module.css';
import bar from '../../assets/icons/bars.svg';
import {useSelector} from 'react-redux'
export default function BottomAppbar(props) {
   const [value, setValue] = useState('');
   const [right, setRight] = useState(false);
   const {notificationStatus } = useSelector(state => ({
      ...state.mainData
    }));
   const toggleDrawer = (side, open) => {
      setRight(open);
   };
   
   const handleChange = (event, newValue) => {
      setValue(newValue);
   };
   
   const params = props.match.params;
   
   return (
       <BottomNavigation vlaue={value} onChange={handleChange} className={style.root}>
          {bottomData.map(el => el.userType === params.user ? el.data.slice(0,3).map((n,i)=>
                  <BottomNavigationAction disableRipple key={i} className={style.icon} component={Link}
                                          to={`/${params.lang}/${params.user}/${n.link}`} icon={
                     <div className={params.contenttype === n.link ? style.focusOn : ''}>
                        <img src={n.icon1}/>
                        {notificationStatus!=='not set' && notificationStatus?<img src={n.icon2} className={style.ellipse}/>:''}
                       
                     </div>
                  }/>) : ''
          )}
          <BottomNavigationAction onClick={() => toggleDrawer('right', true)} value="nearby" icon={<img src={bar}/>}/>
          <SidebarDrawer json={bottomData} {...props} right={right} toggleDrawer={toggleDrawer}/>
       </BottomNavigation>
   );
}