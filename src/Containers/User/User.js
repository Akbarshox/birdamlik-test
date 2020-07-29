import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Aux from '../../hoc/Wrapper';
import Nopage from '../404/404';
import Profile from '../Profile/ProfileContent';
import Footer from "../../Components/Footer/Footer";



function User({match}) {
    const users=['volunteer','coordinator','applicant'];
   return (
       <Aux>
           <Switch>
                <Route  path={`/:lang/:user/:contenttype`} render={(props)=>users.includes(match.params.user)?<Profile user={match.params.user} {...props}/>:<Nopage/>} />
                <Route  path={`/:lang/:user`} render={(props)=>users.includes(match.params.user)?<Profile user={match.params.user} {...props}/>:<Nopage/>} />
                <Footer />
           </Switch>
        </Aux>
   );
}

export default User;